import {
  BadRequestException,
  HttpService,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommentService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private httpService: HttpService,
    private configService: ConfigService
  ) {}
  async create(createCommentDto: CreateCommentDto, user_id: number) {
    return this.manager.transaction(async (manager) => {
      const comment = manager.create(Comment, {
        ...createCommentDto,
        user_id: user_id,
      });
      const comment_created = await manager.save(comment);
      await this.publish('COMMENT_ADDED', comment_created);
      return comment_created;
    });
  }

  async findAll() {
    return this.manager.find(Comment);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number, requesterId: number) {
    return this.manager.transaction(async (manager) => {
      const comment = await manager.findOne(Comment, id);
      if (!comment)
        throw new NotFoundException(`Comment with id: ${id} not found`);
      if (comment.user_id !== requesterId) throw new UnauthorizedException();
      const commentRemoved = await manager.remove(comment);
      await this.publish('COMMENT_DELETED', { comment_id: id });
      return commentRemoved;
    });
  }

  async removeQuestionComments(questionId: number) {
    await this.manager.delete(Comment, { question_id: questionId });
  }

  async publish(eventType: string, eventPayload) {
    const host = this.configService.get<string>('CHOREOGRAPHER_HOST');
    const port = this.configService.get<string>('CHOREOGRAPHER_PORT');
    let url = `http://${host}:${port}/bus`;
    if (process.env.NODE_ENV === 'production') {
      url = `https://${host}/bus`;
    }

    this.httpService
      .post(url, {
        type: eventType,
        payload: eventPayload,
      })
      .subscribe(
        (response) => {
          console.log(response.statusText);
        },
        (error) => {
          console.log('ERROR:', error);
        }
      );
  }
}

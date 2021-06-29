import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}
  async create(createCommentDto: CreateCommentDto, user_id: number) {
    const { text, question_id } = createCommentDto;
    return this.manager
      .save(Comment, {
        text,
        question: { question_id },
        user: { user_id },
      })
      .catch((err) => {
        console.log(err);
        throw new BadRequestException();
      });
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number, requesterId: number) {
    return this.manager.transaction(async (manager) => {
      const comment = await manager.findOne(Comment, id);
      if (!comment)
        throw new NotFoundException(`Comment with id: ${id} not found`);
      if (comment.user_id !== requesterId) throw new UnauthorizedException();
      return manager.remove(comment);
    });
  }
}

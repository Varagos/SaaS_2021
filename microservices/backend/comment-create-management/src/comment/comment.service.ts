import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    @Inject('REDIS_PUB') private client: ClientProxy,
  ) {}
  create(createCommentDto: CreateCommentDto, user_id: number) {
    return this.manager.transaction(async (manager) => {
      const comment = manager.create(Comment, {
        ...createCommentDto,
        user_id: user_id,
      });
      const user_created = await manager.save(comment);
      await this.client.emit<number>('comment_created', { user_created });
      return user_created;
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number, requester_id: number) {
    return `This action removes a #${id} comment`;
  }
}

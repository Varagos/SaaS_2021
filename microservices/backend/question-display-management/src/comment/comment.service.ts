import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}
  async create(createCommentDto: CreateCommentDto) {
    return this.manager.transaction(async (manager) => {
      const comment = manager.create(Comment, createCommentDto);
      return manager.save(comment); // Reject is handled outside - slight performance benefit
    });
  }

  async remove(id: number) {
    return await this.manager.delete(Comment, id);
  }
}

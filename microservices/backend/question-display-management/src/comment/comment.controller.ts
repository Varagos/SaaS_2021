import { Controller, Delete } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @EventPattern('COMMENT_ADDED')
  async create(receivedComment) {
    const { user_id, question_id, ...structuredComment } =
      receivedComment.payload;
    structuredComment.user = { user_id };
    structuredComment.question = { question_id };

    return this.commentService.create(structuredComment);
  }

  @EventPattern('COMMENT_DELETED')
  async remove(receivedData) {
    const { comment_id } = receivedData.payload;
    return this.commentService.remove(comment_id);
  }
}

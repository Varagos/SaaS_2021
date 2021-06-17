import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('COMMENT_ADDED')
  async create(@Body() receivedComment) {
    const { user_id, question_id, ...structuredComment } =
      receivedComment.payload;
    structuredComment.user = { user_id };
    structuredComment.question = { question_id };

    return this.commentService.create(structuredComment);
  }

  @Post('COMMENT_DELETED')
  async remove(@Body() receivedData) {
    const { comment_id } = receivedData.payload;
    return this.commentService.remove(comment_id);
  }
}

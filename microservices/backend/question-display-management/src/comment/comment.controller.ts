import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @EventPattern('comment_created')
  async create(receivedComment) {
    const {
      user_id,
      question_id,
      ...structuredComment
    } = receivedComment.user_created;
    structuredComment.user = { user_id };
    structuredComment.question = { question_id };

    return this.commentService.create(structuredComment);
  }

  @MessagePattern('findAllComment')
  findAll() {
    return this.commentService.findAll();
  }

  @MessagePattern('findOneComment')
  findOne(@Payload() id: number) {
    return this.commentService.findOne(id);
  }

  @MessagePattern('updateComment')
  update(@Payload() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(updateCommentDto.id, updateCommentDto);
  }

  @MessagePattern('removeComment')
  remove(@Payload() id: number) {
    return this.commentService.remove(id);
  }
}

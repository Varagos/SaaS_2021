import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeleteOneParams } from './dto/delete-comment';
import { UpdateOneParams } from './dto/update-comment-param';
import { EventPattern } from '@nestjs/microservices';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @EventPattern('QUESTION_DELETED')
  async removeQuestion(receivedData) {
    console.log('received event', receivedData.payload);
    const { question_id } = receivedData.payload;
    await this.commentService.removeQuestionComments(+question_id);
  }

  /* For testing purposes */
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Controller-scoped
  @Post()
  create(@Request() request, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto, request.user.userId);
  }

  @UseGuards(JwtAuthGuard) // Controller-scoped
  @Patch(':id')
  update(
    @Param() params: UpdateOneParams,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    console.log(params, updateCommentDto);
    return this.commentService.update(+params.id, updateCommentDto);
  }

  @UseGuards(JwtAuthGuard) // Controller-scoped
  @Delete(':id')
  remove(@Param() params: DeleteOneParams, @Request() request) {
    const requester_id = request.user.userId;
    return this.commentService.remove(+params.id, requester_id);
  }
}

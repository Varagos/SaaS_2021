import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('comments')
@UseGuards(JwtAuthGuard) // Controller-scoped
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Req() req, @Body() createCommentDto: CreateCommentDto) {
    console.log('POSTING NEW COMMENT');
    const { user_id } = req.user;
    console.log(user_id);
    return this.commentsService.create(createCommentDto, user_id);
  }

  @Get()
  findAll() {
    console.log('POSTING NEW COMMENT');
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id', ParseIntPipe) id: string) {
    const { user_id } = req.user;
    return this.commentsService.remove(+id, +user_id);
  }
}

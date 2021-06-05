import {
  Controller,
  Post,
  Body,
  Param,
  Request,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeleteQuestionDto } from './dto/delete-question.dto';

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Req() request, @Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto, request.user.userId);
  }

  @Delete(':id')
  remove(@Param() params: DeleteQuestionDto, @Request() request) {
    const requester_id = request.user.userId;
    return this.questionService.remove(+params.id, requester_id);
  }
}

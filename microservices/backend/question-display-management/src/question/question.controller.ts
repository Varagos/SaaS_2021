import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @EventPattern('question_created')
  async create(data) {
    return this.questionService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Question> {
    return this.questionService.findOneWithRels(+id);
  }
}

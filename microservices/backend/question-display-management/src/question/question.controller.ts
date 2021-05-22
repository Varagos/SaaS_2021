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
    console.log('received event: question_created');
    await this.questionService.create(data);
  }

  @EventPattern('question_deleted')
  async remove(receivedData) {
    console.log('received event: question_deleted');
    const { question_id } = receivedData;
    await this.questionService.remove(question_id);
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

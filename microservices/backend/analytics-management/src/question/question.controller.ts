import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MonthlyCountDto } from './dto/monthly-count.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @EventPattern('QUESTION_ADDED')
  async create(data) {
    if (data.type) {
      console.log('Received Event:', data.type);
      await this.questionService.create(data.payload);
    }
  }

  @EventPattern('QUESTION_DELETED')
  async remove(receivedData) {
    console.log('received event:', receivedData.type);
    const { question_id } = receivedData.payload;
    await this.questionService.remove(question_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('count')
  async count(@Query() query: MonthlyCountDto): Promise<Question[]> {
    return this.questionService.daysCount(query.start, query.end);
  }

  @UseGuards(JwtAuthGuard)
  @Get('monthly_count')
  async monthlyCount(): Promise<Question[]> {
    return this.questionService.monthlyCount();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Question> {
    return this.questionService.findOneWithRels(+id);
  }
}

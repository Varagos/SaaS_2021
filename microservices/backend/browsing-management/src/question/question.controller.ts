import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { FindDatesParams } from './dto/find-dates-params';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FindOffsetParams } from './dto/findOffset';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @EventPattern('question_created')
  async create(data) {
    console.log('received event in /questions/question_created');
    return this.questionService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get('/BetweenDates/_start=:start&_end=:end')
  findSome(@Param() params: FindDatesParams): Promise<Question[]> {
    console.log(params);
    return this.questionService.findBetweenDates(params.start, params.end);
  }

  @Get('/page=:page')
  findPage(@Param() params: FindOffsetParams): Promise<Question[]> {
    console.log(params.page);
    return this.questionService.findPage(params.page - 1);
  }

  @Get('/PagesCount')
  findPageCount(): number {
    return 1;
  }
}

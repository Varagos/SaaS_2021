import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { FindDatesParams } from './dto/find-dates-params';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaginateDto } from './dto/paginate.dto';
import { PaginateKeywordsDto } from './dto/paginate-keywords.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @EventPattern('QUESTION_ADDED')
  async create(data) {
    if (data.type) {
      console.log('received event:', data.type);
      return this.questionService.create(data.payload);
    }
  }

  @EventPattern('QUESTION_DELETED')
  async remove(receivedData) {
    console.log('received event:', receivedData.type);
    const { question_id } = receivedData.payload;
    await this.questionService.remove(+question_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get('paginate')
  findPage(@Query() query: PaginateDto) {
    console.log('Received Query:', query);
    return this.questionService.findSimplePagination(
      query.page - 1,
      query.limit
    );
  }

  @Get('keywords')
  findByKeywords(@Query() query: PaginateKeywordsDto) {
    console.log('Received Query:', query);
    return this.questionService.findKeywordsPagination(
      query.page - 1,
      query.keywords,
      query.limit
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('sort_dates')
  findSome(@Query() query: FindDatesParams) {
    console.log(query);
    return this.questionService.findBetweenDates(
      query.start,
      query.end,
      query.page - 1,
      query.limit
    );
  }
}

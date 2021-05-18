import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { FindDatesParams } from './dto/find-dates-params';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Paginate } from './dto/paginate.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @EventPattern('question_created') async create(data) {
    console.log('received event in /questions/question_created');
    return this.questionService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get('/sort_dates')
  findSome(@Query() query: FindDatesParams): Promise<Question[]> {
    console.log(query);
    return this.questionService.findBetweenDates(query.start, query.end);
  }

  @Get('/paginate')
  findPage(@Query() query: Paginate) {
    console.log(query);
    console.log(`This action returns page ${query.page}, limit`);
    if (!query.limit) {
      query.limit = 10;
    }
    console.log(query);
    return this.questionService.findPageWithRelations(
      query.page - 1,
      query.limit,
    );
  }

  @Get('/PagesCount')
  findPageCount(): number {
    return 1;
  }
}

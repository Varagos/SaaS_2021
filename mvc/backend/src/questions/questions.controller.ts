import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DeleteQuestionDto } from './dto/delete-question.dto';
import { PaginateDto } from './dto/paginate.dto';
import { Question } from './entities/question.entity';
import { PaginateKeywordsDto } from './dto/paginate-keywords.dto';
import { FindDatesParams } from './dto/find-dates-params';
import { MonthlyCountDto } from './dto/monthly-count.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() createQuestionDto: CreateQuestionDto) {
    console.log(req.user);
    return this.questionsService.create(createQuestionDto, req.user.user_id);
  }

  @Get('paginate')
  findPage(@Query() query: PaginateDto) {
    console.log('Received Query:', query);
    return this.questionsService.findSimplePagination(
      query.page - 1,
      query.limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('keywords')
  findByKeywords(@Query() query: PaginateKeywordsDto) {
    console.log('Received Query:', query);
    return this.questionsService.findKeywordsPagination(
      query.page - 1,
      query.keywords,
      query.limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('sort_dates')
  findSome(@Query() query: FindDatesParams) {
    console.log(query);
    return this.questionsService.findBetweenDates(
      query.start,
      query.end,
      query.page - 1,
      query.limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('analytics/count')
  async count(@Query() query: MonthlyCountDto): Promise<Question[]> {
    return this.questionsService.daysCount(query.start, query.end);
  }

  @UseGuards(JwtAuthGuard)
  @Get('analytics/monthly_count')
  async monthlyCount(): Promise<Question[]> {
    return this.questionsService.monthlyCount();
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<Question> {
    return this.questionsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param() params: DeleteQuestionDto) {
    const { user_id } = req.user;
    console.log(req.user);
    return this.questionsService.remove(+params.id, user_id);
  }
}

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MostUsedDto } from './dto/most-used.dto';
import { Keyword } from './entities/keyword.entity';

@Controller('keywords')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get()
  findAll() {
    return this.keywordService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('most_used')
  async monthlyCount(@Query() query: MostUsedDto): Promise<Keyword[]> {
    return this.keywordService.mostUsed(query.start, query.end);
  }
}

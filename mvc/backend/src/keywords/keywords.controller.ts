import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { KeywordsService } from './keywords.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MostUsedDto } from './dto/most-used.dto';
import { Keyword } from './entities/keyword.entity';

@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('analytics/most_used')
  async monthlyCount(@Query() query: MostUsedDto): Promise<Keyword[]> {
    return this.keywordsService.mostUsed(query.start, query.end);
  }

  @Get()
  findAll() {
    return this.keywordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keywordsService.findOne(+id);
  }
}

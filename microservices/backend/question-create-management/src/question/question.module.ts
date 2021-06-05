import { HttpModule, Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { KeywordModule } from '../keyword/keyword.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), KeywordModule, HttpModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}

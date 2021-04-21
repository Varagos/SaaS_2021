import { Module } from '@nestjs/common';
import { QuestionModule } from './question/question.module';
import { KeywordModule } from './keyword/keyword.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), QuestionModule, KeywordModule],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

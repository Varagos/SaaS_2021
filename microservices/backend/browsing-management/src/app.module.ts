import { Module } from '@nestjs/common';
import { QuestionModule } from './question/question.module';
import { KeywordModule } from './keyword/keyword.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    QuestionModule,
    KeywordModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

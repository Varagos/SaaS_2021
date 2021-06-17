import { HttpModule, Module } from '@nestjs/common';
import { QuestionModule } from './question/question.module';
import { KeywordModule } from './keyword/keyword.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    QuestionModule,
    KeywordModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    QuestionModule,
  ],
  providers: [AppService],
})
export class AppModule {}

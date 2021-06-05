import { HttpModule, Module } from '@nestjs/common';
import { QuestionModule } from './question/question.module';
import { UserModule } from './user/user.module';
import { KeywordModule } from './keyword/keyword.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    QuestionModule,
    UserModule,
    KeywordModule,
    CommentModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    QuestionModule,
    CommentModule,
  ],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

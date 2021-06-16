import { HttpModule, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { CommentModule } from './comment/comment.module';
import { KeywordModule } from './keyword/keyword.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    QuestionModule,
    CommentModule,
    KeywordModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

import { HttpModule, Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { KeywordModule } from '../keyword/keyword.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    ClientsModule.register([
      {
        name: 'QUESTION_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),
    KeywordModule,
    HttpModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}

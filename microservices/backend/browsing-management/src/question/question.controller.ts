import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { QuestionService } from './question.service';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @EventPattern('question_created')
  async create(data) {
    console.log('received event in /questions/question_created');
    return this.questionService.create(data);
  }
}

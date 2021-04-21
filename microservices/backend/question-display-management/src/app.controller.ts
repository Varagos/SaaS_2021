import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  //Create a logger instance
  private logger = new Logger('AppController');

  @EventPattern('user_created')
  async create(data) {
    console.log(data);
    //return this.questionService.create(data);
  }
}

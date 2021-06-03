import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('REDIS_PUB') private client: ClientProxy) {}
  getHello(): string {
    const question = {
      question_id: 54,
      title: 'First choreographer question',
      text: '',
      date: Date.now(),
      user_id: 1,
      keywords: [],
    };
    // this.client.emit('question_created', question);
    console.log(question);
    return 'emitted';
  }

  async publishEvent(event) {
    this.client.emit(event.type, event);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  public accumulate(data: number[]): Observable<number> {
    return this.client.send<number, number[]>('add', data);
  }

  async publish() {
    return this.client.emit<number>('user_created', { hi: 'ok' });
  }
}

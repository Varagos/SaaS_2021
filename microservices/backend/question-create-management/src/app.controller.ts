import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MATH_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  getHello(): Observable<number> {
    return this.appService.accumulate([5, 4, 3]);
  }

  @Get('pub')
  getPub() {
    return this.appService.publish();
  }
}

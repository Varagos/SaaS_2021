import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ReceivedEventDto } from './dto/post-event.dto';

@Controller('bus')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async postEvent(@Body() receivedEventDto: ReceivedEventDto): Promise<number> {
    console.log('received event', receivedEventDto.type);
    console.log('payload:', receivedEventDto.payload);
    await this.appService.publishEvent(receivedEventDto);

    return 201;
  }
}

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ReceivedEventDto } from './dto/post-event.dto';
import { AddSubscriberDto } from './dto/add-subscriber.dto';

@Controller('bus')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':type')
  async findQueue(@Param() params) {
    return this.appService.getStoredEvents(params.type);
  }

  @Post()
  async postEvent(@Body() receivedEventDto: ReceivedEventDto): Promise<number> {
    console.log('received event', receivedEventDto.type);
    console.log('payload:', receivedEventDto.payload);
    await this.appService.publishEvent(receivedEventDto);

    await this.appService.storeEvent(receivedEventDto);
    return 201;
  }

  @Post('reset')
  async resetStores() {
    return await this.appService.resetStores();
  }

  @Post('add_subscriber')
  async addSubscriber(@Body() addSubscriberDto: AddSubscriberDto) {
    console.log(addSubscriberDto);
    return await this.appService.addSubscriber(
      addSubscriberDto.type,
      addSubscriberDto.host
    );
  }
  @Post('remove_subscriber')
  async removeSubscriber(@Body() addSubscriberDto: AddSubscriberDto) {
    console.log(addSubscriberDto);
    return await this.appService.removeSubscriber(
      addSubscriberDto.type,
      addSubscriberDto.host
    );
  }

  @Delete(':type')
  async remove(@Param() params) {
    return this.appService.deleteQueue(params.type);
  }
}

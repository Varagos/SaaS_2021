import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ReceivedEventDto } from './dto/post-event.dto';

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
    const emitResult = await this.appService.publishEvent(receivedEventDto);
    emitResult.subscribe(
      (res) => console.log(res),
      (error) => console.error(error)
    );

    await this.appService.storeEvent(receivedEventDto);
    return 201;
  }

  @Post('reset')
  async resetStores() {
    return await this.appService.resetStores();
  }

  @Delete(':type')
  async remove(@Param() params) {
    return this.appService.deleteQueue(params.type);
  }
}

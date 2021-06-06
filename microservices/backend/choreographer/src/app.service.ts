import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RedisCacheService } from './redis-cache/redis-cache.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS_PUB') private client: ClientProxy,
    private readonly redisCacheService: RedisCacheService
  ) {}
  getHello(): string {
    return '(: Hello World! :)';
  }

  async publishEvent(event) {
    return this.client.emit(event.type, event);
  }

  async storeEvent(event) {
    const { type, payload } = event;
    // await this.redisCacheService.del(type);
    const currentArr = await this.getStoredEvents(type);

    console.log('REDIS-CACHED-VALUE =>', currentArr);
    const timestamp = new Date(Date.now());
    await this.redisCacheService.set(type, [
      ...currentArr,
      { id: uuidv4(), payload, timestamp },
    ]);
  }

  async getStoredEvents(type) {
    let eventsArray = await this.redisCacheService.get(type);
    if (!eventsArray) {
      eventsArray = [];
    }
    return eventsArray;
  }

  async deleteQueue(type) {
    console.log('Deleting queue:', type);
    return this.redisCacheService.del(type);
  }
  async resetStores() {
    return await this.redisCacheService.reset();
  }
}

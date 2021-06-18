import { HttpService, Injectable } from '@nestjs/common';
import { RedisCacheService } from './redis-cache/redis-cache.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(
    private readonly redisCacheService: RedisCacheService,
    private httpService: HttpService
  ) {}
  getHello(): string {
    return '(: Hello World! :)';
  }

  async publishEvent(event) {
    const queue = `${event.type}_SUBSCRIBERS`;
    const eventsArray = await this.getStoredEvents(queue);
    let i;
    let url: string;
    for (i = 0; i < eventsArray.length; i++) {
      url = eventsArray[i];
      this.httpService.post(url, event).subscribe(
        (response) => {
          console.log(event.type, response.statusText);
        },
        (error) => {
          console.log('ERROR on url:', url, error);
        }
      );
    }
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

  async addSubscriber(type: string, host: string) {
    const queue = `${type}_SUBSCRIBERS`;
    const eventsArray = await this.getStoredEvents(queue);

    eventsArray.indexOf(host) === -1
      ? eventsArray.push(host)
      : `Host:${host} has already subscribed to this type`;
    await this.redisCacheService.set(queue, eventsArray);
    return eventsArray;
  }

  /* Controller-endpoint to be implemented */
  async removeSubscriber(type: string, host: string) {
    console.log('ABOUT to remove', type, host)
    const queue = `${type}_SUBSCRIBERS`;
    const eventsArray = await this.redisCacheService.get(queue);
    if (!eventsArray) {
      return `Host:${host} was not subscribed.`;
    }
    const result = eventsArray.filter((subscriber) => subscriber !== host);
    await this.redisCacheService.set(queue, result);
    return result;
  }
}

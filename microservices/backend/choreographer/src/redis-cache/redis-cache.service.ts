import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async get(key): Promise<any> {
    return await this.cache.get(key);
  }

  async set(key, value) {
    await this.cache.set(key, value);
  }

  async reset() {
    await this.cache.reset();
  }

  async del(key) {
    return await this.cache.del(key);
  }
}

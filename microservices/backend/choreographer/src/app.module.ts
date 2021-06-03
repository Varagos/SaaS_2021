import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule.forRoot(), RedisCacheModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_PUB',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}

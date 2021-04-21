import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap() {
  // Create the microservice options object
  const microServiceOptions: MicroserviceOptions = {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microServiceOptions,
  );
  app.listen(() =>
    logger.log('Microservice Question-display-management is listening...'),
  );
}
bootstrap();

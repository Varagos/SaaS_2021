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

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // front end client
  });
  const microservice = app.connectMicroservice(microServiceOptions);

  await app.startAllMicroservicesAsync();
  await app.listen(5003, () => {
    console.log('Display question component is listening on port 5003...');
  });
}
bootstrap();

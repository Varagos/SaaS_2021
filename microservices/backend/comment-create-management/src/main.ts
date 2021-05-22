import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create microservice options object
  const microServiceOptions: MicroserviceOptions = {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  };
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000', // front end client
  });

  const microservice = app.connectMicroservice(microServiceOptions);
  await app.startAllMicroservicesAsync();
  await app.listen(5002, () => {
    console.log('Comment create component is listening on port 5002...');
  });
}
bootstrap();

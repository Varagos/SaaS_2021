import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const microserviceOptions: MicroserviceOptions = {
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
  const microservice = app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservicesAsync();
  await app.listen(5004, () => {
    console.log('Browsing management component is listening on port 5004...');
  });
}
bootstrap();

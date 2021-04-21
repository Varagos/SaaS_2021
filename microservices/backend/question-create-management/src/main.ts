import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//This is a standard HTTP service configuration - not a microservice

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5001);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//This is a standard HTTP service configuration - not a microservice

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT || 5001, () => {
    console.log(
      `question-create mngmnt stared on PORT:${process.env.PORT || 5001}`
    );
  });
}

bootstrap();

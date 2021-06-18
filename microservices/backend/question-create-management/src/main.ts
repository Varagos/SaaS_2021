import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//This is a standard HTTP service configuration - not a microservice

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://askmeanything37-ms.herokuapp.com'
        : 'http://localhost:3000', // dev front end client
  });
  await app.listen(process.env.PORT || 5001, () => {
    console.log(
      `question-create mngmnt stared on PORT:${process.env.PORT || 5001}`
    );
  });
}

bootstrap();

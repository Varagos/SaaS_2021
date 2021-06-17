import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000', // front end client
  });
  await app.listen(process.env.PORT || 5000,() =>{
    `authenticator started on port ${process.env.PORT || 5000}`;
  });
}
bootstrap();

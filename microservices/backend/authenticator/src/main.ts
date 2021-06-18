import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [
            'https://askmeanything37-ms.herokuapp.com', //frontend
            'https://askmeanything37-question-cr.herokuapp.com',
          ]
        : 'http://localhost:3000', // dev front end client
  });
  await app.listen(process.env.PORT || 5000, () => {
    `authenticator started on port ${process.env.PORT || 5000}`;
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://askmeanything37-ms.herokuapp.com'
        : 'http://localhost:3000', // dev front end client
  });

  await app.listen(process.env.PORT || 5002, () => {
    console.log(
      `Comment create component is listening on port ${
        process.env.PORT || 5002
      }...`
    );
  });
}
bootstrap();

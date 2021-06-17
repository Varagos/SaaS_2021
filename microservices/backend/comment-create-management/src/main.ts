import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000', // front end client
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

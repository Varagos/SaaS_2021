import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [
            'https://askmeanything37-ms.herokuapp.com',
            'https://askmeanything37-choreographer.herokuapp.com',
          ]
        : 'http://localhost:3000', // dev front end client
  });

  await app.listen(process.env.PORT || 5004, () => {
    console.log(
      `Browsing management component is listening on port ${
        process.env.PORT || 5004
      }...`
    );
  });

  const appService = app.get(AppService);
  console.log(appService.getHello());
  await appService.synchronizeData();
}
bootstrap();

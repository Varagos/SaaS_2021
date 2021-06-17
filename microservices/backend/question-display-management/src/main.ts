import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AppService } from './app.service';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // front end client
  });

  await app.listen(process.env.PORT || 5003, () => {
    console.log(
      `Display question component is listening on port ${
        process.env.PORT || 5003
      }...`
    );
  });

  const appService = app.get(AppService);
  console.log(appService.getHello());
  await appService.synchronizeData();
}
bootstrap();

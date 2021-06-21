import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);
  app.enableCors();
  await app.listen(process.env.PORT || 5005, async () => {
    console.log(
      `Analytics component is listening on port ${process.env.PORT || 5005}...`,
    );
  });
  const appService = app.get(AppService);
  console.log(appService.getHello());
  await appService.synchronizeData();
}
bootstrap();

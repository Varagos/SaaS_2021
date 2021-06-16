import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

async function bootstrap() {
  const microServiceOptions: MicroserviceOptions = {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  };

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT', '5005');
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  const microServiceApp = app.connectMicroservice(microServiceOptions);
  await app.startAllMicroservicesAsync();
  await app.listen(port, async () => {
    console.log(`Analytics component is listening on port ${port}...`);
  });
  const appService = app.get(AppService);
  console.log(appService.getHello());
  await appService.synchronizeData();
}
bootstrap();

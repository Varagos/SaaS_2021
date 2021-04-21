import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  };
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microserviceOptions,
  );
  app.listen(() =>
    console.log('Microservice browsing-management is listening'),
  );
}
bootstrap();

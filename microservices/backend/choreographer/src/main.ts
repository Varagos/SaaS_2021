import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 5006, () =>
    console.log(`Choreographer listening on port ${process.env.PORT || 5006}`)
  );
}
bootstrap();

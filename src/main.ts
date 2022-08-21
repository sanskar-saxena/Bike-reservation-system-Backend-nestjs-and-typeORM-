import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // await app.listen(3000);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://bike-bungy-backend-nest.herokuapp.com',
      'http://localhost:3000',
    ],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

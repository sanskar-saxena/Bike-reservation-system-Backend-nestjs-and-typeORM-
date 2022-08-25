import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://helpful-banoffee-96c4e6.netlify.app',
    ],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // await app.listen(3000);

  // app.use(function (req, res, next) {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept',
  //   );
  //   next();
  // });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://bike-bungy-backend-nest.herokuapp.com',
      'http://localhost:3001',
    ],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

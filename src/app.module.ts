import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './module/user.module/user.controller';
import { UserService } from './module/user.module/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bikeController } from './module/bike.module/bike.controller';
import { BikeService } from './module/bike.module/bike.service';
import { ReservationController } from './module/reservations.module/reservations.controller';
import { ReservationService } from './module/reservations.module/reservations.service';
import { ReviewController } from './module/review.module/review.controller';
import { ReviewService } from './module/review.module/review.service';

const ENTITY_PATH = __dirname + '/db/entities/*.entity{.ts,.js}';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: [ENTITY_PATH],
      synchronize: true,
    }),
  ],
  controllers: [
    AppController,
    UserController,
    bikeController,
    ReservationController,
    ReviewController,
  ],
  providers: [
    AppService,
    UserService,
    BikeService,
    ReservationService,
    ReviewService,
  ],
})
export class AppModule {}

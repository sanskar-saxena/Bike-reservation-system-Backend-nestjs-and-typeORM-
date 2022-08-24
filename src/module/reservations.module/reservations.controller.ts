import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from '@nestjs/common/module-utils/constants';
import { ReservationEntity } from 'src/db/entities/reservations.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guards';
import { RoleGuard } from 'src/guards/role.guard';
import { ERole } from 'src/models/user.models';
import { Auth, IAuth } from 'src/utils/auth.decorator';
import { ReservationService } from './reservations.service';

@Controller('')
export class ReservationController {
  constructor(private readonly reservationservice: ReservationService) {}

  @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Get('/reservations/page/:Pno')
  getAllReservations(@Auth() auth, @Param('Pno') Pno: number) {
    return this.reservationservice.getAllReservations(Pno);
  }

  @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Get('/reservations/page/:bikeId/:Pno')
  getBikesReservations(
    @Param('Pno') Pno: number,
    @Param('bikeId') bikeId: number,
  ) {
    return this.reservationservice.getBikesReservations(Pno, bikeId);
  }

  @UseGuards(AuthGuard)
  @Get('/users/:userId/reservations')
  getUsersReservations(@Param('userId') userId: number) {
    return this.reservationservice.getUsersReservations(userId);
  }

  @UseGuards(AuthGuard)
  @Post('/reservations/book')
  reserveBike(@Auth() auth, @Body() reservation: ReservationEntity) {
    console.log(reservation);
    return this.reservationservice.reserveBike(reservation);
  }

  @UseGuards(AuthGuard)
  @Patch('/reservations/:id')
  cancelBike(@Auth() auth, @Param('id') id: number, @Body() status) {
    return this.reservationservice.cancelBike({ id, status });
  }
}

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
import { UserEntity } from 'src/db/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guards';
import { RoleGuard } from 'src/guards/role.guard';
import { ERole } from 'src/models/user.models';
import { Auth, IAuth } from 'src/utils/auth.decorator';
import { ReservationService } from './reservations.service';

@Controller('/reservations')
export class ReservationController {
  constructor(private readonly reservationservice: ReservationService) {}

  @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Get('/page/:Pno')
  getAllReservations(@Auth() auth, @Param('Pno') Pno: number) {
    return this.reservationservice.getAllReservations(Pno);
  }

  @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Get('/page/:bikeId/:Pno')
  getBikesReservations(
    @Param('Pno') Pno: number,
    @Param('bikeId') bikeId: number,
  ) {
    return this.reservationservice.getBikesReservations(Pno, bikeId);
  }

  @UseGuards(AuthGuard)
  @Get('/page/:userId/:Pno')
  getUsersReservations(
    @Param('Pno') Pno: number,
    @Param('userId') userId: number,
  ) {
    return this.reservationservice.getUsersReservations(Pno, userId);
  }

  @UseGuards(AuthGuard)
  @Post('/book')
  reserveBike(@Auth() auth, @Body() bike) {
    return this.reservationservice.reserveBike(bike);
  }
}

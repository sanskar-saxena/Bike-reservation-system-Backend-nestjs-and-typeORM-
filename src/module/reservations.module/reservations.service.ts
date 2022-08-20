import {
  HttpException,
  Injectable,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/db/entities/user.entity';
import { ERole } from 'src/models/user.models';
import { IAuth } from 'src/utils/auth.decorator';
import JwtUtil from 'src/utils/jwt.util';
import * as Bcrypt from 'bcryptjs';
import { ReservationEntity } from 'src/db/entities/reservations.entity';

@Injectable()
export class ReservationService {
  getHello(): string {
    return 'Hello World!';
  }

  async reserveBike(bike) {
    const newRes = new ReservationEntity();
    // const bike = new BikeEntity();
    newRes.bikeId = bike.bikeId;
    newRes.startDate = bike.startDate;
    newRes.endDate = bike.endDate;
    newRes.userId = bike.userId;
    await newRes.save();
    return newRes.toJSON();
  }

  async getAllReservations(currentPage): Promise<Array<any>> {
    let data = await ReservationEntity.find({ where: {} });
    const count = Math.ceil(data.length / 9);
    const indexOfLastItem = Math.min(parseInt(currentPage) * 9, data.length);
    const indexOfFirstItem = 9 * (currentPage - 1);
    data = data.slice(indexOfFirstItem, indexOfLastItem);
    console.log('yhaaa');
    console.log(currentPage);
    console.log(data);
    return [data, count];
  }

  async getBikesReservations(currentPage, bikeId): Promise<Array<any>> {
    let data = await ReservationEntity.find({ where: { bikeId } });
    const count = Math.ceil(data.length / 9);
    const indexOfLastItem = Math.min(parseInt(currentPage) * 9, data.length);
    const indexOfFirstItem = 9 * (currentPage - 1);
    data = data.slice(indexOfFirstItem, indexOfLastItem);
    console.log('yhaaa');
    console.log(currentPage);
    console.log(data);
    return [data, count];
  }

  async getUsersReservations(currentPage, userId): Promise<Array<any>> {
    let data = await ReservationEntity.find({ where: { userId } });
    const count = Math.ceil(data.length / 9);
    const indexOfLastItem = Math.min(parseInt(currentPage) * 9, data.length);
    const indexOfFirstItem = 9 * (currentPage - 1);
    data = data.slice(indexOfFirstItem, indexOfLastItem);
    console.log('yhaaa');
    console.log(currentPage);
    console.log(data);
    return [data, count];
  }
}

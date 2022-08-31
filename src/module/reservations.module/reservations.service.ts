import { HttpException, Injectable } from '@nestjs/common';
import { ReservationEntity } from 'src/db/entities/reservations.entity';

@Injectable()
export class ReservationService {
  getHello(): string {
    return 'Hello World!';
  }

  async reserveBike(reservation) {
    const bikeId = reservation.bikeId;
    const data = await ReservationEntity.find({
      where: { bikeId, status: 'BOOKED' },
    });
    if (!data) {
      const newRes = new ReservationEntity();
      newRes.bikeId = reservation.bikeId;
      newRes.startDate = reservation.startDate;
      newRes.endDate = reservation.endDate;
      newRes.userId = reservation.userId;
      newRes.status = reservation.status;
      await newRes.save();
      return newRes.toJSON();
    } else {
      for (let i = 0; i < data.length; i++) {
        if (
          (new Date(reservation.startDate) >= new Date(data[i].startDate) &&
            new Date(reservation.startDate) <= new Date(data[i].endDate)) ||
          (new Date(reservation.endDate) >= new Date(data[i].startDate) &&
            new Date(reservation.endDate) <= new Date(data[i].endDate))
        ) {
          throw new HttpException('Cannot Reserve', 400);
        }
      }
      const newRes = new ReservationEntity();
      newRes.bikeId = reservation.bikeId;
      newRes.startDate = reservation.startDate;
      newRes.endDate = reservation.endDate;
      newRes.userId = reservation.userId;
      newRes.status = reservation.status;
      await newRes.save();
      return newRes.toJSON();
    }
  }

  async getAllReservations(currentPage): Promise<Array<any>> {
    let data = await ReservationEntity.find({ where: {} });
    const count = data.length;
    const indexOfLastItem = Math.min(parseInt(currentPage) * 9, data.length);
    const indexOfFirstItem = 9 * (currentPage - 1);
    data = data.slice(indexOfFirstItem, indexOfLastItem);
    return [data, count];
  }

  async getBikesReservations(currentPage, bikeId): Promise<Array<any>> {
    let data = await ReservationEntity.find({ where: { bikeId } });
    const count = data.length;
    const indexOfLastItem = Math.min(parseInt(currentPage) * 9, data.length);
    const indexOfFirstItem = 9 * (currentPage - 1);
    data = data.slice(indexOfFirstItem, indexOfLastItem);
    return [data, count];
  }

  async getUsersReservations(userId): Promise<Array<any>> {
    const data = await ReservationEntity.find({ where: { userId } });
    if (data) {
      return data;
    } else {
      throw new HttpException('Not found', 400);
    }
  }

  async cancelBike({ id, status }) {
    return ReservationEntity.update(id, status);
  }
}

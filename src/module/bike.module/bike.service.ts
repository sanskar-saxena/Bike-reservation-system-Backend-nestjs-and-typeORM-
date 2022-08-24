import {
  HttpException,
  Injectable,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IAuth } from 'src/utils/auth.decorator';
import JwtUtil from 'src/utils/jwt.util';
import { BikeEntity } from 'src/db/entities/bike.entity';
import { filter, of } from 'rxjs';
import { bikeController } from './bike.controller';

@Injectable()
export class BikeService {
  async getBike(id: number): Promise<BikeEntity> {
    const bike = await BikeEntity.findOne({ where: { id } });
    if (bike) return bike;
    else {
      throw new HttpException('Not found', 400);
    }
  }

  async applyFilter(filter, Pno): Promise<Array<any>> {
    let bikes = await BikeEntity.find({ where: {} });
    if (filter.model && filter.model !== '')
      bikes = bikes.filter((bike) => bike.model === filter.model);
    if (filter.color && filter.color !== '')
      bikes = bikes.filter((bike) => bike.color === filter.color);
    if (filter.location && filter.location !== '')
      bikes = bikes.filter((bike) => bike.location === filter.location);
    if (filter.isAvailable === true || filter.isAvailable === false) {
      bikes = bikes.filter((bike) => bike.isAvailable === filter.isAvailable);
    }
    if (filter.avgRating)
      bikes = bikes.filter((bike) => {
        return bike.avgRating >= filter.avgRating;
      });

    if (filter.startDate && filter.endDate) {
      bikes = bikes.filter(
        (item) =>
          item.startDate < filter.startDate &&
          item.startDate < filter.endDate &&
          item.endDate > filter.startDate &&
          item.endDate > filter.endDate,
      );
    }
    const len = bikes.length;
    const indexOfLastItem = Math.min(Pno * 9, bikes.length);
    const indexOfFirstItem = 9 * (Pno - 1);
    if (indexOfFirstItem <= indexOfLastItem) {
      bikes = bikes.slice(indexOfFirstItem, indexOfLastItem);
    }
    return [bikes, len];
  }

  async addBike(bike) {
    const newBike = new BikeEntity();
    // const bike = new BikeEntity();
    newBike.model = bike.model;
    newBike.color = bike.color;
    newBike.location = bike.location;
    newBike.isAvailable = bike.isAvailable;
    newBike.startDate = bike.startDate;
    newBike.endDate = bike.endDate;
    newBike.image = bike.image;
    newBike.avgRating = bike.avgRating;

    await newBike.save();
    return newBike.toJSON();
  }

  async editBike({ id, bike }) {
    return BikeEntity.update(id, bike);
  }

  async deleteBike(id) {
    return BikeEntity.delete(id);
  }
}

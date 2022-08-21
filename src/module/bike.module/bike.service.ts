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
  async getBikes(currentPage): Promise<Array<any>> {
    let data = await BikeEntity.find({ where: {} });
    // let data = bikes.map((bike: BikeEntity) => bike.toJSON());
    const count = Math.ceil(data.length / 9);
    const indexOfLastItem = Math.min(parseInt(currentPage) * 9, data.length);
    const indexOfFirstItem = 9 * (currentPage - 1);
    data = data.slice(indexOfFirstItem, indexOfLastItem);
    console.log('yhaaa');
    console.log(currentPage);
    console.log(data);
    return [data, count];
  }

  async getBike(id: number): Promise<BikeEntity> {
    const bike = await BikeEntity.findOne({ where: { id } });
    if (bike) return bike;
    else {
      throw new HttpException('Not found', 400);
    }
  }

  async applyFilter(filter, Pno): Promise<Array<BikeEntity>> {
    let [bikes] = await this.getBikes(Pno);
    console.log(bikes);
    console.log(filter);
    if (filter.model.length)
      bikes = bikes.filter((bike) => bike.model === filter.model);
    if (filter.color.length)
      bikes = bikes.filter((bike) => bike.color === filter.color);
    if (filter.location.length)
      bikes = bikes.filter((bike) => bike.location === filter.location);
    if (filter.isAvailable === true || filter.isAvailable === false) {
      bikes = bikes.filter((bike) => bike.isAvailable === filter.isAvailable);
    }
    if (filter.avgRating)
      bikes = bikes.filter((bike) => {
        return parseInt(bike.avgRating) >= filter.avgRating;
      });

    if (filter.startDate && filter.endDate) {
      bikes = bikes.filter(
        (item) =>
          item.startDate > filter.startDate &&
          item.startDate < filter.endDate &&
          item.endDate > filter.startDate &&
          item.endDate < filter.endDate,
      );
    }

    // const data = bikes.map((bike: BikeEntity) => bike.toJSON());

    return bikes;
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

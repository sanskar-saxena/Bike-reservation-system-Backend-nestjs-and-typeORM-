import { HttpException, Injectable } from '@nestjs/common';
import { BikeEntity } from 'src/db/entities/bike.entity';
import { ReservationEntity } from 'src/db/entities/reservations.entity';

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
      bikes = bikes.filter((bike) =>
        bike.model.toLowerCase().includes(filter.model.trim().toLowerCase()),
      );
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
      const data = await ReservationEntity.find({
        where: { status: 'BOOKED' },
      });
      if (data?.length === 0) {
        bikes = bikes.filter(
          (item) =>
            item.startDate < filter.startDate &&
            item.startDate < filter.endDate &&
            item.endDate > filter.startDate &&
            item.endDate > filter.endDate,
        );
      } else {
        const ans = [];
        for (let i = 0; i < bikes.length; i++) {
          const bikeId = bikes[i].id;
          const data = await ReservationEntity.find({
            where: { bikeId, status: 'BOOKED' },
          });
          if (!data) {
            if (
              bikes[i].startDate < filter.startDate &&
              bikes[i].startDate < filter.endDate &&
              bikes[i].endDate > filter.startDate &&
              bikes[i].endDate > filter.endDate
            ) {
              ans.push(bikes[i]);
            }
          } else {
            if (
              bikes[i].startDate < filter.startDate &&
              bikes[i].startDate < filter.endDate &&
              bikes[i].endDate > filter.startDate &&
              bikes[i].endDate > filter.endDate
            ) {
              for (let j = 0; j < data.length; j++) {
                if (
                  (filter.startDate >= new Date(data[j].startDate) &&
                    filter.startDate <= new Date(data[j].endDate)) ||
                  (filter.endDate >= new Date(data[j].startDate) &&
                    filter.endDate <= new Date(data[j].endDate))
                ) {
                  continue;
                } else {
                  ans.push(bikes[i]);
                }
              }
            }
          }
        }
        bikes = [...ans];
      }
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
    const data = await ReservationEntity.find({ where: { bikeId: id } });
    ReservationEntity.remove(data);
    return BikeEntity.delete(id);
  }
}

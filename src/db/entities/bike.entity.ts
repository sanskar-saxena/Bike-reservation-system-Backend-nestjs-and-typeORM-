import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class BikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  location: string;

  @Column()
  avgRating: string;

  @Column()
  isAvailable: boolean;

  @Column()
  startDate: number;

  @Column()
  endDate: number;

  @Column()
  image: string;

  toJSON() {
    return {
      id: this.id,
      model: this.model,
      color: this.color,
      location: this.location,
      avgRating: this.avgRating,
      isAvailable: this.isAvailable,
      startDate: this.startDate,
      endDate: this.endDate,
      image: this.image,
    };
  }
}

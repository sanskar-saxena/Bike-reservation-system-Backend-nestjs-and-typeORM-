import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class ReservationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bikeId: number;

  @Column({})
  userId: number;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  status: string;

  toJSON() {
    return {
      id: this.id,
      bikeId: this.bikeId,
      userId: this.userId,
      startDate: this.startDate,
      endDate: this.endDate,
      status: this.status,
    };
  }
}

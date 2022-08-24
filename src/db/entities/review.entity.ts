import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  rating: number;

  @Column()
  comment: string;

  @Column({})
  userId: number;

  @Column()
  bikeId: number;

  toJSON() {
    return {
      rating: this.rating,
      bikeId: this.bikeId,
      userId: this.userId,
      comment: this.comment,
    };
  }
}

import { ERole } from 'src/models/user.models';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'text' })
  role: ERole;

  toJSON() {
    return {
      id: this.id,
      role: this.role,
      email: this.email,
    };
  }
}

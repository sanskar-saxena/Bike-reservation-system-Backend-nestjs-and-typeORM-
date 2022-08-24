import { ERole } from 'src/models/user.models';
import { text } from 'stream/consumers';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'text' })
  role: ERole;

  toJSON() {
    return {
      id: this.id,
      password: this.password,
      name: this.name,
      role: this.role,
      email: this.email,
    };
  }
}

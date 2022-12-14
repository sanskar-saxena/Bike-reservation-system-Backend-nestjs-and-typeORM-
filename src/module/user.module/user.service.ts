import { HttpException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/db/entities/user.entity';
import { ERole } from 'src/models/user.models';
import JwtUtil from 'src/utils/jwt.util';
import * as Bcrypt from 'bcryptjs';
import { ReservationEntity } from 'src/db/entities/reservations.entity';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }

  async getUsers(currentPage): Promise<Array<any>> {
    let data = await UserEntity.find({ where: {} });
    const count = data.length;
    const indexOfLastItem = Math.min(parseInt(currentPage) * 9, data.length);
    const indexOfFirstItem = 9 * (currentPage - 1);
    if (indexOfFirstItem <= indexOfLastItem) {
      data = data.slice(indexOfFirstItem, indexOfLastItem);
    }
    return [data, count];
  }

  async getUser(id: number): Promise<UserEntity> {
    const user = await UserEntity.findOne({ where: { id } });
    if (user) return user;
    else {
      throw new HttpException('Not found', 400);
    }
  }

  async doUserLogin({ email, password }) {
    const user = await UserEntity.findOne({ where: { email } });
    if (user && Bcrypt.compareSync(password, user.password)) {
      const token = JwtUtil.getJwtToken(user);

      return {
        user: user.toJSON(),
        accessToken: token,
      };
    } else {
      throw new HttpException('Email or password not matched', 400);
    }
  }

  async addUser(user) {
    const newUser = new UserEntity();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = Bcrypt.hashSync(user.password, 10);
    newUser.role = user.role;

    await newUser.save();
    return newUser.toJSON();
  }

  async doUserSignup({
    email,
    password,
    name,
    role,
  }: {
    email: string;
    password: string;
    name: string;
    role: ERole;
  }) {
    const userExist = await UserEntity.findOne({ where: { email } });
    if (userExist) {
      throw new HttpException('Email already exists!', 400);
    } else {
      const user = new UserEntity();

      user.email = email;
      user.password = Bcrypt.hashSync(password, 10);
      user.name = name;
      user.role = role;
      await user.save();
      // return user.toJSON();
      return this.doUserLogin({ email, password });
    }
  }

  async editUser({ id, user }) {
    return UserEntity.update(id, user);
  }

  async deleteUser(id) {
    const data = await ReservationEntity.find({ where: { userId: id } });
    ReservationEntity.remove(data);
    return UserEntity.delete(id);
  }
}

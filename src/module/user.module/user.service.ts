import {
  HttpException,
  Injectable,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/db/entities/user.entity';
import { ERole } from 'src/models/user.models';
import { IAuth } from 'src/utils/auth.decorator';
import JwtUtil from 'src/utils/jwt.util';
import * as Bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }

  async getUsers(currentPage): Promise<Array<any>> {
    let data = await UserEntity.find({ where: {} });
    const count = Math.ceil(data.length / 9);
    const indexOfLastItem = Math.min(parseInt(currentPage) * 9, data.length);
    const indexOfFirstItem = 9 * (currentPage - 1);
    data = data.slice(indexOfFirstItem, indexOfLastItem);
    console.log('yhaaa');
    console.log(currentPage);
    console.log(data);
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
        ...user.toJSON(),
        jwt: token,
      };
    } else {
      throw new HttpException('Email or password not matched', 400);
    }
  }

  async doUserSignup({
    email,
    password,
    role,
  }: {
    email: string;
    password: string;
    role: ERole;
  }) {
    const user = new UserEntity();
    user.email = email;
    user.password = Bcrypt.hashSync(password, 10);
    user.role = role;
    await user.save();
    // return user.toJSON();
    return this.doUserLogin({ email, password });
  }

  async editUser({ id, user }) {
    return UserEntity.update(id, user);
  }

  async deleteUser(id) {
    return UserEntity.delete(id);
  }
}

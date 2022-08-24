import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.guard';
import { IUser } from 'src/models/user.models';
import { UserEntity } from 'src/db/entities/user.entity';

interface JwtPayload {
  _id: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    try {
      const token = request.headers.authorization.split(' ')[1];
      console.log(token);
      const { _id } = jwt.verify(token, 'secret') as JwtPayload;
      const id = _id;
      const user = await UserEntity.findOne({ where: { id } });
      if (user) {
        request.authUser = user;
      }
      return this.isRolesAllowed(user, context);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }

  private isRolesAllowed(user, context) {
    console.log(user);
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    return roles ? roles.includes(user.role) : true;
  }
}

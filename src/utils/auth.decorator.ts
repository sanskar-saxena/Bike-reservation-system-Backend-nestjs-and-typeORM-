import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/models/user.models';

export interface IAuth {
  authUser: IUser;
  token: string;
}

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IAuth => {
    const request = ctx.switchToHttp().getRequest();
    const authUser = request.authUser;
    const token = request.headers.jwt;

    return { authUser, token };
  },
);

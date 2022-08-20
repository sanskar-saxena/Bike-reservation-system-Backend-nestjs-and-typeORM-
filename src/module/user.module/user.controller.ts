import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from '@nestjs/common/module-utils/constants';
import { UserEntity } from 'src/db/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guards';
import { RoleGuard } from 'src/guards/role.guard';
import { ERole } from 'src/models/user.models';
import { Auth, IAuth } from 'src/utils/auth.decorator';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @RoleGuard(ERole.Manager)
  @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Get('/page/:Pno')
  getBikes(@Auth() auth, @Param('Pno') Pno: number) {
    return this.userService.getUsers(Pno);
  }

  @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Get('/:id')
  getUser(@Auth() auth, @Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Post('/login')
  doUserLogin(
    @Body() { email, password }: { email: string; password: string },
  ) {
    return this.userService.doUserLogin({ email, password });
  }

  @Post('/signup')
  doUserSignup(
    @Body()
    { email, password, role }: { email: string; password: string; role: ERole },
  ) {
    return this.userService.doUserSignup({ email, password, role });
  }

  @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Patch('/:id')
  editUser(@Auth() auth, @Param('id') id: number, @Body() user) {
    return this.userService.editUser({ id, user });
  }

  @RoleGuard(ERole.Manager)
  @Delete('/:id')
  deleteUser(@Auth() auth, @Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}

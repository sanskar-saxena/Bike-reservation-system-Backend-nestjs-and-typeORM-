import { Query, UsePipes } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from 'src/db/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guards';
import { RoleGuard } from 'src/guards/role.guard';
import { ERole } from 'src/models/user.models';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { Auth } from 'src/utils/auth.decorator';
import { userSigninSchema, userSignupSchema } from './user.schema';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Get('/:Pno')
  getUsers(@Auth() auth, @Param('Pno') Pno: number) {
    return this.userService.getUsers(Pno);
  }

  @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Get('/page/:id')
  getUser(@Auth() auth, @Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Post('/login')
  @UsePipes(new JoiValidationPipe(userSigninSchema))
  doUserLogin(
    @Body() { email, password }: { email: string; password: string },
  ) {
    return this.userService.doUserLogin({ email, password });
  }

  @Post('/signup')
  @UsePipes(new JoiValidationPipe(userSignupSchema))
  doUserSignup(
    @Body()
    {
      email,
      password,
      name,
      role,
    }: {
      email: string;
      password: string;
      name: string;
      role: ERole;
    },
  ) {
    return this.userService.doUserSignup({ email, password, name, role });
  }

  @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Patch('/:id')
  editUser(@Auth() auth, @Param('id') id: number, @Body() user: UserEntity) {
    return this.userService.editUser({ id, user });
  }

  @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Post('')
  addUser(@Auth() auth, @Body() user: UserEntity) {
    return this.userService.addUser(user);
  }

  @RoleGuard(ERole.Manager)
  @Delete('/:id')
  deleteUser(@Auth() auth, @Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}

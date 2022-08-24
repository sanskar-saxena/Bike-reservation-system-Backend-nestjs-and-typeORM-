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
import { BikeEntity } from 'src/db/entities/bike.entity';
import { AuthGuard } from 'src/guards/auth.guards';
import { RoleGuard } from 'src/guards/role.guard';
import { ERole } from 'src/models/user.models';
import { Auth, IAuth } from 'src/utils/auth.decorator';
import { BikeService } from './bike.service';

@Controller('/bikes')
export class bikeController {
  constructor(private readonly bikeService: BikeService) {}

  // @UseGuards(AuthGuard)
  // @Get('/page/:Pno')
  // getBikes(@Auth() auth, @Param('Pno') Pno: number) {
  //   return this.bikeService.getBikes(Pno);
  // }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getBike(@Auth() auth, @Param('id') id: number) {
    return this.bikeService.getBike(id);
  }

  @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Post('')
  addBike(@Auth() auth, @Body() bike: BikeEntity) {
    return this.bikeService.addBike(bike);
  }

  @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Patch('/:id')
  editBike(@Auth() auth, @Param('id') id: number, @Body() bike: BikeEntity) {
    return this.bikeService.editBike({ id, bike });
  }

  @RoleGuard(ERole.Manager)
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteBike(@Auth() auth, @Param('id') id: number) {
    return this.bikeService.deleteBike(id);
  }

  @UseGuards(AuthGuard)
  @Post('/page/:Pno')
  applyFilter(@Auth() auth, @Body() filter, @Param('Pno') Pno: number) {
    return this.bikeService.applyFilter(filter, Pno);
  }
}

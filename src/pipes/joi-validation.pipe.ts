import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // console.log('value of joi', value);
    const { error } = this.schema.validate(value);
    // console.log(error);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return value;
  }
}

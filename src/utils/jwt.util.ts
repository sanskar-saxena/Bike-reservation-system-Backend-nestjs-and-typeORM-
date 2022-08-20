import { IUser } from 'src/models/user.models';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/db/entities/user.entity';

export default class JwtUtil {
  static getJwtToken(user: UserEntity) {
    const token = jwt.sign({ id: user.id, time: Date.now() }, 'secret', {
      expiresIn: '1h',
    });
    return token;
  }
}

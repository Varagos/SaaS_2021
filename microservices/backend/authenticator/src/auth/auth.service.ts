import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  /*
    Used by passport local
   */
  async validateUser(email: string, pass: string): Promise<any> {
    console.log('VALIDATING-2');
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new NotFoundException('User does not exist');
    const { password: hash, ...result } = user;
    const isMatch = await bcrypt.compare(pass, hash);
    if (isMatch) {
      return result;
    }
    return null;
  }

  /*
    Generate the JWT
   */
  async login(user: any) {
    const payload = { username: user.email, sub: user.user_id };
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(user: UserInterface) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    if (!hash) throw new BadRequestException('Password encryption failed');

    const hashed_user = { ...user, password: hash };
    const result = await this.userService.create(hashed_user);

    return this.login(result);
  }
}

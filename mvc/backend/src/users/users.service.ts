import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  readonly PG_UNIQUE_CONSTRAIN_VIOLATION = '23505';
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = this.manager.create(User, {
      email,
      password,
    });
    const result = await this.manager.save(user).catch((err: any) => {
      if (err.code === this.PG_UNIQUE_CONSTRAIN_VIOLATION) {
        throw new BadRequestException(`${email} is already registered.`);
      } else {
        throw new InternalServerErrorException();
      }
    });
    delete result.password;
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.manager.find(User);
  }

  async findOne(id: number): Promise<User> {
    return this.manager.findOne(User, id);
  }

  async findOneByEmail(email: string): Promise<User> {
    // return this.manager.findOne(User, { email: email });
    return this.manager
      .createQueryBuilder(User, 'user')
      .select(['user.user_id', 'user.email'])
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

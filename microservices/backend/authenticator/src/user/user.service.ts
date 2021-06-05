import {
  BadRequestException,
  HttpService,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { newUserInterface } from './interfaces/new-user.interface';
import { User } from './entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private configService: ConfigService,
    private httpService: HttpService
  ) {}

  async create(createUserDto: newUserInterface): Promise<User> {
    return this.manager.transaction(async (manager) => {
      const user = manager.create(User, createUserDto);
      const emailExists = await this.findOneByEmail(user.email);
      if (emailExists) throw new BadRequestException('User already exists');
      //Save entity to DB - return final object promise (with id)
      const user_result = await manager.save(user).then((result) => {
        delete result.password;
        return result;
      });
      await this.publish('USER_ADDED', user_result);
      return user_result;
    });
  }

  async findAll(): Promise<User[]> {
    return this.manager.find(User);
  }

  async findOne(id: number): Promise<User> {
    //Could add relations as 3rd argument(joins) if we had any
    const user = await this.manager.findOne(User, id);
    if (!user) throw new NotFoundException(`User ${id} not found.`);
    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.manager.findOne(User, { email: email });
  }

  // async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //   return this.manager.transaction(async (manager) => {
  //     const user = await manager.findOne(User, id);
  //     if (!user) throw new NotFoundException(`User ${id} not found.`);
  //     // merge updateUserDto into user
  //     manager.merge(User, user, updateUserDto);
  //     return manager.save(user);
  //   });
  // }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) throw new NotFoundException(`User ${id} not found.`);
      await manager.delete(User, id);
    });
  }

  async publish(eventType: string, eventPayload) {
    if (process.env.NODE_ENV === 'test') return;
    const host = this.configService.get<string>('CHOREOGRAPHER_HOST');
    const port = this.configService.get<string>('CHOREOGRAPHER_PORT');
    const url = `http://${host}:${port}/bus`;

    this.httpService
      .post(url, { type: eventType, payload: eventPayload })
      .subscribe(
        (response) => {
          console.log(eventType, response.statusText);
        },
        (error) => {
          console.log('ERROR:', error);
        }
      );
  }
}

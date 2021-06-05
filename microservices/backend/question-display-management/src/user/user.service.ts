import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  //each time a userService is created, an entity manager must be passed
  //that will be saved in private field manager
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createUserDto): Promise<User> {
    const user = this.manager.create(User, createUserDto);
    return this.manager.save(user);
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
}

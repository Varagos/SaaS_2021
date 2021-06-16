import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserEventDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('USER_ADDED')
  create(event: CreateUserEventDto) {
    console.log(event);
    return this.userService.create(event.payload);
  }
}

import {Body, Controller, Post} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserEventDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('USER_ADDED')
  create(@Body() event: CreateUserEventDto) {
    console.log(event);
    return this.userService.create(event.payload);
  }
}

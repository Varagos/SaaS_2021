import { Controller, Get, UseGuards } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserEventDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Question } from '../question/entities/question.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('USER_ADDED')
  create(event: CreateUserEventDto) {
    console.log(event);
    return this.userService.create(event.payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('hourly_avg')
  async monthlyCount(): Promise<Question[]> {
    return this.userService.hourlyCount();
  }
}

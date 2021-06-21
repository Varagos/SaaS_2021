import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserEventDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Question } from '../question/entities/question.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('USER_ADDED')
  create(@Body() event: CreateUserEventDto) {
    console.log(event);
    return this.userService.create(event.payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('hourly_avg')
  async monthlyCount(): Promise<Question[]> {
    return this.userService.hourlyCount();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async findProfile(@Request() req) {
    console.log(req.user);
    const userQuestions = await this.userService.findUserQuestions(
      req.user.userId,
    );
    const userAnswers = await this.userService.findUserAnswers(req.user.userId);
    return { ...userQuestions, ...userAnswers };
  }
}

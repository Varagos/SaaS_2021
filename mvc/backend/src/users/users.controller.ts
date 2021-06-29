import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Question } from '../questions/entities/question.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/analytics/hourly_avg')
  async monthlyCount(): Promise<Question[]> {
    return this.usersService.hourlyCount();
  }

  @Get('/analytics/profile')
  async findProfile(@Request() req) {
    const { user_id } = req.user;
    const userQuestions = await this.usersService.findUserQuestions(user_id);
    const userAnswers = await this.usersService.findUserAnswers(user_id);
    return { ...userQuestions, ...userAnswers };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }
}

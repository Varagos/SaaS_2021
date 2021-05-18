import {
  Controller,
  Get,
  Request,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NewUserDto } from '../user/dto/new-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

/*
  The builtin Guard invokes the Passport strategy and kicks off the validation steps
 */

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    /*
    Passport automatically creates user object
    based on value returned from validate()
    */
    return this.authService.login(req.user);
  }

  /*
    Our JwtAuthGuard assigns the user property to the Request once validated
   */

  @Post('register')
  async register(@Body() newUserDto: NewUserDto) {
    return this.authService.register(newUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

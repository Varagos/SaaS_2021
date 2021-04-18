import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { NewUserDto } from './user/dto/new-user.dto';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
/*
  The builtin Guard invokes the Passport strategy and kicks off the steps of validation
 */

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    /*
    Passport automatically creates user object
    based on value returned from validate()
    */
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() newUserDto: NewUserDto) {
    return this.authService.register(newUserDto);
  }

  /*
    Our JwtAuthGuard assigns the user property to the Request once validated
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

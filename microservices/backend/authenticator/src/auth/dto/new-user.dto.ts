import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class NewUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

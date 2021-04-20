import { IsEmail, IsString } from 'class-validator';

export class NewUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

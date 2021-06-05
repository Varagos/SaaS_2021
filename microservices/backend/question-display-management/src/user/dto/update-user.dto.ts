import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEventDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserEventDto) {}

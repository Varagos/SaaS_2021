import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEventDto } from './create-user.dto';

export class UpdateUserEventDto extends PartialType(CreateUserEventDto) {}

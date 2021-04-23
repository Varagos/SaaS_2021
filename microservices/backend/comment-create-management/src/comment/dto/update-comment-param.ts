import { IsNumberString, IsString } from 'class-validator';

export class UpdateOneParams {
  @IsNumberString()
  id: number;
}

import { IsNumberString, IsString } from 'class-validator';

export class DeleteOneParams {
  @IsNumberString()
  id: number;
}

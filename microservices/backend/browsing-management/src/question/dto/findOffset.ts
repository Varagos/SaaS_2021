import { IsNumberString } from 'class-validator';

export class FindOffsetParams {
  @IsNumberString()
  offset: number;
}

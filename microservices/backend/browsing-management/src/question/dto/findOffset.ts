import { IsPositive, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class FindOffsetParams {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page: number;
}

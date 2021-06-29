import { IsPositive, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit: number;
}

import { IsPositive, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateKeywordsDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit: number;

  @Type(() => Number)
  @IsInt({ each: true })
  @IsPositive({ each: true })
  keywords: number[];
}

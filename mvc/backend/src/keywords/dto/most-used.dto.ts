import { IsDateString, IsOptional } from 'class-validator';

export class MostUsedDto {
  @IsOptional()
  @IsDateString()
  start: Date;

  @IsOptional()
  @IsDateString()
  end: Date;
}

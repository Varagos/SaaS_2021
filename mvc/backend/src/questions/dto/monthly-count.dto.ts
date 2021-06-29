import { IsDateString, IsOptional } from 'class-validator';

export class MonthlyCountDto {
  @IsOptional()
  @IsDateString()
  start: Date;

  @IsOptional()
  @IsDateString()
  end: Date;
}

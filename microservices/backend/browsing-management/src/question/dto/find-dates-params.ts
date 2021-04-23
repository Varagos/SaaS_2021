import { IsDateString } from 'class-validator';

export class FindDatesParams {
  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;
}

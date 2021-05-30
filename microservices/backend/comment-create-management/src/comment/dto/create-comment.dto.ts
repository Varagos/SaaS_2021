import {IsNotEmpty, IsPositive, IsString} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  @IsPositive()
  readonly question_id: number;
}

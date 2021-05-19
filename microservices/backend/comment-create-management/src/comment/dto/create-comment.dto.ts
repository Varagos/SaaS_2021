import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly question_id: number;
}

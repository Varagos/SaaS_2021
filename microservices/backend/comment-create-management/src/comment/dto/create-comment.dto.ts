import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  @IsInt()
  readonly question_id: number;
}

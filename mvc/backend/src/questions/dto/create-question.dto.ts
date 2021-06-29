import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsOptional()
  @IsArray()
  readonly keywords: string[];
}

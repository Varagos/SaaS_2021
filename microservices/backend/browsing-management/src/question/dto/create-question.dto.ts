export class CreateQuestionDto {
  readonly title: string;
  readonly text: string;
  readonly keywords: string[];
  readonly user_id: number;
}

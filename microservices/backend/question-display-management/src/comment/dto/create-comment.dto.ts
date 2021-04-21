export class CreateCommentDto {
  readonly text: string;
  readonly question: { question_id: number };
  readonly user: { user_id: number };
}

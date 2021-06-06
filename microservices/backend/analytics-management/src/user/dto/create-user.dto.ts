export class CreateUserEventDto {
  readonly type: string;
  readonly payload: {
    readonly user_id: number;
    readonly email: string;
  };
}

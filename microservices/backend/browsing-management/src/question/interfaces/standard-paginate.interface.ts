import { Question } from '../entities/question.entity';

export interface StandardPaginateInterface {
  questions: Question[];
  last: number;
}

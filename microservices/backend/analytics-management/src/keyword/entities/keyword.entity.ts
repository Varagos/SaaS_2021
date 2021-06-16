import { Column, Entity, ManyToMany, PrimaryColumn, Unique } from 'typeorm';
import { Question } from '../../question/entities/question.entity';

@Unique(['description'])
@Entity()
export class Keyword {
  @PrimaryColumn()
  keyword_id: number;

  @Column()
  description: string;

  @ManyToMany((type) => Question, (question) => question.keywords)
  questions: Question[];
}

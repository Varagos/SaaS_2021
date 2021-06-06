import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';

@Unique(['description'])
@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  keyword_id: number;

  @Column()
  description: string;

  @ManyToMany((type) => Question, (question) => question.keywords)
  questions: Question[];
}

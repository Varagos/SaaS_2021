import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import lowercase from '../lowerCase';
import { Question } from '../../question/entities/question.entity';

@Unique(['description'])
@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  keyword_id: number;

  @Column({ transformer: lowercase })
  description: string;

  @ManyToMany((type) => Question, (question) => question.keywords)
  questions: Question[];
}

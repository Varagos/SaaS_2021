import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Keyword } from '../../keyword/entities/keyword.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  question_id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  text: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  user_id: number;

  @ManyToMany((type) => Keyword, (category) => category.questions, {
    cascade: true,
  })
  @JoinTable()
  keywords: Keyword[];
}

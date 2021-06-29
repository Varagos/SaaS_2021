import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { User } from '../../users/entities/user.entity';
import { JoinColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column({ type: 'text' })
  text: string;

  @CreateDateColumn()
  date: Date;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  question_id: number;

  @ManyToOne(() => Question, (question) => question.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => User, (user) => user.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

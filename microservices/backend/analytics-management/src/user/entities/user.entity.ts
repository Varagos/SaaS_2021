import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class User {
  @PrimaryColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}

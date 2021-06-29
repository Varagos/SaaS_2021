import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}

import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryColumn()
  comment_id: number;

  @Column({ type: 'text' })
  text: string;

  @Column()
  date: Date;

  @ManyToOne(() => Question, (question) => question.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' }) // this decorator is optional for @ManyToOne, but required for @OneToOne, CREATES FK COL
  question: Question;

  @ManyToOne(() => User, (user) => user.comments, {
    nullable: false,
    onDelete: 'CASCADE', // Delete comment when user is deleted
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Keyword } from '../../keyword/entities/keyword.entity';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Question {
  @PrimaryColumn()
  question_id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  text: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.questions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany((type) => Keyword, (category) => category.questions, {
    cascade: true,
  })
  @JoinTable()
  keywords: Keyword[];

  @OneToMany(() => Comment, (comment) => comment.question)
  comments: Comment[];
}

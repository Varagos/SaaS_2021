import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Keyword } from '../../keywords/entities/keyword.entity';
import { JoinTable } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

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

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => User, (user) => user.questions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Keyword, (keyword) => keyword.questions, { cascade: true })
  @JoinTable()
  keywords: Keyword[];

  @OneToMany(() => Comment, (comment) => comment.question)
  comments: Comment[];
}

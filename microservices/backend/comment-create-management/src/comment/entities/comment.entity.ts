import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column({ type: 'text' })
  text: string;

  @CreateDateColumn()
  date: Date;

  @Column({ nullable: false })
  question_id: number;

  @Column({ nullable: false })
  user_id: number;
}

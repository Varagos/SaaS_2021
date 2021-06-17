import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  create(createUserDto): Promise<User> {
    const user = this.manager.create(User, createUserDto);
    return this.manager.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.manager.find(User);
  }

  async findOne(id: number): Promise<User> {
    //Could add relations as 3rd argument(joins) if we had any
    const user = await this.manager.findOne(User, id);
    if (!user) throw new NotFoundException(`User ${id} not found.`);
    return user;
  }

  async remove(id: number): Promise<void> {
    return this.manager.transaction(async (manager) => {
      const user = await manager.findOne(User, id);
      if (!user) throw new NotFoundException(`User ${id} not found.`);
      await manager.delete(User, id);
    });
  }

  async hourlyCount(): Promise<Question[]> {
    const rawData = await this.manager
      .query(`SELECT date_part('hour', question.date) as hour,
                    trunc(count(question_id)::decimal / count(distinct question.user_id), 2) as "AvgQuestions",
                    trunc(count(comment.comment_id)::decimal / nullif(count(distinct comment.user_id),0), 2) as "AvgAnswers"
                    FROM question
                    LEFT JOIN comment USING(question_id)
                    group by 1
                    order by 1;`);

    const initial = {
      labels: [],
      datasets: [
        { label: 'AvgQuestions', data: [] },
        { label: 'AvgAnswers', data: [] },
      ],
    };
    return rawData.reduce((acc, curr) => {
      console.log(curr);
      acc.labels.push(this.timeFormat(curr.hour));
      acc.datasets[0].data.push(curr.AvgQuestions);
      acc.datasets[1].data.push(curr.AvgAnswers);
      return acc;
    }, initial);
  }

  timeFormat(myTime: number): string {
    const h = myTime % 12 || 12;
    const ampm = myTime < 12 || myTime === 24 ? 'AM' : 'PM';
    return `${h} ${ampm}`;
  }
}

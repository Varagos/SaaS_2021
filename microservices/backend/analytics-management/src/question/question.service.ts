import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestionInterface } from './interfaces/question.interface';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Between } from 'typeorm';
import { Keyword } from '../keyword/entities/keyword.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(questionReceived: QuestionInterface) {
    await this.manager.transaction(async (manager) => {
      const keyword_entities = questionReceived.keywords.map(
        ({ keyword_id, description }) => {
          return manager.create(Keyword, { keyword_id, description });
        },
      );
      const userObj = { user_id: questionReceived.user_id };
      await manager.save(Question, {
        ...questionReceived,
        keywords: keyword_entities,
        user: userObj,
      });
    });
  }

  async remove(id: number) {
    await this.manager.delete(Question, id); //Should also delete its comments
  }

  async findAll() {
    return this.manager.find(Question);
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.manager.findOne(Question, id);
    if (!question)
      throw new NotFoundException(`Question with id:${id} not found`);
    return question;
  }

  async findOneWithRels(id: number): Promise<Question> {
    const question = await this.manager.findOne(Question, id, {
      relations: ['user', 'comments', 'comments.user', 'keywords'],
    });
    if (!question)
      throw new NotFoundException(`Question with id:${id} not found`);
    return question;
  }

  async daysCount(start: Date, end: Date) {
    let whereClause = '';
    // Symmetric swap dates if one is greater than the other
    if (start && end) {
      whereClause = `WHERE date BETWEEN SYMMETRIC '${start}' and '${end}'`;
    }
    const rawData = await this.manager
      .query(`SELECT date_trunc('day', date) + INTERVAL '1 day' as "Day", count(*) as "questions_count"
            FROM question
            ${whereClause}
            group by 1
            order by 1;`);
    const initial = {
      labels: [],
      datasets: [
        {
          label: 'Questions',
          data: [],
        },
      ],
    };
    return rawData.reduce((acc, curr) => {
      acc.labels.push(this.extractDate(curr.Day));
      acc.datasets[0].data.push(curr.questions_count);
      return acc;
    }, initial);
  }

  async monthlyCount(): Promise<Question[]> {
    const rawData = await this.manager
      .query(`SELECT to_char(question.date, 'Mon') as mon,
                    count(question.question_id) as "questions_count", count(comment_id) as "comments_count"
                    FROM question
                    LEFT JOIN comment using(question_id)
                    group by 1
                    order by 1;`);
    const initial = {
      labels: [],
      datasets: [
        { label: 'Questions', data: [] },
        { label: 'Answers', data: [] },
      ],
    };
    return rawData.reduce((acc, curr) => {
      console.log(curr);
      acc.labels.push(curr.mon);
      acc.datasets[0].data.push(curr.questions_count);
      acc.datasets[1].data.push(curr.comments_count);
      return acc;
    }, initial);
  }

  extractDate(myDate: Date): string {
    return myDate.toISOString().slice(0, 10);
  }
}

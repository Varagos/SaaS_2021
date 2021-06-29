import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Keyword } from '../keywords/entities/keyword.entity';
import { Question } from './entities/question.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Between } from 'typeorm';
import { KeywordsService } from '../keywords/keywords.service';
import { StandardPaginateInterface } from './interfaces/standard-paginate.interface';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private keywordsService: KeywordsService,
  ) {}

  create(createQuestionDto: CreateQuestionDto, user_id: number) {
    return this.manager.transaction(async (manager) => {
      //Executed async in "parallel"
      const keywordEntities = await Promise.all(
        createQuestionDto.keywords.map(async (desc) => {
          return await this.keywordsService
            .findOneByDesc(desc)
            .catch(async () => {
              //Not found, so we can safely add
              const newKeyword = new Keyword();
              newKeyword.description = desc;
              await manager.save(newKeyword);
              return newKeyword;
            });
        }),
      );

      return manager
        .save(Question, {
          ...createQuestionDto,
          keywords: keywordEntities,
          user: { user_id }, //find keyword from JWT?
        })
        .catch((err) => {
          console.log(err);
          throw new BadRequestException();
        });
    });
  }

  findAll() {
    return this.manager.find(Question);
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.manager.findOne(Question, id, {
      relations: ['user', 'comments', 'comments.user', 'keywords'],
    });
    if (!question)
      throw new NotFoundException(`Question with id:${id} not found`);
    return question;
  }

  remove(id: number, requesterId) {
    return this.manager.transaction(async (manager) => {
      const question = await manager.findOne(Question, id);
      if (!question)
        throw new NotFoundException(`Question with id: ${id} not found`);
      console.log(question);
      if (question.user_id !== requesterId) throw new UnauthorizedException();

      return manager.remove(question);
    });
  }

  async findSimplePagination(
    page: number,
    limit = 10,
  ): Promise<StandardPaginateInterface> {
    // where: { keywords: { keyword_id: 1 } },
    const [questionsAsked, questionsCount] = await this.manager
      .findAndCount(Question, {
        relations: ['keywords'],
        order: { date: 'DESC' },
        skip: page * limit,
        take: limit,
      })
      .catch((error) => {
        console.log(error);
        throw new NotFoundException('');
      });
    const finalPage = Math.ceil(questionsCount / limit) || 1; // return 1 if zero
    return { questions: questionsAsked, last: finalPage };
  }

  async findKeywordsPagination(
    page: number,
    keywords: number[],
    limit = 10,
  ): Promise<StandardPaginateInterface> {
    const questionsAsked = await this.manager
      .createQueryBuilder(Question, 'question')
      .leftJoinAndSelect('question.keywords', 'keyword')
      .select(['question.question_id'])
      .where('keyword.keyword_id IN (:...keywordIds)', { keywordIds: keywords })
      .getMany();

    const totalCnt = questionsAsked.length;
    const slicedRes = questionsAsked.slice(page * limit, page * limit + limit);
    const questionIds = slicedRes.map((obj) => obj.question_id);
    const finalQuestions = await this.manager.findByIds(Question, questionIds, {
      relations: ['keywords'],
      order: { date: 'DESC' },
    });

    const finalPage = Math.ceil(totalCnt / limit) || 1; // return 1 if zero
    return { questions: finalQuestions, last: finalPage };
  }

  async findBetweenDates(start: Date, end: Date, page: number, limit = 10) {
    // const startDate = new Date(start + 'T00:00:00');
    // const endDate = new Date(end + 'T00:00:00');
    const [questionsAsked, questionsCount] = await this.manager.findAndCount(
      Question,
      {
        relations: ['keywords'],
        where: { date: Between(start, end) },
        order: { date: 'DESC' },
        skip: page * limit,
        take: limit,
      },
    );
    const finalPage = Math.ceil(questionsCount / limit) || 1; // return 1 if zero
    return { questions: questionsAsked, last: finalPage };
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

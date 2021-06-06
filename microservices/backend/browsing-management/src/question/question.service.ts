import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { QuestionInterface } from './interfaces/question.interface';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Between, EntityManager } from 'typeorm';
import { Keyword } from '../keyword/entities/keyword.entity';
import { Question } from './entities/question.entity';
import { StandardPaginateInterface } from './interfaces/standard-paginate.interface';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}
  private readonly logger = new Logger(QuestionService.name);

  create(questionReceived: QuestionInterface) {
    this.logger.log(`question received: ${questionReceived}`);
    console.log(questionReceived);
    return this.manager.transaction(async (manager) => {
      // Create keyword Entity instances
      const keyword_entities = questionReceived.keywords.map(
        ({ keyword_id, description }) => {
          return manager.create(Keyword, { keyword_id, description });
        }
      );
      // If the entity already exists in the database, then it's updated.
      const addedQuestion = await manager.save(Question, {
        ...questionReceived,
        keywords: keyword_entities,
      });
      this.logger.log(`question saved: ${addedQuestion}`);
      console.log(addedQuestion);
    });
  }

  async remove(id: number) {
    await this.manager.delete(Question, id);
  }

  async findAll() {
    //fresh first
    return this.manager.find(Question, { order: { date: 'DESC' } });
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.manager.findOne(Question, id);
    if (!question)
      throw new NotFoundException(`Question with id:${id} not found`);
    return question;
  }

  async findSimplePagination(
    page: number,
    limit = 10
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
    limit = 10
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
      }
    );
    const finalPage = Math.ceil(questionsCount / limit) || 1; // return 1 if zero
    return { questions: questionsAsked, last: finalPage };
  }
}

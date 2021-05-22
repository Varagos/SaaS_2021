import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestionInterface } from './interfaces/question.interface';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Between, EntityManager } from 'typeorm';
import { Keyword } from '../keyword/entities/keyword.entity';
import { Question } from './entities/question.entity';
import { KeywordService } from '../keyword/keyword.service';
import { StandardPaginateInterface } from './interfaces/standard-paginate.interface';

@Injectable()
export class QuestionService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private keywordService: KeywordService,
  ) {}

  create(questionReceived: QuestionInterface) {
    console.log('question received', questionReceived);
    return this.manager.transaction(async (manager) => {
      //Executed async in parallel
      const keyword_entities = await Promise.all(
        questionReceived.keywords.map(async (keywordObj) => {
          try {
            return await this.keywordService.findOneByDesc(
              keywordObj.description,
            );
          } catch (err) {
            //Not found, so we can safely add
            const newKeyword = new Keyword();
            newKeyword.description = keywordObj.description;
            await manager.save(newKeyword);
            return newKeyword;
          }
        }),
      );

      const addedQuestion = await manager.save(Question, {
        ...questionReceived,
        keywords: keyword_entities,
      });
      console.log('question saved', addedQuestion);
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

  async findBetweenDates(start: Date, end: Date) {
    // const startDate = new Date(start + 'T00:00:00');
    // const endDate = new Date(end + 'T00:00:00');
    return await this.manager.find(Question, {
      relations: ['keywords'],
      where: { date: Between(start, end) },
      order: { date: 'DESC' },
    });
  }

  async findPageWithRelations(
    page: number,
    limit: number,
  ): Promise<StandardPaginateInterface> {
    const [questionsAsked, questionsCount] = await this.manager.findAndCount(
      Question,
      {
        relations: ['keywords'],
        order: { date: 'DESC' },
        skip: page * limit,
        take: limit,
      },
    );
    const finalPage = Math.ceil(questionsCount / limit);
    return { questions: questionsAsked, last: finalPage };
    // return questionsAsked;
  }

  /*
  Alternative findPage using queryBuilder in Case entity manager presents issues

  async findPage(page: number, limit: number): Promise<Question[]> {
    return this.manager
      .createQueryBuilder(Question, 'question')
      .orderBy('date', 'DESC')
      .limit(limit)
      .offset(page * limit)
      .getMany();
  }
  */
}

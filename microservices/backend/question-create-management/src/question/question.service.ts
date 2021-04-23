import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Question } from './entities/question.entity';
import { Keyword } from '../keyword/entities/keyword.entity';
import { KeywordService } from '../keyword/keyword.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class QuestionService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    @Inject('QUESTION_SERVICE') private client: ClientProxy,
    private keywordService: KeywordService,
  ) {}

  async create(
    createQuestionDto: CreateQuestionDto,
    user_id: number,
  ): Promise<Question> {
    return this.manager.transaction(async (manager) => {
      //Executed async in parallel
      const keyword_entities = await Promise.all(
        createQuestionDto.keywords.map(async (desc) => {
          try {
            return await this.keywordService.findOneByDesc(desc);
          } catch (err) {
            //Not found, so we can safely add
            const newKeyword = new Keyword();
            newKeyword.description = desc;
            await manager.save(newKeyword);
            return newKeyword;
          }
        }),
      );
      const addedQuestion = await manager.save(Question, {
        ...createQuestionDto,
        keywords: keyword_entities,
        user_id: user_id, //find keyword from JWT?
      });
      await this.publish('question_created', addedQuestion);
      return addedQuestion;
    });
  }

  // async update(id: number, updateQuestionDto: UpdateQuestionDto) {
  //   return `This action updates a #${id} question`;
  // }

  async remove(id: number) {
    return this.manager.transaction(async (manager) => {
      const question = await manager.findOne(Question, id);
      if (!question) throw new NotFoundException(`Question ${id} not found.`);
      await manager.delete(Question, id);
      return { message: `Question ${id} deleted` };
    });
  }

  async publish(eventName: string, questionCreatedEvent) {
    this.client.emit<number>(eventName, questionCreatedEvent);
  }
}

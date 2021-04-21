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

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
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
        user_id: 24, //find keyword from JWT?
      });
      // await this.publish({
      //   ...createQuestionDto,
      //   user_id: 1,
      // });
      await this.publish(addedQuestion);
      return addedQuestion;
    });
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

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  async remove(id: number) {
    return this.manager.transaction(async (manager) => {
      const question = await manager.findOne(Question, id);
      if (!question) throw new NotFoundException(`Question ${id} not found.`);
      await manager.delete(Question, id);
      return { message: `Question ${id} deleted` };
    });
  }

  async publish(questionCreatedEvent) {
    this.client.emit<number>('question_created', questionCreatedEvent);
  }
}

import {
  HttpService,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Question } from './entities/question.entity';
import { Keyword } from '../keyword/entities/keyword.entity';
import { KeywordService } from '../keyword/keyword.service';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuestionService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    @Inject('QUESTION_SERVICE') private client: ClientProxy,
    private keywordService: KeywordService,
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async create(
    createQuestionDto: CreateQuestionDto,
    user_id: number
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
        })
      );
      const addedQuestion = await manager.save(Question, {
        ...createQuestionDto,
        keywords: keyword_entities,
        user_id: user_id, //find keyword from JWT?
      });
      await this.publish('QUESTION_ADDED', addedQuestion);
      return addedQuestion;
    });
  }

  async remove(id: number, requesterId: number) {
    return this.manager.transaction(async (manager) => {
      const question = await manager.findOne(Question, id);
      if (!question)
        throw new NotFoundException(`Question with id: ${id} not found`);
      if (question.user_id !== requesterId) throw new UnauthorizedException();

      const questionRemoved = await manager.remove(question);
      await this.publish('question_deleted', { question_id: id });
      return questionRemoved;
    });
  }

  async publish(eventType: string, eventPayload) {
    // this.client.emit<number>(eventName, eventPayload);

    const host = this.configService.get<string>('CHOREOGRAPHER_HOST');
    const port = this.configService.get<string>('CHOREOGRAPHER_PORT');
    const url = `http://${host}:${port}/bus`;

    this.httpService
      .post(url, {
        type: eventType,
        payload: { question: eventPayload },
      })
      .subscribe(
        (response) => {
          console.log(eventType, response.statusText);
        },
        (error) => {
          console.log('ERROR:', error);
        }
      );
  }
}

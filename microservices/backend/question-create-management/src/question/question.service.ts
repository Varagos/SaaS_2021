import {
  BadRequestException,
  HttpService,
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
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuestionService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
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
      const question = await manager.save(Question, {
        ...createQuestionDto,
        keywords: keyword_entities,
        user_id: user_id, //find keyword from JWT?
      });
      await this.publish('QUESTION_ADDED', question);
      return question;
    });
  }

  async remove(id: number, requesterId: number) {
    return this.manager.transaction(async (manager) => {
      const question = await manager.findOne(Question, id);
      if (!question)
        throw new NotFoundException(`Question with id: ${id} not found`);
      if (question.user_id !== requesterId) throw new UnauthorizedException();

      const questionRemoved = await manager.remove(question);
      await this.publish('QUESTION_DELETED', { question_id: id });
      return questionRemoved;
    });
  }

  async publish(eventType: string, eventPayload) {
    const host = this.configService.get<string>('CHOREOGRAPHER_HOST');
    const port = this.configService.get<string>('CHOREOGRAPHER_PORT');
    let url = `http://${host}:${port}/bus`;
    if (process.env.NODE_ENV === 'production') {
      url = `https://${host}/bus`;
    }
    console.log(`Publishing event to ${url}`);

    this.httpService
      .post(url, {
        type: eventType,
        payload: eventPayload,
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

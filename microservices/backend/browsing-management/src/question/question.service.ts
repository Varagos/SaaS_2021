import { Injectable } from '@nestjs/common';
import { QuestionInterface } from './interfaces/question.interface';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Keyword } from '../keyword/entities/keyword.entity';
import { Question } from './entities/question.entity';
import { KeywordService } from '../keyword/keyword.service';

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
        questionReceived.keywords.map(async (desc) => {
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
        ...questionReceived,
        keywords: keyword_entities,
      });
      console.log('question saved', addedQuestion);
    });
  }
}

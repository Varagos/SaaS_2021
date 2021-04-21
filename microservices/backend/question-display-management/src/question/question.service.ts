import { Injectable } from '@nestjs/common';
import { QuestionInterface } from './interfaces/question.interface';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Keyword } from '../keyword/entities/keyword.entity';
import { Question } from './entities/question.entity';
import { KeywordService } from '../keyword/keyword.service';
import { User } from '../user/entities/user.entity';

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

      const userObj = { user_id: questionReceived.user_id };

      const addedQuestion = await manager.save(Question, {
        ...questionReceived,
        keywords: keyword_entities,
        user: userObj,
      });
      console.log('question saved', addedQuestion);
    });
  }
}

import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QuestionService } from './question/question.service';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private questionService: QuestionService
  ) {}
  getHello(): string {
    return '(: Hello World! :)';
  }

  async synchronizeData() {
    console.log('Starting database syncrhonization');

    const newQuestions = await this.getQuestionQueue('QUESTION_ADDED');
    const deletedQuestions = await this.getQuestionQueue('QUESTION_DELETED');

    const result = newQuestions.filter(
      ({ question_id: id1 }) =>
        !deletedQuestions.some(({ question_id: id2 }) => id2 === id1)
    );
    console.log('new questions:', newQuestions);
    console.log('deleted questions:', deletedQuestions);
    console.log('array dif is:', result);
    result.forEach((question) => this.questionService.create(question));
  }

  async getQuestionQueue(type) {
    const host = this.configService.get('CHOREOGRAPHER_HOST');
    const port = this.configService.get('CHOREOGRAPHER_PORT');
    const url = `http://${host}:${port}/bus/${type}`;
    return await this.httpService
      .get(url)
      .toPromise()
      .then((response) => {
        return response.data.map((event) => event.payload);
      });

    // .subscribe(
    //   (response) => {
    //     return response.data.map((event) => event.payload.question);
    //   },
    //   (error) => console.log('ERROR', error)
    // );
  }
}

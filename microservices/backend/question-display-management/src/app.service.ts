import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QuestionService } from './question/question.service';
import { CommentService } from './comment/comment.service';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private userService: UserService,
    private questionService: QuestionService,
    private commentService: CommentService
  ) {}

  async synchronizeData() {
    console.log('Starting database syncrhonization');
    const [newUsers, error1] = await this.getQuestionQueue('USER_ADDED');
    if (error1) return;
    console.log('new users:', newUsers);
    await Promise.all(
      newUsers.map(async (user) => {
        await this.userService
          .create(user)
          .catch((error) => console.log(error));
      })
    );

    const [newQuestions, error2] = await this.getQuestionQueue(
      'QUESTION_ADDED'
    );
    const [deletedQuestions, error3] = await this.getQuestionQueue(
      'QUESTION_DELETED'
    );
    if (error2 || error3) return;

    const finalQuestions = newQuestions.filter(
      ({ question_id: id1 }) =>
        !deletedQuestions.some(({ question_id: id2 }) => id2 === id1)
    );
    console.log('new questions:', newQuestions);
    console.log('deleted questions:', deletedQuestions);
    console.log('array dif is:', finalQuestions);
    await Promise.all(
      finalQuestions.map(async (question) => {
        await this.questionService
          .create(question)
          .catch((error) => console.log(error));
      })
    );

    const [newComments, error4] = await this.getQuestionQueue('COMMENT_ADDED');
    const [deletedComments, error5] = await this.getQuestionQueue(
      'COMMENT_DELETED'
    );
    if (error4 || error5) return;
    let finalComments = newComments.filter(
      ({ comment_id: id1 }) =>
        !deletedComments.some(({ comment_id: id2 }) => id2 === id1)
    );
    /* Remove comments of deleted questions */
    finalComments = finalComments.filter(
      ({ question_id: id1 }) =>
        !deletedQuestions.some(({ question_id: id2 }) => id2 === id1)
    );
    console.log('new comments:', newComments);
    console.log('deleted comments:', deletedComments);
    console.log('array dif is:', finalComments);

    await Promise.all(
      finalComments.map(async (comment) => {
        await this.formatAndCreateComment(comment).catch((error) =>
          console.log(error)
        );
      })
    );
  }

  async getQuestionQueue(type) {
    const host = this.configService.get('CHOREOGRAPHER_HOST');
    const port = this.configService.get('CHOREOGRAPHER_PORT');
    let url = `http://${host}:${port}/bus/${type}`;
    if (process.env.NODE_ENV === 'production') {
      url = `https://${host}/bus/${type}`;
    }
    try {
      const data = await this.httpService
        .get(url)
        .toPromise()
        .then((response) => {
          return response.data.map((event) => event.payload);
        });
      return [data, null];
    } catch (error) {
      console.log('CHOREOGRAPHER NOT RESPONDING');
      console.log(error);
      return [null, error];
    }
  }

  async formatAndCreateComment(commentObj) {
    const { user_id, question_id, ...structuredComment } = commentObj;
    structuredComment.user = { user_id };
    structuredComment.question = { question_id };
    return this.commentService.create(structuredComment);
  }
}

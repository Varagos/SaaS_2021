import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { Question } from '../questions/entities/question.entity';

@Injectable()
export class UsersService {
  readonly PG_UNIQUE_CONSTRAIN_VIOLATION = '23505';
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = this.manager.create(User, {
      email,
      password,
    });
    const result = await this.manager.save(user).catch((err: any) => {
      if (err.code === this.PG_UNIQUE_CONSTRAIN_VIOLATION) {
        throw new BadRequestException(`${email} is already registered.`);
      } else {
        throw new InternalServerErrorException();
      }
    });
    delete result.password;
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.manager.find(User);
  }

  async findOne(id: number): Promise<User> {
    return this.manager.findOne(User, id);
  }

  async findOneByEmail(email: string): Promise<User> {
    // return this.manager.findOne(User, { email: email });
    return this.manager
      .createQueryBuilder(User, 'user')
      .select(['user.user_id', 'user.email'])
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async hourlyCount(): Promise<Question[]> {
    const rawData = await this.manager
      .query(`SELECT date_part('hour', question.date) as hour,
                    trunc(count(question_id)::decimal / count(distinct question.user_id), 2) as "AvgQuestions",
                    trunc(count(comment.comment_id)::decimal / nullif(count(distinct comment.user_id),0), 2) as "AvgAnswers"
                    FROM question
                    LEFT JOIN comment USING(question_id)
                    group by 1
                    order by 1;`);

    const initial = {
      labels: [],
      datasets: [
        { label: 'AvgQuestions', data: [] },
        { label: 'AvgAnswers', data: [] },
      ],
    };
    return rawData.reduce((acc, curr) => {
      console.log(curr);
      acc.labels.push(this.timeFormat(curr.hour));
      acc.datasets[0].data.push(curr.AvgQuestions);
      acc.datasets[1].data.push(curr.AvgAnswers);
      return acc;
    }, initial);
  }

  timeFormat(myTime: number): string {
    const h = myTime % 12 || 12;
    const ampm = myTime < 12 || myTime === 24 ? 'AM' : 'PM';
    return `${h} ${ampm}`;
  }

  async findUserQuestions(id: number): Promise<User> {
    return this.manager
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.questions', 'question')
      .where('user.user_id = :user_id', { user_id: id })
      .getOne();
  }

  async findUserAnswers(id: number) {
    return await this.manager
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.comments', 'comment')
      .where('user.user_id = :user_id', { user_id: id })
      .leftJoinAndSelect('comment.question', 'question')
      .getOne();
  }
}

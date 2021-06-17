import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Keyword } from './entities/keyword.entity';

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createKeywordDto: CreateKeywordDto) {
    try {
      await this.findOneByDesc(createKeywordDto.description);
    } catch (err) {
      return this.manager.save(Keyword, { ...createKeywordDto });
    }
    throw new BadRequestException(
      `Keyword with description: ${createKeywordDto.description} exists`,
    );
  }

  async findAll() {
    return await this.manager.find(Keyword);
  }

  // async findOne(id: number) {
  //   return this.findOneByDesc('Hello');
  //   return `This action returns a #${id} keyword`;
  // }

  async findOneByDesc(desc: string): Promise<Keyword> {
    const keyword = await this.manager.findOne(Keyword, { description: desc });
    if (!keyword)
      throw new NotFoundException(
        `Keyword with description: ${desc} not found`,
      );
    return keyword;
  }

  update(id: number, updateKeywordDto: UpdateKeywordDto) {
    return `This action updates a #${id} keyword`;
  }

  remove(id: number) {
    return `This action removes a #${id} keyword`;
  }

  async mostUsed(start: Date, end: Date): Promise<Keyword[]> {
    let result;
    if (start && end) {
      result = await this.manager
        .createQueryBuilder(Keyword, 'keyword')
        .select('keyword.keyword_id', 'id')
        .addSelect('keyword.description', 'label')
        .addSelect('COUNT(question)', 'count')
        .leftJoin('keyword.questions', 'question')
        .where('question.date BETWEEN :startDate AND :endDate', {
          startDate: start,
          endDate: end,
        })
        .groupBy('keyword.keyword_id')
        .orderBy('count', 'DESC')
        .limit(20)
        .getRawMany();
    } else {
      result = await this.manager
        .createQueryBuilder(Keyword, 'keyword')
        .select('keyword.keyword_id', 'id')
        .addSelect('keyword.description', 'label')
        .addSelect('COUNT(question)', 'count')
        .leftJoin('keyword.questions', 'question')
        .groupBy('keyword.keyword_id')
        .orderBy('count', 'DESC')
        .limit(20)
        .getRawMany();
    }
    console.log(result);
    return this.splitDataToArrs(result);
  }

  splitDataToArrs(rawData) {
    const initial = { labels: [], datasets: [{ label: 'Keywords', data: [] }] };
    return rawData.reduce((acc, curr) => {
      acc.labels.push(curr.label);
      acc.datasets[0].data.push(curr.count);
      return acc;
    }, initial);
  }
}

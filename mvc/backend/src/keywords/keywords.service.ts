import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { Keyword } from './entities/keyword.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class KeywordsService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}
  create(createKeywordDto: CreateKeywordDto) {
    return 'This action adds a new keyword';
  }

  findAll(): Promise<Keyword[]> {
    return this.manager.find(Keyword);
  }

  findOne(id: number) {
    return `This action returns a #${id} keyword`;
  }

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
}

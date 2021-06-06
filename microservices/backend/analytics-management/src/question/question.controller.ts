import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @EventPattern('QUESTION_ADDED')
  async create(data) {
    if (data.type) {
      console.log('Received Event:', data.type);
      await this.questionService.create(data.payload);
    }
  }

  @EventPattern('QUESTION_DELETED')
  async remove(receivedData) {
    console.log('received event:', receivedData.type);
    const { question_id } = receivedData.payload;
    await this.questionService.remove(question_id);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }
}

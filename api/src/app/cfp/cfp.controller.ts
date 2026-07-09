import { Controller, Post, Get, Body, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateSpeakerDto } from '../dto/create-speaker.dto';

@Controller('cfp')
export class CfpController {
  private proposals: CreateSpeakerDto[] = [];

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSpeakerDto: CreateSpeakerDto) {
    const proposal = {
      ...createSpeakerDto,
      id: createSpeakerDto.id || Math.random().toString(36).substring(2, 9),
    };
    this.proposals.push(proposal);
    return { success: true, proposal };
  }

  @Get()
  findAll() {
    return this.proposals;
  }
}

import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateSpeakerDto } from '../dto/create-speaker.dto';

@Controller('cfp')
export class CfpController {
  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSpeakerDto: CreateSpeakerDto) {
    return { success: true };
  }
}

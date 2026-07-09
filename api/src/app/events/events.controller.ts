import { Controller, Post, Get, Body, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createEventDto: CreateEventDto) {
    const created = this.eventsService.create(createEventDto);
    return { success: true, event: created };
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }
}

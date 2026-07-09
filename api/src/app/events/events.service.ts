import { Injectable } from '@nestjs/common';
import { EventDTO } from '@cfp-plataform/shared-types';

@Injectable()
export class EventsService {
  private events: EventDTO[] = [];

  create(event: EventDTO): EventDTO {
    const newEvent = {
      ...event,
      id: event.id || Math.random().toString(36).substring(2, 9),
    };
    this.events.push(newEvent);
    return newEvent;
  }

  findAll(): EventDTO[] {
    return this.events;
  }
}

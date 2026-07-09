import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDTO } from '@cfp-plataform/shared-types';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);
  private apiUrl = '/api/events';

  submitEvent(event: EventDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, event);
  }

  getEvents(): Observable<EventDTO[]> {
    return this.http.get<EventDTO[]>(this.apiUrl);
  }
}

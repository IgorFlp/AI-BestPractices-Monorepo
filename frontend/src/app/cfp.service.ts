import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpeakerDTO } from '@cfp-plataform/shared-types';

@Injectable({
  providedIn: 'root',
})
export class CfpService {
  private http = inject(HttpClient);
  private apiUrl = '/api/cfp';

  submitProposal(proposal: Omit<SpeakerDTO, 'id'> & { id?: string }): Observable<SpeakerDTO> {
    return this.http.post<SpeakerDTO>(this.apiUrl, proposal);
  }
}

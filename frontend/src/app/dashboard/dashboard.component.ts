import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../event.service';
import { CfpService } from '../cfp.service';
import { EventDTO, SpeakerDTO } from '@cfp-plataform/shared-types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h2>Dashboard</h2>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Locais de Eventos</h3>
          <div class="stat-value">{{ events().length }}</div>
        </div>
        <div class="stat-card">
          <h3>Palestras Propostas</h3>
          <div class="stat-value">{{ proposals().length }}</div>
        </div>
      </div>

      <div class="lists-section">
        <div class="list-container">
          <h3>Locais de Eventos Cadastrados</h3>
          <div class="list-items" *ngIf="events().length > 0; else noEvents">
            <div class="item-card" *ngFor="let event of events()">
              <div class="item-header">
                <span class="item-title">{{ event.name }}</span>
                <span class="item-badge">{{ event.capacity }} pessoas</span>
              </div>
              <div class="item-details">
                <p><strong>Endereço:</strong> {{ event.address }}</p>
                <p><strong>Data:</strong> {{ event.date | date:'dd/MM/yyyy' : 'UTC' }}</p>
              </div>
            </div>
          </div>
          <ng-template #noEvents>
            <p class="no-items">Nenhum local de evento cadastrado.</p>
          </ng-template>
        </div>

        <div class="list-container">
          <h3>Palestras / Proposals Cadastradas</h3>
          <div class="list-items" *ngIf="proposals().length > 0; else noProposals">
            <div class="item-card" *ngFor="let talk of proposals()">
              <div class="item-header">
                <span class="item-title">{{ talk.talkTitle }}</span>
                <span class="item-badge gd-badge" *ngIf="talk.isGDE">GDE</span>
              </div>
              <div class="item-details">
                <p><strong>Palestrante:</strong> {{ talk.name }}</p>
                <p><strong>Email:</strong> {{ talk.email }}</p>
              </div>
            </div>
          </div>
          <ng-template #noProposals>
            <p class="no-items">Nenhuma palestra cadastrada.</p>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 0 1.5rem;
      font-family: system-ui, -apple-system, sans-serif;
    }

    h2 {
      color: #2d3748;
      margin-bottom: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      background: #ffffff;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
      text-align: center;
    }

    .stat-card h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
      color: #718096;
      font-weight: 500;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: #3182ce;
    }

    .lists-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    @media (max-width: 768px) {
      .lists-section {
        grid-template-columns: 1fr;
      }
    }

    .list-container {
      background: #ffffff;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }

    .list-container h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: #2d3748;
      border-bottom: 2px solid #edf2f7;
      padding-bottom: 0.75rem;
    }

    .list-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .item-card {
      padding: 1rem;
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .item-title {
      font-weight: 600;
      color: #2d3748;
    }

    .item-badge {
      background: #ebf8ff;
      color: #2b6cb0;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .gd-badge {
      background: #fefcbf;
      color: #b7791f;
    }

    .item-details p {
      margin: 0.25rem 0;
      font-size: 0.9rem;
      color: #4a5568;
    }

    .no-items {
      color: #a0aec0;
      font-style: italic;
      text-align: center;
      margin: 2rem 0;
    }
  `]
})
export class DashboardComponent implements OnInit {
  private eventService = inject(EventService);
  private cfpService = inject(CfpService);

  events = signal<EventDTO[]>([]);
  proposals = signal<SpeakerDTO[]>([]);

  ngOnInit() {
    this.eventService.getEvents().subscribe({
      next: (data) => this.events.set(data),
      error: (err) => console.error('Error fetching events:', err)
    });

    this.cfpService.getProposals().subscribe({
      next: (data) => this.proposals.set(data),
      error: (err) => console.error('Error fetching proposals:', err)
    });
  }
}

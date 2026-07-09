import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { EventService } from '../event.service';
import { CfpService } from '../cfp.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockEventService: Partial<EventService>;
  let mockCfpService: Partial<CfpService>;

  beforeEach(async () => {
    mockEventService = {
      getEvents: jest.fn().mockReturnValue(of([
        { id: '1', name: 'Angular Meetup', address: 'Office 1', capacity: 50, date: '2025-06-15' }
      ]))
    };

    mockCfpService = {
      getProposals: jest.fn().mockReturnValue(of([
        { id: '1', name: 'Jane Speaker', email: 'jane@speaker.com', talkTitle: 'Signals deep-dive', isGDE: true }
      ]))
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: EventService, useValue: mockEventService },
        { provide: CfpService, useValue: mockCfpService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display metrics and items from services', () => {
    expect(component.events().length).toBe(1);
    expect(component.proposals().length).toBe(1);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.stat-value')?.textContent).toContain('1');
    expect(compiled.querySelector('.item-title')?.textContent).toContain('Angular Meetup');
  });
});

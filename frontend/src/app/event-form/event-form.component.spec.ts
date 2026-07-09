import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventFormComponent } from './event-form.component';
import { EventService } from '../event.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;
  let mockEventService: Partial<EventService>;

  beforeEach(async () => {
    mockEventService = {
      submitEvent: jest.fn().mockReturnValue(of({ success: true }))
    };

    await TestBed.configureTestingModule({
      imports: [EventFormComponent],
      providers: [
        { provide: EventService, useValue: mockEventService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empty states and invalid form', () => {
    expect(component.eventForm.get('name')?.value).toBe('');
    expect(component.eventForm.get('address')?.value).toBe('');
    expect(component.eventForm.get('capacity')?.value).toBe(null);
    expect(component.eventForm.get('date')?.value).toBe('');

    expect(component.isNameInvalid()).toBe(false);
    expect(component.isAddressInvalid()).toBe(false);
    expect(component.isCapacityInvalid()).toBe(false);
    expect(component.isDateInvalid()).toBe(false);

    expect(component.isFormInvalid()).toBe(true);
  });

  it('should disable submit button when form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  it('should enable submit button when form is valid', () => {
    component.eventForm.patchValue({
      name: 'Event Hall',
      address: '456 Main St',
      capacity: 250,
      date: '2025-10-15'
    });
    // For reactive forms status changes to propagate to signal, we manually trigger or statusChanges emits
    component.eventForm.updateValueAndValidity();
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(component.isFormInvalid()).toBe(false);
    expect(submitButton.disabled).toBe(false);
  });
});

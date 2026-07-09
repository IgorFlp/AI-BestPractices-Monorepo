import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CfpFormComponent } from './cfp-form.component';
import { CfpService } from '../cfp.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CfpFormComponent', () => {
  let component: CfpFormComponent;
  let fixture: ComponentFixture<CfpFormComponent>;
  let mockCfpService: Partial<CfpService>;

  beforeEach(async () => {
    mockCfpService = {
      submitProposal: jest.fn().mockReturnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [CfpFormComponent],
      providers: [
        { provide: CfpService, useValue: mockCfpService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CfpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empty states and invalid form', () => {
    expect(component.name()).toBe('');
    expect(component.email()).toBe('');
    expect(component.talkTitle()).toBe('');
    expect(component.isGDE()).toBe(false);
    
    // The computed invalid states shouldn't be active until touched
    expect(component.isNameInvalid()).toBe(false);
    expect(component.isEmailInvalid()).toBe(false);
    expect(component.isTalkTitleInvalid()).toBe(false);

    // Form should be invalid overall
    expect(component.isFormInvalid()).toBe(true);
  });

  it('should disable submit button when form is invalid', () => {
    // Form is initially invalid
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    expect(component.isFormInvalid()).toBe(true);
  });

  it('should enable submit button when form is valid', () => {
    component.name.set('Jane Doe');
    component.email.set('jane@example.com');
    component.talkTitle.set('Awesome Angular Signals');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(component.isFormValid()).toBe(true);
    expect(submitButton.disabled).toBe(false);
  });
});

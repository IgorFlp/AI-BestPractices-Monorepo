import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CfpService } from '../cfp.service';

@Component({
  selector: 'app-cfp-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cfp-form-container">
      <h2>Submit Talk Proposal</h2>

      <form (ngSubmit)="submit()" aria-labelledby="form-title">
        <h3 id="form-title" class="sr-only">CFP Submission</h3>

        <div class="form-group">
          <label for="name">Name <span class="required">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            [ngModel]="name()"
            (ngModelChange)="name.set($event)"
            required
            [attr.aria-invalid]="isNameInvalid()"
            [attr.aria-describedby]="isNameInvalid() ? 'name-error' : null"
            (blur)="nameTouched.set(true)"
          >
          <div id="name-error" class="error-msg" *ngIf="isNameInvalid()" aria-live="polite">
            Name is required.
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email <span class="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            [ngModel]="email()"
            (ngModelChange)="email.set($event)"
            required
            [attr.aria-invalid]="isEmailInvalid()"
            [attr.aria-describedby]="isEmailInvalid() ? 'email-error' : null"
            (blur)="emailTouched.set(true)"
          >
          <div id="email-error" class="error-msg" *ngIf="isEmailInvalid()" aria-live="polite">
            A valid email is required.
          </div>
        </div>

        <div class="form-group">
          <label for="talkTitle">Talk Title <span class="required">*</span></label>
          <input
            type="text"
            id="talkTitle"
            name="talkTitle"
            [ngModel]="talkTitle()"
            (ngModelChange)="talkTitle.set($event)"
            required
            [attr.aria-invalid]="isTalkTitleInvalid()"
            [attr.aria-describedby]="isTalkTitleInvalid() ? 'talkTitle-error' : null"
            (blur)="talkTitleTouched.set(true)"
          >
          <div id="talkTitle-error" class="error-msg" *ngIf="isTalkTitleInvalid()" aria-live="polite">
            Talk title is required.
          </div>
        </div>

        <div class="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isGDE"
              [ngModel]="isGDE()"
              (ngModelChange)="isGDE.set($event)"
            >
            I am a Google Developer Expert (GDE)
          </label>
        </div>

        <button
          type="submit"
          [disabled]="isFormInvalid() || isSubmitting()"
        >
          {{ isSubmitting() ? 'Submitting...' : 'Submit Proposal' }}
        </button>

        <div class="status-msg success" *ngIf="submissionSuccess()" aria-live="polite">
          Proposal submitted successfully!
        </div>
        <div class="status-msg error" *ngIf="submissionError()" aria-live="polite">
          {{ submissionError() }}
        </div>
      </form>
    </div>
  `,
  styles: [`
    .cfp-form-container {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      background: #ffffff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      font-family: system-ui, -apple-system, sans-serif;
    }

    h2 {
      margin-top: 0;
      color: #333;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #444;
    }

    .required {
      color: #e53e3e;
    }

    input[type="text"],
    input[type="email"] {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #cbd5e0;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
    }

    input[type="text"]:focus,
    input[type="email"]:focus {
      outline: none;
      border-color: #3182ce;
      box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
    }

    input[aria-invalid="true"] {
      border-color: #e53e3e;
    }

    .error-msg {
      color: #e53e3e;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: normal;
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #3182ce;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button:hover:not(:disabled) {
      background-color: #2b6cb0;
    }

    button:disabled {
      background-color: #a0aec0;
      cursor: not-allowed;
    }

    .status-msg {
      margin-top: 1rem;
      padding: 0.75rem;
      border-radius: 4px;
      text-align: center;
    }

    .success {
      background-color: #c6f6d5;
      color: #22543d;
    }

    .error {
      background-color: #fed7d7;
      color: #822727;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `]
})
export class CfpFormComponent {
  private cfpService = inject(CfpService);

  // Form State using Signals
  name = signal('');
  email = signal('');
  talkTitle = signal('');
  isGDE = signal(false);

  // Touched state
  nameTouched = signal(false);
  emailTouched = signal(false);
  talkTitleTouched = signal(false);

  // Submission State
  isSubmitting = signal(false);
  submissionSuccess = signal(false);
  submissionError = signal<string | null>(null);

  // Validation Computed Signals
  isNameValid = computed(() => this.name().trim().length > 0);
  isNameInvalid = computed(() => !this.isNameValid() && this.nameTouched());

  isEmailValid = computed(() => {
    const emailStr = this.email().trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  });
  isEmailInvalid = computed(() => !this.isEmailValid() && this.emailTouched());

  isTalkTitleValid = computed(() => this.talkTitle().trim().length > 0);
  isTalkTitleInvalid = computed(() => !this.isTalkTitleValid() && this.talkTitleTouched());

  isFormValid = computed(() => this.isNameValid() && this.isEmailValid() && this.isTalkTitleValid());
  isFormInvalid = computed(() => !this.isFormValid());

  submit() {
    if (this.isFormInvalid()) {
      return;
    }

    this.isSubmitting.set(true);
    this.submissionSuccess.set(false);
    this.submissionError.set(null);

    this.cfpService.submitProposal({
      name: this.name().trim(),
      email: this.email().trim(),
      talkTitle: this.talkTitle().trim(),
      isGDE: this.isGDE()
    }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submissionSuccess.set(true);
        this.resetForm();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.submissionError.set('Failed to submit proposal. Please try again.');
        console.error(err);
      }
    });
  }

  private resetForm() {
    this.name.set('');
    this.email.set('');
    this.talkTitle.set('');
    this.isGDE.set(false);
    this.nameTouched.set(false);
    this.emailTouched.set(false);
    this.talkTitleTouched.set(false);
  }
}

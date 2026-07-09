import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="cfp-form-container">
      <h2>Cadastro de Local de Evento</h2>

      <form [formGroup]="eventForm" (ngSubmit)="submit()" aria-labelledby="form-title">
        <h3 id="form-title" class="sr-only">Cadastro de Local de Evento</h3>

        <div class="form-group">
          <label for="name">Nome <span class="required">*</span></label>
          <input
            type="text"
            id="name"
            formControlName="name"
            [attr.aria-invalid]="isNameInvalid()"
            [attr.aria-describedby]="isNameInvalid() ? 'name-error' : null"
            (blur)="nameTouched.set(true)"
          >
          <div id="name-error" class="error-msg" *ngIf="isNameInvalid()" aria-live="polite">
            Nome é obrigatório.
          </div>
        </div>

        <div class="form-group">
          <label for="address">Endereço <span class="required">*</span></label>
          <input
            type="text"
            id="address"
            formControlName="address"
            [attr.aria-invalid]="isAddressInvalid()"
            [attr.aria-describedby]="isAddressInvalid() ? 'address-error' : null"
            (blur)="addressTouched.set(true)"
          >
          <div id="address-error" class="error-msg" *ngIf="isAddressInvalid()" aria-live="polite">
            Endereço é obrigatório.
          </div>
        </div>

        <div class="form-group">
          <label for="capacity">Capacidade <span class="required">*</span></label>
          <input
            type="number"
            id="capacity"
            formControlName="capacity"
            [attr.aria-invalid]="isCapacityInvalid()"
            [attr.aria-describedby]="isCapacityInvalid() ? 'capacity-error' : null"
            (blur)="capacityTouched.set(true)"
          >
          <div id="capacity-error" class="error-msg" *ngIf="isCapacityInvalid()" aria-live="polite">
            Capacidade válida e maior que 0 é obrigatória.
          </div>
        </div>

        <div class="form-group">
          <label for="date">Data <span class="required">*</span></label>
          <input
            type="date"
            id="date"
            formControlName="date"
            [attr.aria-invalid]="isDateInvalid()"
            [attr.aria-describedby]="isDateInvalid() ? 'date-error' : null"
            (blur)="dateTouched.set(true)"
          >
          <div id="date-error" class="error-msg" *ngIf="isDateInvalid()" aria-live="polite">
            Data é obrigatória.
          </div>
        </div>

        <button
          type="submit"
          [disabled]="isFormInvalid() || isSubmitting()"
        >
          {{ isSubmitting() ? 'Cadastrando...' : 'Cadastrar Local de Evento' }}
        </button>

        <div class="status-msg success" *ngIf="submissionSuccess()" aria-live="polite">
          Local de evento cadastrado com sucesso!
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
    input[type="number"],
    input[type="date"] {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #cbd5e0;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
    }

    input[type="text"]:focus,
    input[type="number"]:focus,
    input[type="date"]:focus {
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
export class EventFormComponent {
  private eventService = inject(EventService);

  // Reactive Form
  eventForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    capacity: new FormControl<number | null>(null, { nonNullable: false, validators: [Validators.required, Validators.min(1)] }),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  // Touched state using Signals
  nameTouched = signal(false);
  addressTouched = signal(false);
  capacityTouched = signal(false);
  dateTouched = signal(false);

  // Submission State using Signals
  isSubmitting = signal(false);
  submissionSuccess = signal(false);
  submissionError = signal<string | null>(null);

  // Validation computed signals
  isNameInvalid = computed(() => {
    const control = this.eventForm.controls.name;
    return control.invalid && this.nameTouched();
  });

  isAddressInvalid = computed(() => {
    const control = this.eventForm.controls.address;
    return control.invalid && this.addressTouched();
  });

  isCapacityInvalid = computed(() => {
    const control = this.eventForm.controls.capacity;
    return control.invalid && this.capacityTouched();
  });

  isDateInvalid = computed(() => {
    const control = this.eventForm.controls.date;
    return control.invalid && this.dateTouched();
  });

  isFormInvalid = signal(true);

  constructor() {
    this.eventForm.statusChanges.subscribe(() => {
      this.isFormInvalid.set(this.eventForm.invalid);
    });
  }

  submit() {
    if (this.eventForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.submissionSuccess.set(false);
    this.submissionError.set(null);

    const formValue = this.eventForm.getRawValue();

    this.eventService.submitEvent({
      name: formValue.name.trim(),
      address: formValue.address.trim(),
      capacity: Number(formValue.capacity),
      date: formValue.date
    }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submissionSuccess.set(true);
        this.resetForm();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.submissionError.set('Falha ao cadastrar local de evento. Tente novamente.');
        console.error(err);
      }
    });
  }

  private resetForm() {
    this.eventForm.reset();
    this.nameTouched.set(false);
    this.addressTouched.set(false);
    this.capacityTouched.set(false);
    this.dateTouched.set(false);
    this.isFormInvalid.set(true);
  }
}

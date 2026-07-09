# CFP Submission Feature

## Purpose

TBD - This spec defines the requirements for the Call for Papers (CFP) submission feature, including the frontend form implementation and backend API validation.

## Requirements

### Requirement: Speaker CFP Form UI Controls and State
The frontend SHALL present a submission form mapping to the `SpeakerDTO` contract. The application state for the form inputs and submission status MUST be managed using Angular Signals.

#### Scenario: Form initial state
- **WHEN** the speaker cfp submission form page is loaded
- **THEN** the form inputs SHALL be empty, and the submission state Signal SHALL indicate the form is invalid
- **AND** the submit button SHALL be disabled (disabled attribute present)

#### Scenario: Validation state updates
- **WHEN** the user inputs valid data (non-empty name, valid email address, non-empty talk title, boolean isGDE)
- **THEN** the validation state Signal SHALL transition to valid
- **AND** the submit button SHALL be enabled

#### Scenario: Form input validation fails
- **WHEN** the user leaves a required field empty or inputs an invalid email
- **THEN** the validation state Signal SHALL indicate the form is invalid
- **AND** the submit button SHALL be disabled

### Requirement: Form Accessibility
The frontend CFP form controls SHALL implement WAI-ARIA attributes to ensure accessibility for screen readers and keyboard navigation.

#### Scenario: Input validation accessibility states
- **WHEN** a field is invalid and has been touched
- **THEN** the input element SHALL have the `aria-invalid="true"` attribute
- **AND** the input element SHALL refer to its error message container using `aria-describedby`

### Requirement: Talk Submission API Validation
The backend NestJS API endpoint SHALL validate incoming requests to submit talk proposals using `class-validator` and the properties of `SpeakerDTO`.

#### Scenario: Payload validation fails
- **WHEN** a client POSTs a payload that misses required fields (name, email, talkTitle, isGDE) or has an invalid email format
- **THEN** the NestJS class-validator middleware SHALL reject the request with HTTP Status 400 Bad Request
- **AND** the response body SHALL contain detailed validation errors

#### Scenario: Payload validation succeeds
- **WHEN** a client POSTs a payload matching all fields of `SpeakerDTO` with valid values
- **THEN** the NestJS controller SHALL process the submission and return a success status (HTTP 201 Created)

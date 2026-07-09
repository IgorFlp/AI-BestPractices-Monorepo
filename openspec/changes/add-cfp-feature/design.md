## Context

The platform requires a Call for Papers (CFP) submission flow. We need to implement a user interface in the Angular frontend that interacts with a NestJS backend endpoint to submit talk proposals. The system must enforce strong typing via the shared `@cfp-plataform/shared-types` package.

## Goals / Non-Goals

**Goals:**
- Implement a modern, accessible talk submission form in Angular (`/frontend`) using Standalone Components and Signals.
- Create a NestJS controller endpoint (`/api/cfp`) that consumes and validates submission payloads.
- Enforce strict typing on both sides using the `SpeakerDTO` interface.
- Implement comprehensive Jest unit tests covering key behaviors: input validation rejection (backend) and disabled state/Signals initial state (frontend).

**Non-Goals:**
- Setting up a database persistence layer (submissions can be processed and logged/saved in memory).
- Designing authentication flows for speakers.
- Building an admin dashboard to review submissions.

## Decisions

### Decision 1: Frontend State Management using Angular Signals
- **Approach**: Manage the form state (values, validity, submission status) using Angular Signals (`signal`, `computed`).
- **Rationale**: Signals provide a reactive, fine-grained state mechanism native to Angular 21, reducing boilerplate compared to RxJS/Forms, and optimizing change detection.
- **Alternative considered**: Angular Reactive Forms. Denied because Signals align better with modern Angular performance and simplicity patterns.

### Decision 2: Backend Validation via Class-Validator
- **Approach**: Define a NestJS DTO class `CreateSpeakerDto` that implements the `SpeakerDTO` interface and decorate its fields with `class-validator` rules (`@IsNotEmpty()`, `@IsEmail()`, `@IsString()`, `@IsBoolean()`).
- **Rationale**: NestJS's ValidationPipe automatically validates incoming `@Body()` payloads against class-validator decorators, returning a `400 Bad Request` if rules are violated. Because interfaces are erased at runtime, a class-based DTO is required for validation decorators.
- **Alternative considered**: Manual schema validation (e.g. Zod). Denied because NestJS has first-class support for class-validator.

### Decision 3: Accessibility (WAI-ARIA)
- **Approach**: Ensure the HTML elements have explicit labels, use `aria-invalid` to indicate error states, and use `aria-describedby` pointing to error messages.
- **Rationale**: Essential for screen readers and keyboard navigation, satisfying standard accessibility guidelines.

### Decision 4: Test Strategy with Jest
- **Approach**: 
  - **Backend**: Use NestJS testing utilities (`@nestjs/testing`) and `supertest` to hit the endpoint with invalid payloads and verify the `400` response.
  - **Frontend**: Use Angular Component Testing with Jest to verify the initial Signal states and assert that the submit button has the `disabled` property when the form is invalid.

## Risks / Trade-offs

- **[Risk] TypeScript Interface Erasure**: `SpeakerDTO` is a TypeScript interface and cannot be validated at runtime directly in NestJS.
  - *Mitigation*: We will create a `CreateSpeakerDto` class in `api/src/app/dto/create-speaker.dto.ts` that implements `SpeakerDTO`, attaching validation decorators to its fields.
- **[Risk] Syncing DTO with validation rules**: If `SpeakerDTO` changes, the validation class might become out-of-sync.
  - *Mitigation*: The `CreateSpeakerDto` class explicitly implements `SpeakerDTO`, ensuring compile-time safety for any missing fields.

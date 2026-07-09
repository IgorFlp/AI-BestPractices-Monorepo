## Why

Speakers currently lack a way to submit talk proposals (Call for Papers) to the platform. Implementing this capability allows speakers to submit their details and talk titles, facilitating session planning and content organization.

## What Changes

- Add a talk proposal submission form in the Angular frontend application.
- Add an API endpoint in the NestJS backend to receive, validate, and store talk submissions.
- Utilize the shared `@cfp-plataform/shared-types` package to type-check submission payloads using `SpeakerDTO`.
- Implement automated Jest tests for the new form (frontend) and endpoint validation rules (backend).

## Capabilities

### New Capabilities
- `cfp-submission`: Allows speakers to submit talk proposals containing their name, email, talk title, and GDE status.

### Modified Capabilities
<!-- None -->

## Impact

- **Frontend (`/frontend`)**: New Angular standalone components, service for API communication, unit tests.
- **Backend (`/api`)**: New NestJS module, controller, service, validation class, unit tests.
- **Shared (`/shared-types`)**: Consumption of the existing `SpeakerDTO` contract in both client and server applications.

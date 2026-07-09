## 1. Backend API Implementation (NestJS)

- [ ] 1.1 Create `CreateSpeakerDto` class implementing `SpeakerDTO` with `class-validator` decorators.
- [ ] 1.2 Generate NestJS CFP controller (`CfpController`) and module (`CfpModule`) under `api/src/app`.
- [ ] 1.3 Bind the NestJS validation pipe globally or locally to the controller.
- [ ] 1.4 Implement validation logic in controller to respond with success when payload is valid.
- [ ] 1.5 Write Jest unit tests for the controller/endpoint to verify rejection of invalid payloads with HTTP 400.

## 2. Frontend App Implementation (Angular)

- [ ] 2.1 Create the CFP submission form standalone component in `/frontend`.
- [ ] 2.2 Manage component state (inputs, validity, loading status) using Angular Signals (`signal`, `computed`).
- [ ] 2.3 Apply WAI-ARIA properties to inputs, labels, and error messages for accessibility.
- [ ] 2.4 Create an Angular service to handle POST requests to `/api/cfp` using the `SpeakerDTO` contract.
- [ ] 2.5 Write Jest unit tests verifying initial Signal states and verifying the submit button is disabled when the form is invalid.

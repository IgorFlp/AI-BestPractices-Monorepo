## Why

O projeto já possui uma tela de Cadastro de Local de Evento (`/events/new`) funcional com validação de formulário, mas **nenhuma cobertura E2E** garante que o fluxo do usuário final funcione corretamente em ambiente de browser real. A criação de testes Cypress tradicionais estabelece uma rede de segurança para regressões e serve como demonstração didática de sintaxe E2E convencional dentro do monorepo.

## What Changes

- Criação de um projeto Cypress E2E dedicado (`frontend-cypress-e2e`) via gerador `@nx/cypress` no monorepo.
- Adição de arquivo de teste `event-registration.cy.ts` com dois cenários principais:
  - **Cenário de Sucesso**: preenchimento completo do formulário e submissão bem-sucedida.
  - **Cenário de Erro**: submissão do formulário vazio e verificação das mensagens de validação nativas.
- Configuração básica de Cypress apontando para o servidor Angular local (`http://localhost:4200`).
- Nenhuma biblioteca de IA ou plugin externo adicional — apenas sintaxe nativa Cypress (`cy.get`, `cy.contains`, `should`).

## Capabilities

### New Capabilities

- `event-registration-e2e`: Cobertura E2E da tela de Cadastro de Local de Evento (`/events/new`) com testes Cypress, abrangendo fluxo feliz e validações de erro de formulário.

### Modified Capabilities

_(Nenhuma — nenhuma spec existente tem seus requisitos alterados)_

## Impact

- **Novo projeto Nx**: `frontend-cypress-e2e/` criado com gerador `@nx/cypress:configuration` ou `@nx/cypress:cypress-project`.
- **Arquivo de teste**: `frontend-cypress-e2e/src/e2e/event-registration.cy.ts`.
- **Dependência de runtime do formulário**: os testes dependem do `EventFormComponent` estar acessível em `/events/new` e do `EventService` respondendo (possível mock via `cy.intercept`).
- **Sem alteração** em código de produção (frontend/api).

## Context

O monorepo possui um projeto Angular (`frontend`) com a tela de Cadastro de Local de Evento (`/events/new`) que usa `EventFormComponent` com `ReactiveFormsModule`. A cobertura de testes atual é limitada a testes unitários (`event-form.component.spec.ts`). O projeto `frontend-e2e` já existe mas usa **Playwright**. O Cypress (`^15.14.2`) e o plugin `@nx/cypress` (`^23.0.1`) já estão instalados no workspace.

A tarefa exige criar um novo projeto Cypress E2E separado (não alterar o `frontend-e2e` com Playwright) e escrever testes com sintaxe Cypress convencional.

## Goals / Non-Goals

**Goals:**
- Criar um projeto Cypress E2E (`frontend-cypress-e2e`) no monorepo Nx usando o gerador `@nx/cypress`.
- Escrever testes E2E em `src/e2e/event-registration.cy.ts` com dois cenários obrigatórios.
- Usar exclusivamente seletores CSS convencionais (`#id`, `.class`, `[name=...]`) e sintaxe nativa Cypress.
- Interceptar chamadas HTTP via `cy.intercept()` para desacoplar o Cenário de Sucesso da API real.

**Non-Goals:**
- Modificar o código de produção (`frontend/`, `api/`).
- Alterar o projeto `frontend-e2e` (Playwright).
- Adicionar bibliotecas de IA, Page Objects avançados, ou cobertura de outros fluxos.
- Configurar CI/CD para execução automática dos testes.

## Decisions

### D1 — Projeto Cypress separado (não integrar no `frontend-e2e`)
O `frontend-e2e` já usa Playwright com configuração própria. Misturar frameworks no mesmo projeto geraria conflitos de `tsconfig` e comandos Nx. Criar `frontend-cypress-e2e` via gerador mantém isolamento claro.

**Alternativa descartada**: Adicionar Cypress ao `frontend-e2e` existente — rejeitado por causar conflito com a configuração Playwright.

### D2 — Cenário de Sucesso com `cy.intercept()`
O `EventFormComponent` chama `EventService.submitEvent()` que faz HTTP para a API. Para que o Cenário de Sucesso não dependa do servidor backend rodando, interceptaremos `POST /api/events` com `cy.intercept()` retornando `{ status: 201 }`.

**Alternativa descartada**: Testar com backend real — rejeitado por criar dependência frágil de ambiente.

### D3 — Cenário de Erro via `blur` nos campos
O `EventFormComponent` exibe mensagens de erro somente após o campo ser marcado como `touched` (via evento `blur`). Para simular isso no teste de submissão vazia, faremos `cy.get('#name').focus().blur()` em cada campo antes de verificar as mensagens.

**Alternativa descartada**: Submeter o formulário diretamente — o botão de submit é desabilitado (`[disabled]`) quando o formulário é inválido, então a submissão direta não aciona as mensagens de erro da forma esperada.

### D4 — Seletores por `id` HTML
Os campos do formulário já possuem atributos `id` únicos (`#name`, `#address`, `#capacity`, `#date`). Usar `cy.get('#id')` é a forma mais estável e semântica de seleção.

## Risks / Trade-offs

- **[Risco] Servidor Angular não iniciado** → O Cypress requer `baseUrl` apontando para `http://localhost:4200`. Se o servidor não estiver rodando, os testes falham. **Mitigação**: O gerador Nx pode configurar `devServerTarget` para iniciar o servidor automaticamente durante o teste.
- **[Risco] Comportamento de `blur` no Cypress** → O Cypress pode não disparar eventos `blur`/`focus` de forma idêntica a um usuário real. **Mitigação**: Testar com `.focus().blur()` é amplamente documentado e funciona com Angular Reactive Forms.
- **[Trade-off] Mock de API vs. teste real** → Intercepção garante velocidade e isolamento, mas não valida a integração real frontend-backend. Este trade-off é aceitável para o objetivo didático declarado.

## Open Questions

- O `baseUrl` do Cypress deve apontar para `http://localhost:4200` ou haverá uma porta diferente no ambiente de CI? _(Assumir 4200 por padrão)_
- O gerador `@nx/cypress` deve usar `--project=frontend` para herdar a configuração de `devServerTarget`? _(Recomendado: sim)_

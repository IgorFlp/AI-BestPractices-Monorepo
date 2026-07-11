## 1. Configuração do Projeto Cypress E2E

- [x] 1.1 Executar o gerador Nx para criar o projeto `frontend-cypress-e2e` com `@nx/cypress` apontando para o projeto `frontend`
- [x] 1.2 Verificar que `cypress.config.ts` foi criado com `baseUrl: 'http://localhost:4200'`
- [x] 1.3 Verificar que `project.json` contém os targets `e2e` e `open-cypress` com `devServerTarget: 'frontend:serve'`
- [x] 1.4 Confirmar que o diretório `frontend-cypress-e2e/src/e2e/` existe (pode renomear/remover arquivos de exemplo gerados)

## 2. Implementação dos Testes E2E

- [x] 2.1 Criar o arquivo `frontend-cypress-e2e/src/e2e/event-registration.cy.ts`
- [x] 2.2 Implementar o `describe` principal: `'Cadastro de Local de Evento (/events/new)'`
- [x] 2.3 Implementar `beforeEach` com `cy.visit('/events/new')` e `cy.intercept('POST', '/api/events', { statusCode: 201, body: {} }).as('submitEvent')`
- [x] 2.4 Implementar o bloco `describe('Cenário de Sucesso')` com o teste de preenchimento e submissão do formulário usando `cy.get('#name')`, `cy.get('#address')`, `cy.get('#capacity')`, `cy.get('#date')`
- [x] 2.5 Adicionar asserção de `cy.wait('@submitEvent')` e verificar mensagem de sucesso com `cy.contains('Local de evento cadastrado com sucesso!')`
- [x] 2.6 Implementar o bloco `describe('Cenário de Erro')` com o teste de campos vazios usando `focus().blur()` em cada campo
- [x] 2.7 Adicionar asserções `cy.get('#name-error').should('be.visible')`, `cy.get('#address-error').should('be.visible')`, `cy.get('#capacity-error').should('be.visible')`, `cy.get('#date-error').should('be.visible')`
- [x] 2.8 Verificar que o botão de submit está desabilitado com `cy.get('button[type="submit"]').should('be.disabled')`

## 3. Validação e Verificação

- [x] 3.1 Executar `nx run frontend-cypress-e2e:e2e` com o servidor Angular rodando para confirmar que os testes passam
- [x] 3.2 Confirmar no output do Cypress que ambos os cenários (Sucesso e Erro) aparecem como ✅ passed
- [x] 3.3 Revisar que nenhuma biblioteca externa de IA foi adicionada — apenas sintaxe nativa Cypress

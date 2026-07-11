/**
 * Testes E2E para a tela de Cadastro de Local de Evento (/events/new)
 *
 * Usa exclusivamente sintaxe nativa Cypress (cy.get, cy.contains, should).
 * Nenhuma biblioteca externa de IA foi adicionada.
 */

describe('Cadastro de Local de Evento (/events/new)', () => {
  beforeEach(() => {
    // Intercept da chamada HTTP de submissão para desacoplar do backend real
    cy.intercept('POST', '/api/events', {
      statusCode: 201,
      body: { message: 'Evento criado com sucesso' },
    }).as('submitEvent');

    cy.visit('/events/new');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // CENÁRIO DE SUCESSO
  // ─────────────────────────────────────────────────────────────────────────

  describe('Cenário de Sucesso', () => {
    it('deve preencher o formulário e cadastrar o local de evento com sucesso', () => {
      // Preenche os campos usando seletores por id
      cy.get('#name').type('Auditório Central');
      cy.get('#address').type('Av. Paulista, 1000 - São Paulo, SP');
      cy.get('#capacity').type('500');
      cy.get('#date').type('2026-12-15');

      // O botão deve estar habilitado após preencher todos os campos
      cy.get('button[type="submit"]').should('not.be.disabled');

      // Submete o formulário
      cy.get('button[type="submit"]').click();

      // Aguarda a chamada interceptada
      cy.wait('@submitEvent');

      // Verifica a mensagem de sucesso
      cy.contains('Local de evento cadastrado com sucesso!').should(
        'be.visible'
      );
    });

    it('deve desabilitar o botão de submit quando o formulário está inválido', () => {
      // Nenhum campo preenchido — botão deve estar desabilitado
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // CENÁRIO DE ERRO — Validações de formulário vazio
  // ─────────────────────────────────────────────────────────────────────────

  describe('Cenário de Erro', () => {
    it('deve exibir mensagens de erro para todos os campos obrigatórios ao perder o foco sem preencher', () => {
      // Aciona os erros de validação: focus + blur em cada campo sem preencher
      cy.get('#name').focus().blur();
      cy.get('#address').focus().blur();
      cy.get('#capacity').focus().blur();
      cy.get('#date').focus().blur();

      // Verifica as mensagens de erro individuais
      cy.get('#name-error')
        .should('be.visible')
        .and('contain', 'Nome é obrigatório.');

      cy.get('#address-error')
        .should('be.visible')
        .and('contain', 'Endereço é obrigatório.');

      cy.get('#capacity-error')
        .should('be.visible')
        .and('contain', 'Capacidade válida e maior que 0 é obrigatória.');

      cy.get('#date-error')
        .should('be.visible')
        .and('contain', 'Data é obrigatória.');
    });

    it('deve manter o botão de submit desabilitado quando o formulário está vazio', () => {
      cy.get('button[type="submit"]').should('be.disabled');
    });

    it('deve exibir erro de Nome ao deixar apenas o campo Nome vazio', () => {
      // Preenche todos exceto o nome
      cy.get('#name').focus().blur();
      cy.get('#address').type('Rua das Flores, 123');
      cy.get('#capacity').type('100');
      cy.get('#date').type('2026-12-15');

      // Apenas o erro de nome deve aparecer
      cy.get('#name-error')
        .should('be.visible')
        .and('contain', 'Nome é obrigatório.');

      // O botão continua desabilitado (formulário inválido)
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });
});

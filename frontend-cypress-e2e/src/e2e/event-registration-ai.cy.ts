describe('Cadastro de eventos - AI driven testing', () => {
    it('Deve excutar o fluxo de cadastro e validar co sucesso de forma semantica', () => {
        cy.visit('/events/new');
        cy.prompt([
            "Type: 'Auditório Oracle' in the event name field",
            "Type: 'Av. Paulista, 1000 - São Paulo, SP' in the address field",
            "Type: '500' in the capacity field",
            "Type: '2026-12-15' in the date field",
            "Click: on the submit button",
        ]);
        cy.prompt(["Verify that a success message is visible"]);
    });
});
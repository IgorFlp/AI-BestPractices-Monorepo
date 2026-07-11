## ADDED Requirements

### Requirement: Projeto Cypress E2E configurado no monorepo
O monorepo Nx SHALL ter um projeto dedicado `frontend-cypress-e2e` configurado com `@nx/cypress`, apontando para o `frontend` como `devServerTarget`, com `baseUrl` em `http://localhost:4200`.

#### Scenario: Projeto gerado com sucesso
- **WHEN** o gerador `@nx/cypress` é executado com o nome `frontend-cypress-e2e`
- **THEN** o diretório `frontend-cypress-e2e/` é criado com `cypress.config.ts`, `project.json`, e estrutura `src/e2e/`

---

### Requirement: Cenário de Sucesso — preenchimento e submissão do formulário
O teste E2E SHALL navegar até `/events/new`, preencher todos os campos obrigatórios com valores válidos, interceptar a chamada HTTP de submissão, clicar no botão de submeter e verificar a mensagem de sucesso.

#### Scenario: Submissão bem-sucedida do formulário preenchido
- **WHEN** o usuário navega para `/events/new`
- **AND** os campos `#name`, `#address`, `#capacity` e `#date` são preenchidos com valores válidos
- **AND** a chamada `POST /api/events` é interceptada com resposta `201 Created`
- **AND** o botão com texto "Cadastrar Local de Evento" é clicado
- **THEN** a mensagem "Local de evento cadastrado com sucesso!" é exibida na tela
- **AND** o formulário é resetado para o estado inicial

#### Scenario: Botão de submit habilitado quando formulário é válido
- **WHEN** todos os campos do formulário são preenchidos com valores válidos
- **THEN** o botão `button[type="submit"]` não contém o atributo `disabled`

---

### Requirement: Cenário de Erro — validação de campos obrigatórios
O teste E2E SHALL navegar até `/events/new`, interagir com cada campo (focus/blur) sem preencher valores, e verificar que as mensagens de erro de validação nativas são exibidas para cada campo obrigatório.

#### Scenario: Mensagem de erro para campo Nome vazio
- **WHEN** o usuário navega para `/events/new`
- **AND** o campo `#name` recebe foco e perde o foco sem valor
- **THEN** o elemento `#name-error` está visível com o texto "Nome é obrigatório."

#### Scenario: Mensagem de erro para campo Endereço vazio
- **WHEN** o campo `#address` recebe foco e perde o foco sem valor
- **THEN** o elemento `#address-error` está visível com o texto "Endereço é obrigatório."

#### Scenario: Mensagem de erro para campo Capacidade vazio
- **WHEN** o campo `#capacity` recebe foco e perde o foco sem valor
- **THEN** o elemento `#capacity-error` está visível com o texto "Capacidade válida e maior que 0 é obrigatória."

#### Scenario: Mensagem de erro para campo Data vazio
- **WHEN** o campo `#date` recebe foco e perde o foco sem valor
- **THEN** o elemento `#date-error` está visível com o texto "Data é obrigatória."

#### Scenario: Botão de submit permanece desabilitado quando formulário é inválido
- **WHEN** nenhum campo é preenchido
- **THEN** o botão `button[type="submit"]` contém o atributo `disabled`

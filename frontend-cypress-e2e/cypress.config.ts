import { defineConfig } from 'cypress';
import { resolve } from 'path';

const projectRoot = resolve(__dirname);

export default defineConfig({
  projectId: 'qphcoa',
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: `${projectRoot}/src/e2e/**/*.cy.{ts,js}`,
    supportFile: `${projectRoot}/src/support/e2e.ts`,
    fixturesFolder: `${projectRoot}/src/fixtures`,
    videosFolder: resolve(__dirname, '../../dist/cypress/frontend-cypress-e2e/videos'),
    screenshotsFolder: resolve(__dirname, '../../dist/cypress/frontend-cypress-e2e/screenshots'),
  },
});

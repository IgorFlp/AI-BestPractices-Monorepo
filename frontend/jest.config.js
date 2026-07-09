const { nxPreset } = require('@nx/jest/preset');

module.exports = {
  ...nxPreset,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.mjs$': 'ts-jest',
    '^.+\\.html$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@angular|rxjs|tslib)/)',
  ],
  moduleNameMapper: {
    '^@cfp-plataform/shared-types$':
      '<rootDir>/../shared-types/src/index.ts',
    '\\.(css|scss|less|sass)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
};

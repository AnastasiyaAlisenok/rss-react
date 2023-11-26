/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  transform: {
    '^.+\\.{ts|tsx}?$': ['ts-jest', {
      babel: true,
      tsConfig: './tsconfig.jest.json',
    }],

  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json',
    },
  },
  setupFilesAfterEnv: ['./setupTest.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': "<rootDir>/__mocks__/styleMock.json",
    '\\.(gif|svg)$': "<rootDir>/__mocks__/imageMock.js"
  },
};
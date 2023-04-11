/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  coverageProvider: 'v8',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/tests/**/*.test.ts'],
  transform: {
    '^.+\\.ts?$': '<rootDir>/node_modules/ts-jest/dist',
  },
};

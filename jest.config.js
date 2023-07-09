module.exports = {
  testRegex: '.*\\.test\\.ts$',
  moduleFileExtensions: ['js', 'ts'],
  modulePaths: ['<rootDir>/pkg-src', '<rootDir>/node_modules'],
  transformIgnorePatterns: ['/node_modules/'],

  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/pkg-src/$1',
  },

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],

  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/pkg-src/**/*.{ts}'],
  coveragePathIgnorePatterns: ['^.+\\.d\\.ts$'],
  cacheDirectory: '<rootDir>/tmp/cache/jest',
  timers: 'fake',
  testEnvironment: 'jsdom',
};

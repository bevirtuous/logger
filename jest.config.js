module.exports = {
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)spec)\\.(js|jsx)?$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  unmockedModulePathPatterns: [
    'node_modules/enzyme/',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  setupTestFrameworkScriptFile: './jest.setup.js',
  testURL: 'http://locahost/',
};

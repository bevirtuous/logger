import { logger } from '../src';

describe('logger', () => {
  it('has log function', () => {
    expect(typeof logger.log).toBe('function');
    expect(logger.log).toMatchSnapshot();
  });

  it('has warn function', () => {
    expect(typeof logger.warn).toBe('function');
    expect(logger.warn).toMatchSnapshot();
  });

  it('has error function', () => {
    expect(typeof logger.error).toBe('function');
    expect(logger.error).toMatchSnapshot();
  });

  it('has info function', () => {
    expect(typeof logger.info).toBe('function');
    expect(logger.info).toMatchSnapshot();
  });

  it('has group function', () => {
    expect(typeof logger.group).toBe('function');
    expect(logger.group).toMatchSnapshot();
  });

  it('has groupCollapsed function', () => {
    expect(typeof logger.groupCollapsed).toBe('function');
    expect(logger.groupCollapsed).toMatchSnapshot();
  });

  it('has groupEnd function', () => {
    expect(typeof logger.groupEnd).toBe('function');
    expect(logger.groupEnd).toMatchSnapshot();
  });

  it('has time function', () => {
    expect(typeof logger.time).toBe('function');
    expect(logger.time).toMatchSnapshot();
  });

  it('has timeEnd function', () => {
    expect(typeof logger.timeEnd).toBe('function');
    expect(logger.timeEnd).toMatchSnapshot();
  });

  it('has trace function', () => {
    expect(typeof logger.trace).toBe('function');
    expect(logger.trace).toMatchSnapshot();
  });

  it('has clear function', () => {
    expect(typeof logger.clear).toBe('function');
    expect(logger.clear).toMatchSnapshot();
  });

  it('has count function', () => {
    expect(typeof logger.count).toBe('function');
    expect(logger.count).toMatchSnapshot();
  });

  it('has assert function', () => {
    expect(typeof logger.assert).toBe('function');
    expect(logger.assert).toMatchSnapshot();
  });
});

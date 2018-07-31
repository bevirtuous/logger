import * as group from '../src/group';
import { logger } from '../src/logger';

describe('group', () => {
  describe('repeat', () => {
    it('returns the original string if no repeantance defined', () => {
      const result = group.repeat('foo');
      expect(result).toBe('foo');
      expect(result).toMatchSnapshot();
    });

    it('returns the string 5 times', () => {
      const result = group.repeat('foo', 5);
      expect(result).toBe('foofoofoofoofoo');
      expect(result).toMatchSnapshot();
    });
  });

  describe('pad', () => {
    it('returns a string of a number with one leading 0', () => {
      const result = group.pad(5);
      expect(result).toBe('5');
      expect(result).toMatchSnapshot();
    });

    it('returns a string of a number wuth three leading 0', () => {
      const result = group.pad(5, 4);
      expect(result).toBe('0005');
      expect(result).toMatchSnapshot();
    });
  });

  describe('getFormattedTime', () => {
    const time = new Date(Date.UTC(2018, 7, 30, 22, 38, 38, 396));
    it('returns a formatted time string', () => {
      const result = group.getFormattedTime(time);
      expect(result).toBe('00:38:38.396');
      expect(result).toMatchSnapshot();
    });
  });

  describe('maxKeysLength', () => {
    it('should return the highest length of a key in an object', () => {
      const result = group.maxKeysLength({
        foo: 1,
        foobar: 1,
        bar: 1,
      });
      expect(result).toBe(6);
      expect(result).toMatchSnapshot();
    });
  });

  describe('style', () => {
    it('should return a valid styling with custom values.', () => {
      const result = group.style({
        color: '#fff',
        weight: 'bold',
      });
      expect(result).toBe('color: #fff; font-weight: bold;');
      expect(result).toMatchSnapshot();
    });

    it('should return a valid styling with default values.', () => {
      const result = group.style();
      expect(result).toBe('color: gray; font-weight: lighter;');
      expect(result).toMatchSnapshot();
    });
  });

  describe('group', () => {
    it('logs a simple log if not options are set', () => {
      logger.log = jest.fn();
      group.group('some title');
      expect(logger.log).toHaveBeenCalledTimes(1);
    });

    it('should log with some content', () => {
      logger.groupCollapsed = jest.fn();
      logger.groupEnd = jest.fn();
      logger.log = jest.fn();
      group.group('some title', { foo: 'bar' });
      expect(logger.groupCollapsed).toHaveBeenCalledTimes(1);
      expect(logger.groupEnd).toHaveBeenCalledTimes(1);
      expect(logger.log).toHaveBeenCalledTimes(1);
    });
  });
});

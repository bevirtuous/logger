import { logger } from './logger';

const KEY_COLOR = 'gray';
const FONT_WEIGHT_NORMAL = 'lighter';
const FONT_WEIGHT_BOLD = 'bold';

const defaultStyles = {
  color: KEY_COLOR,
  weight: FONT_WEIGHT_NORMAL,
};
const defaultDate = new Date();

/**
 * Repeates a string by a defined amount of times.
 * @param {string} str The string to repeat.
 * @param {number} times How many times the string should be repeated.
 * @return {string}
 */
export function repeat(str, times) {
  if (!times) {
    return str;
  }

  return (new Array(times + 1)).join(str);
}

/**
 * Creates a string from a number and fills up the gap with 0 to reach a certain length.
 * @param {number} num The number
 * @param {number} maxLength The length of the resulting string.
 * @return {string}
 */
export function pad(num, maxLength) {
  if (!maxLength || num.toString().length === maxLength) {
    return `${num}`;
  }

  return repeat('0', maxLength - num.toString().length) + num;
}

/**
 * @param {Object} [time] The base time.
 * @return {string}
 */
export function getFormattedTime(time = defaultDate) {
  const hours = pad(time.getHours(), 2);
  const minutes = pad(time.getMinutes(), 2);
  const seconds = pad(time.getSeconds(), 2);
  const milliseconds = pad(time.getMilliseconds(), 3);

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

/**
 * Returns the biggest length value of an object's keys.
 * @param {Object} prop The object to walk through.
 * @return {number}
 */
export function maxKeysLength(prop) {
  let maxLength = 0;

  Object.keys(prop).forEach((key) => {
    if (key.length > maxLength) {
      maxLength = key.length;
    }
  });

  return maxLength;
}

/**
 * @param {Object} props The styling props.
 * @param {string} [props.color='gray'] The text color.
 * @param {string} [props.weight='lighter'] The font weight.
 * @return {string}
 */
export function style({ color, weight } = defaultStyles) {
  return `color: ${color}; font-weight: ${weight};`;
}

/**
 *
 * @param {string} title The title of the log group.
 * @param {Object} [content={}] Some content to show in the group.
 * @param {string} [color='inherit'] The color for the title.
 */
export function group(title, content = {}, color = 'inherit') {
  const time = getFormattedTime();

  if (!Object.keys(content).length) {
    logger.log(` ${title} @ ${time}`);
    return;
  }

  logger.groupCollapsed(
    ` %c${title} %c@ ${time}`,
    style({
      color,
      weight: FONT_WEIGHT_NORMAL,
    }),
    style({
      color: 'inherit',
      weight: FONT_WEIGHT_BOLD,
    }),
    style()
  );

  const maxLength = maxKeysLength(content) + 2;

  Object.keys(content).forEach((key) => {
    const value = content[key];
    const action = `${key}:`.padEnd(maxLength);
    const styles = {
      color: KEY_COLOR,
      weight: FONT_WEIGHT_BOLD,
    };

    // If the content is an object, log all keys individually.
    if (typeof value === 'object' && value !== null && value.constructor === Object) {
      if (!Object.keys(value).length) {
        logger.log(` %c ${action}`, style(styles), undefined);
      } else {
        logger.log(` %c ${action}`, style(styles), value);
      }
    } else {
      logger.log(` %c ${action}`, style(styles), value);
    }
  });

  logger.groupEnd();
}

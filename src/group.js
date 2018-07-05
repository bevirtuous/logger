import logger from './logger';

const KEY_COLOR = 'inherit';
const FONT_WEIGHT_NORMAL = 'lighter';
const FONT_WEIGHT_BOLD = 'bold';

const defaultStyles = {
  color: KEY_COLOR,
  weight: FONT_WEIGHT_NORMAL,
};

/**
 * Repeates a string by a defined amount of times.
 * @param {string} str The string to repeat.
 * @param {number} times How many times the string should be repeated.
 * @return {string}
 */
function repeat(str, times) {
  return (new Array(times + 1)).join(str);
}

/**
 * Creates a string from a number and fills up the gap with 0 to reach a certain length.
 * @param {number} num The number
 * @param {number} maxLength The length of the resulting string.
 * @return {string}
 */
function pad(num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num;
}

/**
 * @return {string}
 */
function getFormattedTime() {
  const time = new Date();
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
function maxKeysLength(prop) {
  let maxLength = 0;

  Object.keys(prop).forEach((key) => {
    if ((key.length + 1) > maxLength) {
      maxLength = key.length + 1;
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
function style({ color, weight } = defaultStyles) {
  return `color: ${color}; font-weight: ${weight};`;
}

/**
 *
 * @param {string} title The title of the log group.
 * @param {Object} [content={}] Some content to show in the group.
 * @param {string} [color='inherit'] The color for the title.
 */
export default function group(title, content = {}, color = KEY_COLOR) {
  const time = getFormattedTime();

  logger.groupCollapsed(
    ` %c${title} %c@ ${time}`,
    style(color),
    style(KEY_COLOR, FONT_WEIGHT_BOLD),
    style()
  );

  if (Object.keys(content).length) {
    const maxLength = maxKeysLength(content) + 2;

    Object.keys(content).forEach((key) => {
      const value = content[key];
      const action = (`${key}:`).padEnd(maxLength);

      // If the content is an object, log all keys individually.
      if (typeof value === 'object' && value !== null && value.constructor === Object) {
        if (!Object.keys(value).length) {
          logger.log(` %c ${action}`, style(KEY_COLOR, FONT_WEIGHT_BOLD), undefined);
        } else {
          logger.log(` %c ${action}`, style(KEY_COLOR, FONT_WEIGHT_BOLD), value);
        }
      } else {
        logger.log(` %c ${action}`, style(KEY_COLOR, FONT_WEIGHT_BOLD), value);
      }
    });
  }

  logger.groupEnd();
}

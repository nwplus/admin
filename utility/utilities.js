import { SCORING } from '../constants';

// given hex color code, convert to RGBA with given alpha value
export const hexToRgba = (hex, a = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}, ${a})`
    : `rgba(0, 0, 0, ${a})`;
};

// Given an object, take its values and sum them up
export const calculateTotalScore = (hackerScore) => {
  // summing up values score
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const maxScore = Object.values(SCORING).reduce(
    (acc, curr) => acc + curr.value * curr.weight,
    0
  );
  return Math.min(maxScore, Object.values(hackerScore).reduce(reducer, 0));
};

// Given an object, flatten all key/values, taking all nested properties to top level
export const flattenObj = (obj) => {
  const result = {};
  for (const index in obj) {
    if (typeof obj[index] === 'object' && !Array.isArray(obj[index])) {
      const temp = flattenObj(obj[index]);
      for (const key of Object.keys(temp)) {
        result[key] = temp[key];
      }
    } else {
      result[index] = obj[index];
    }
  }
  return result;
};

// Given an object, order key/value pairs alphabetically
export const orderObj = (unorderedObj) => {
  const orderedObj = Object.keys(unorderedObj)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unorderedObj[key];
      return obj;
    }, {});
  return orderedObj;
};

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

import React from 'react';
import { COLOR } from '../../constants';

const ArrowIcon = ({ className, color, transform }) => (
  <svg
    className={className}
    width="14"
    height="7"
    viewBox="0 0 14 7"
    fill={color || COLOR.BLACK}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.54"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.939209 0.34773L7.32458 6.32812L13.7099 0.34773H0.939209Z"
      transform={transform}
    />
  </svg>
);

export default ArrowIcon;

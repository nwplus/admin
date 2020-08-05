import React from 'react';
import { COLOR } from '../../constants';

// className is to allow styles to be passed to the component
const NewIcon = ({ className, color }) => (
  <svg
    className={className}
    width="28"
    height="28"
    viewBox="0 0 35 35"
    fill={color || COLOR.WHITE}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="4" x="12" width="4" height="28" />
    <rect y="20" width="4" height="28" transform="rotate(-90 0 20)" />
  </svg>
);

export default NewIcon;

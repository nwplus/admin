import React from 'react';
import { COLOR } from '../../constants';

// className is to allow styles to be passed to the component
// eslint-disable-next-line no-unused-vars
const WebsiteIcon = ({ className, color }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 25 24"
    fill={color || COLOR.DARK_COPY}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 0H23C24.105 0 25 0.895 25 2V16H23V2H11V0V0Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.8 4H18.2C19.7456 4 21 4.99556 21 6.22222V21.7778C21 23.0044 19.7456 24 18.2 24H2.8C1.253 24 0 23.0044 0 21.7778V6.22222C0 4.99556 1.253 4 2.8 4ZM2.8 21.7778V6.22222H18.2V21.7778H2.8Z"
    />
    <rect x="2" y="9" width="17" height="2" />
  </svg>
);

export default WebsiteIcon;

import React from 'react';
import { COLOR } from '../../constants';

// className is to allow styles to be passed to the component
// eslint-disable-next-line no-unused-vars
const PowerIcon = ({ className, color }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 28 28"
    fill={color || COLOR.DARK_COPY}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.3565 4.73485C13.3565 4.05743 13.9108 3.50317 14.5882 3.50317C15.2656 3.50317 15.8199 4.05743 15.8199 4.73485V14.5883C15.8199 15.2657 15.2656 15.82 14.5882 15.82C13.9108 15.82 13.3565 15.2657 13.3565 14.5883V4.73485ZM20.9061 8.73779C20.4504 8.25744 20.438 7.50611 20.9184 7.02576C21.4111 6.53309 22.224 6.5454 22.692 7.05039C24.5395 9.02108 25.6727 11.6569 25.6727 14.5759C25.6727 20.8206 20.5119 25.8581 14.2304 25.661C8.2198 25.4763 3.33004 20.2786 3.50247 14.268C3.58869 11.4721 4.70952 8.94718 6.49545 7.05039C6.96349 6.5454 7.76408 6.53309 8.25675 7.02576C8.72479 7.4938 8.72479 8.24512 8.26907 8.72547C6.84032 10.2651 5.96583 12.322 5.96583 14.5883C5.96583 19.3918 9.88256 23.2716 14.6984 23.1977C19.4158 23.1484 23.3202 19.0839 23.2093 14.3666C23.1601 12.1865 22.2979 10.2158 20.9061 8.73779Z"
    />
  </svg>
);

export default PowerIcon;

import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../constants';

const Circle = styled.div`
  background-color: ${(props) =>
    props.active ? `${COLOR.MIDNIGHT_PURPLE}` : `white`};
  margin-right: 10px;
  border-radius: 50%;
  border: 3px solid ${COLOR.MIDNIGHT_PURPLE};
  width: 33px;
  height: 33px;
  color: ${(props) => (props.active ? `white` : `${COLOR.MIDNIGHT_PURPLE}`)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  :hover {
    border: 3px solid ${COLOR.BLUE_BORDER};
    cursor: pointer;
  }
`;

export default function Number({ label, number, active, handleClick }) {
  // handleClick is for setting score in firebase: applicantResponse.js
  // clickNewScore is for highlighting input in scoreInput.js

  return (
    <Circle
      active={active}
      onClick={() => {
        handleClick(number, label);
      }}
    >
      {number}
    </Circle>
  );
}

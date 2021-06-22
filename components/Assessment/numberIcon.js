import React from 'react';
import styled from 'styled-components';
import { ASSESSMENT_COLOR } from '../../constants';

const Circle = styled.div`
  background-color: ${(props) =>
    props.active ? `${ASSESSMENT_COLOR.BLUE_TEXT}` : `white`};
  margin-right: 10px;
  border-radius: 50%;
  border: 3px solid ${ASSESSMENT_COLOR.BLUE_TEXT};
  width: 33px;
  height: 33px;
  color: ${(props) =>
    props.active ? `white` : `${ASSESSMENT_COLOR.BLUE_TEXT}`};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  :hover {
    border: 3px solid ${ASSESSMENT_COLOR.BLUE_BORDER};
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

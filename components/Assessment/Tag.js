import React from 'react';
import styled from 'styled-components';

const TagText = styled.span`
  color: ${(p) => (p.color ? p.color : 'white')};
  height: 10px;
  width: 30px;
  background-color: ${(p) => p.bColor};
  padding: 3px;
  font-size: 10px;
  border-radius: 5px;
`;

export default function Tag({ color, text, textColor }) {
  return (
    <TagText color={textColor} bColor={color}>
      {text}
    </TagText>
  );
}

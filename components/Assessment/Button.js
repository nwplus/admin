import React from 'react';
import styled from 'styled-components';
import { hexToRgba } from '../../utility/utilities';
import { ASSESSMENT_COLOR } from '../../constants';

const buttonWidth = {
  small: '40px',
  default: '60px',
  large: '300px',
  flex: '',
};

const buttonHeightPadding = {
  short: '0.25em',
  default: '0.5em',
  tall: '1em',
};

const StyledButton = styled.a`
  vertical-align: middle;
  display: inline-block;
  text-decoration: none;
  border: transparent;
  transition: all 250ms;
  max-width: 100%;
  width: ${(p) => (p.width ? buttonWidth[p.width] : buttonWidth.default)};
  text-align: center;
  padding: ${(p) =>
      p.height ? buttonHeightPadding[p.height] : buttonHeightPadding.default}
    0.75em;
  border-radius: 3px;
  margin: 1em ${(p) => (p.no_margin ? '0px' : '0.75em')};
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: 0;
  }
  ${(p) =>
    p.disabled &&
    `
    cursor: not-allowed;
    opacity: 0.5;
    `}
  color: white;
  background: ${(p) => p.bColor};
  :hover {
    ${(p) =>
      p.disabled
        ? `
      cursor: not-allowed;
      `
        : `
      box-shadow: 0 0 0 .2rem ${hexToRgba(ASSESSMENT_COLOR.BLUE_TEXT, 0.5)};
      `}
  }
  :focus {
    box-shadow: 0 0 0 0.2rem ${hexToRgba(ASSESSMENT_COLOR.BLUE_TEXT, 0.5)};
  }
  height: 25px;
`;

export const Button = (props) => {
  return (
    <StyledButton
      {...props}
      tabIndex={props.disabled ? null : 0}
      href={props.disabled ? null : props.href}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;

import React from 'react';
import styled from 'styled-components';
import { COLOR, DELETE } from '../constants';

const StyledTag = styled.div`
  display:inline;
  border: none;
  font-family: 'HK Grotesk';
  font-weight: bold;
  padding: 5px 16px;
  border-radius: 5px; 
  height:40px;
  color: ${COLOR.WHITE}; 
  ${(props) =>
    props.color
      ? `background: ${props.color};`
      : `background-color: ${COLOR.PRIMARY};`}
`;

const CloseSvg = () => (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" style={{paddingTop: 4, boxSizing: 'border-box'}}>
    <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
    <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
    </svg>
);

const Tag = ({
  children,
  type,
  color,
  contentColor = COLOR.BLACK,
  onClick,
}) => (
  <StyledTag
    isText={children && !type}
    onClick={onClick}
    color={color}
    contentColor={contentColor}
  >
    {children}
    {type === DELETE && <CloseSvg />}
  </StyledTag>
);

export default Tag;
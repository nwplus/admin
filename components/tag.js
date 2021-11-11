import React from 'react';
import styled from 'styled-components';
import { COLOR, DELETE } from '../constants';

const StyledTag = styled.div`
  display:inline-flex;
  box-sizing:border-box;
  align-items:stretch;
  border: none;
  font-family: 'HK Grotesk';
  font-weight: 600;
`;

const TagText = styled.div`
  line-height:100%;
  color: ${COLOR.WHITE}; 
  ${(props) =>
    props.color
      ? `background: ${props.color};`
      : `background-color: ${COLOR.PRIMARY};`}
    
  ${(props) => 
    (props.type === DELETE)
      ? `padding: 9px 5px 7px 12px;
         border-radius: 5px 0 0 5px;`
      : `padding: 9px 12px 7px 12px;
         border-radius: 5px;`}
`;

const TagClose = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  padding:0 7px 0 5px;
  border-radius: 0 5px 5px 0;
  transition:0.12s all cubic-bezier(.55,0,.45,1);
  ${(props) =>
    props.color
      ? `background: ${props.color};`
      : `background-color: ${COLOR.PRIMARY};`}
  &:hover {
    filter:brightness(0.7);
    cursor:pointer;
  }
`;

const CloseSvg = (props) => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
    <path d="M12 4L4 12" stroke={props.currentColor} strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="round"/>
    <path d="M4 4L12 12" stroke={props.currentColor} strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="round"/>
  </svg>
);

const Tag = ({
  children,
  type,
  color,
  onDelete,
  contentColor = COLOR.BLACK,
}) => (
  <StyledTag>
    <TagText
      color={color}
      contentColor={contentColor}
      type={type}>
      {children}
    </TagText>
    {type === DELETE && (
      <TagClose color={color} onClick={onDelete} >
        <CloseSvg currentColor={contentColor} />  
      </TagClose>
    )}
  </StyledTag>
);

export default Tag;
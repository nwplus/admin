import React from 'react';
import styled from 'styled-components';
import EditIcon from './icons/edit';
import NewIcon from './icons/new';
import ViewIcon from './icons/view';
import CloseIcon from './icons/close';
import { COLOR, EDIT, NEW, VIEW, CLOSE, DELETE } from '../constants';

const StyledButton = styled.button`
    border: none;
    ${props => (props.isText ? 'padding: 6px 24px;' : 'height: 40px;')}
    ${props =>
      props.color 
      ? `color: ${props.contentColor}; background: ${props.color};`
      : `color: ${COLOR.WHITE}; background-color: ${COLOR.PRIMARY};` }
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 16px;
    border-radius: ${(props) => (props.inline ? '0 3px 3px 0' : '3px')}
  `;

const StyledEditIcon = styled(EditIcon)`
  ${props => props.hasText && 'margin-right: 8px;'}
`;

const StyledNewIcon = styled(NewIcon)`
  ${props => props.hasText && 'margin-right: 8px;'}
`;

const Button = ({ 
  children, 
  type, 
  color,
  contentColor = COLOR.BLACK,
  onClick,
  inline = false
}) => (
  <StyledButton 
    isText={children && !type}
    onClick={onClick}
    color={color}
    contentColor={contentColor}
    inline={inline}
  >
    {type === EDIT && <StyledEditIcon hasText={children} />}
    {type === NEW && <StyledNewIcon hasText={children} />}
    {type === VIEW && <ViewIcon />}
    {type === DELETE && <CloseIcon />}
    {type === CLOSE && <CloseIcon color={contentColor} />}
    {children}
  </StyledButton>
);

export default Button;

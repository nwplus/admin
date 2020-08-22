import React from 'react';
import styled from 'styled-components';
import EditIcon from './icons/edit';
import NewIcon from './icons/new';
import ViewIcon from './icons/view';
import CloseIcon from './icons/close';
import { COLOR, EDIT, VIEW, NEW, CLOSE, DELETE } from '../constants';

const StyledButton = styled.button`
  border: none;
  ${(props) => props.isText && 'padding: 6px 24px; height: 40px;'}
  ${(props) =>
    !props.isText && props.contentColor === COLOR.BLACK && 'padding: 10px;'}
  ${(props) =>
    props.color
      ? `color: ${props.contentColor}; background: ${props.color};`
      : `color: ${COLOR.WHITE}; background-color: ${COLOR.PRIMARY};`}
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  border-radius: ${(props) => (props.inline ? '0 3px 3px 0' : '3px;')}
  
`;

const StyledEditIcon = styled(EditIcon)`
  ${(props) => props.hasText && 'margin-right: 8px;'}
`;

const StyledNewIcon = styled(NewIcon)`
  ${(props) => props.hasText && 'margin-right: 8px;'}
`;

/* color specifies the background color, contentColor specifies the color of the text/icon 
    (i.e. content) within the button. contentColor is needed because:
      - modal close button should have padding: 0 to align with the modal container
      - cancel button (isText) within the modal has a colored background but has white text 
        instead of the default black text */
const Button = ({
  children,
  type,
  color,
  contentColor = COLOR.BLACK,
  onClick,
  inline = false,
}) => (
  <StyledButton
    isText={children && !type}
    onClick={onClick}
    color={color}
    contentColor={contentColor}
    inline={inline}
  >
    {type === EDIT && !color && <StyledEditIcon hasText={children} />}
    {type === EDIT && color && <EditIcon color={COLOR.BLACK} />}
    {type === NEW && <StyledNewIcon hasText={children} />}
    {type === VIEW && <ViewIcon />}
    {type === DELETE && <CloseIcon />}
    {type === CLOSE && <CloseIcon color={contentColor} />}
    {children}
  </StyledButton>
);

export default Button;

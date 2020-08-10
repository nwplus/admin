import React from 'react';
import styled from 'styled-components';
import EditIcon from './icons/edit';
import NewIcon from './icons/new';
import ViewIcon from '../components/icons/view';
import CloseIcon from './icons/close';
import { COLOR, EDIT, VIEW, NEW, CLOSE, DELETE } from '../constants';

const StyledButton = styled.button`
  border: none;
  ${(props) => (props.isText ? 'padding: 6px 24px;' : 'padding: 10px;')}
  ${(props) =>
    props.color
      ? `color: ${COLOR.BLACK}; background: ${props.color};`
      : `color: ${COLOR.WHITE}; background-color: ${COLOR.PRIMARY};`}
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  border-radius: 3px;
`;

const StyledEditIcon = styled(EditIcon)`
  ${(props) => props.hasText && 'margin-right: 8px;'}
`;

const StyledNewIcon = styled(NewIcon)`
  ${(props) => props.hasText && 'margin-right: 8px;'}
`;

const Button = ({ children, type, color, onClick }) => (
  <StyledButton isText={children && !type} onClick={onClick} color={color}>
    {type === EDIT && !color && <StyledEditIcon hasText={children} />}
    {type === EDIT && color && <EditIcon color={COLOR.BLACK} />}
    {type === NEW && <StyledNewIcon hasText={children} />}
    {type === VIEW && <ViewIcon />}
    {type === DELETE && <CloseIcon />}
    {type === CLOSE && <CloseIcon color={COLOR.DARK_GRAY} />}
    {children}
  </StyledButton>
);

export default Button;

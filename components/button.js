import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'
import { COLOR, EDIT, VIEW, NEW, CLOSE, DELETE, CHECK } from '../constants'

const StyledButton = styled.button`
  ${props =>
    props.outlined
      ? `border: 2px solid ${props.disabled ? COLOR.INACTIVE_DARK_GRAY : props.contentColor}`
      : `border: none`};
  font-family: 'HK Grotesk';
  font-weight: bold;
  ${props => props.isText && 'padding: 6px 24px; height: 40px;'}
  ${props => !props.isText && props.contentColor === COLOR.BLACK && 'padding: 10px;'}
  ${props =>
    !props.disabled
      ? props.color
        ? `color: ${props.contentColor}; background: ${props.color};`
        : `color: ${COLOR.WHITE}; background-color: ${COLOR.PRIMARY};`
      : `color: ${COLOR.INACTIVE_DARK_GRAY}; background: ${
          props.outlined ? COLOR.TRANSPARENT : COLOR.UNSELECTED_GRAY
        };`}
  border-radius: ${props =>
    props.rounded ? (props.inline ? '0 100px 100px 0' : '100px') : props.inline ? '0 8px 8px 0' : '8px'};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  &:hover {
    color: ${props => props.hoverContentColor};
    background: ${props => props.hoverBackgroundColor};
  }
`

const StyledIcon = styled(Icon)`
  ${props => props.hasText && 'margin-right: 8px;'}
`

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
  hoverBackgroundColor,
  hoverContentColor,
  disabled = false,
  outlined = false,
  rounded = false,
  className,
}) => (
  <StyledButton
    isText={children && !type}
    onClick={onClick}
    color={color}
    contentColor={contentColor}
    inline={inline}
    hoverBackgroundColor={hoverBackgroundColor}
    hoverContentColor={hoverContentColor}
    disabled={disabled}
    outlined={outlined}
    rounded={rounded}
    className={className}
  >
    {type === EDIT && !color && <StyledIcon hasText={children} icon="edit" />}
    {type === EDIT && color && <Icon color={COLOR.BLACK} icon="edit" />}
    {type === NEW && <StyledIcon hasText={children} icon="plus" />}
    {type === VIEW && <Icon icon="search" />}
    {type === DELETE && <Icon icon="times" color="red" />}
    {type === CLOSE && <Icon icon="times" color={contentColor} />}
    {type === CHECK && <Icon icon="check" color={contentColor} />}
    {children}
  </StyledButton>
)

export default Button

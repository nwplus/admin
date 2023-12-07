import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'

const CheckboxContainer = styled.div`
  margin: 8px;
`
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  cursor: ${props => (!props.disabled ? 'pointer' : 'not-allowed')};
  vertical-align: middle;
  float: left;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? (props.disabled && COLOR.DARK_GRAY) || 'salmon' : COLOR.GRAY)};
  border-radius: 3px;
  transition: all 150ms;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const StyledLabel = styled.label`
  vertical-align: middle;
  display: inline-block;
  margin: 0 8px;
`

export default function Checkbox({ id, label, checked, onClick, disabled = false }) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox id={id} type="checkbox" />
      <StyledCheckbox checked={checked} onClick={onClick} disabled={disabled}>
        {checked && (
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        )}
      </StyledCheckbox>
      <StyledLabel>{label}</StyledLabel>
    </CheckboxContainer>
  )
}

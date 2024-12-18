import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants'
import Button from '../button'

const StyledButton = styled(Button)`
  background: ${COLOR.MIDNIGHT_PURPLE_LIGHT};
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

export default function CalcZScoreButton() {
  return <StyledButton>Calculate z-score</StyledButton>
}

// these are the blue buttons for the applicantScore sidebar
import React from 'react'
import styled from 'styled-components'
import { ASSESSMENT_COLOR } from '../../constants'
import Number from './numberIcon'

const Container = styled.div`
  padding-bottom: 12px;
`

const ScoreContainer = styled.div`
  display: flex;
  padding-top: 8px;
  gap: 0.5rem;
`

const Label = styled.label`
  color: ${ASSESSMENT_COLOR.LIGHT_GRAY};
`

export default function ScoreInput({ label, score, handleClick, maxScore, hasMinusOne }) {
  const arr = hasMinusOne ? [-1, ...Array(maxScore.value + 1).keys()] : [...Array(maxScore.value + 1).keys()]

  const handleMultipier = (value, numberLabel) => {
    const adjustedValue = maxScore.weight === 0 ? value : value * maxScore.weight
    return handleClick(adjustedValue, numberLabel)
  }

  return (
    <Container>
      <Label>{label}</Label>
      <ScoreContainer>
        {arr.map(num => {
          const isActive =
            maxScore.weight === 0
              ? score === num // directly compare score when weight is 0
              : score / maxScore.weight === num // use weighted logic otherwise

          return <Number label={label} number={num} active={isActive} key={num} handleClick={handleMultipier} />
        })}
      </ScoreContainer>
    </Container>
  )
}

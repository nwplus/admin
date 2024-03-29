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
    return handleClick(value * maxScore.weight, numberLabel)
  }

  return (
    <Container>
      <Label>{label}</Label>
      <ScoreContainer>
        {arr.map(num => {
          return (
            <Number
              label={label}
              number={num}
              active={score != null && score / maxScore.weight === num}
              key={num}
              handleClick={handleMultipier}
            />
          )
        })}
      </ScoreContainer>
    </Container>
  )
}

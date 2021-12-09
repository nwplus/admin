
// these are the blue buttons for the applicantScore sidebar
import React from 'react'
import styled from 'styled-components'
import Number from './numberIcon'
import { ASSESSMENT_COLOR } from '../constants'

const Container = styled.div`
  padding-bottom: 12px;
`

const ScoreContainer = styled.div`
  display: flex;
  padding-top: 8px;
`

const Label = styled.label`
  color: ${ASSESSMENT_COLOR.LIGHT_GRAY};
`

export default function ScoreInput({ label, score, handleClick, maxScore }) {
  const arr = [...Array(maxScore.value + 1).keys()]

  const handleMultipier = (value, label) => {
    return handleClick(value * maxScore.weight, label)
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
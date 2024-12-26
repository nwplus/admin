// these are the blue buttons for the applicantScore sidebar
import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { ASSESSMENT_COLOR, COLOR } from '../../constants'
import Number from './numberIcon'

const Container = styled.div`
  padding-bottom: 12px;
`

const ScoreContainer = styled.div`
  display: flex;
  padding: 8px 0;
  gap: 0.5rem;
`

const Label = styled.label`
  color: ${ASSESSMENT_COLOR.LIGHT_GRAY};
`

const SmallText = styled.div`
  font-size: 0.8em;
  color: ${COLOR.GREY_500};
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
              ? score?.score === num // directly compare score when weight is 0
              : score?.score / maxScore.weight === num // use weighted logic otherwise

          return <Number label={label} number={num} active={isActive} key={num} handleClick={handleMultipier} />
        })}
      </ScoreContainer>
      {score?.lastUpdated && score?.lastUpdatedBy && (
        <SmallText>
          Last updated by: {score?.lastUpdatedBy} at{' '}
          {moment(score?.lastUpdated.toDate()).format('MMM Do, YYYY h:mm:ss A')}
        </SmallText>
      )}
    </Container>
  )
}

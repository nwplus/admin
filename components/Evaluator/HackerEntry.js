import React from 'react'
import styled from 'styled-components'
import { ASSESSMENT_COLOR, COLOR, MAX_SCORE } from '../../constants'

const HackerName = styled.span`
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MIDNIGHT_PURPLE_DEEP};
  font-weight: bold;
`

const HackerInfoText = styled.span`
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MIDNIGHT_PURPLE_DEEP};
`

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledHackerEntryDiv = styled.div`
  height: 56px;
  min-width: 290px;
  padding: 0 21px;
  display: flex;
  align-items: center;
  gap: 18px;
  cursor: pointer;
  ${p => p.selected && `background: ${ASSESSMENT_COLOR.LIGHT_BLUE};`}
`

const StyledTag = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  border: none;
  font-size: 13px;
  line-height: 16px;
  color: ${COLOR.LIGHT_PURPLE};
  background: ${COLOR.MIDNIGHT_PURPLE};
  padding: 0px 5px;
  border-radius: 4px;
  height: 16px;
  margin-left: auto;
`

export default function HackerEntry({
  index,
  firstName,
  lastName,
  id,
  score,
  selectHacker,
  hasCompleted = false,
  isSelected = false,
}) {
  return (
    <StyledHackerEntryDiv onClick={() => selectHacker(id)} selected={isSelected}>
      <HackerName>{index}</HackerName>
      <StyledInfoContainer>
        <HackerName>
          {firstName} {lastName}
        </HackerName>
        <HackerInfoText>
          ID #{id} &nbsp;|&nbsp; Score: {score?.totalScore ?? '?'}/{MAX_SCORE}
        </HackerInfoText>
      </StyledInfoContainer>
      {hasCompleted && <StyledTag>Completed</StyledTag>}
    </StyledHackerEntryDiv>
  )
}

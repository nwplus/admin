import React from 'react'
import styled from 'styled-components'
import { APPLICATION_STATUS, ASSESSMENT_COLOR, COLOR, MAX_SCORE } from '../../constants'

const HackerIndex = styled.span`
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MIDNIGHT_PURPLE_DEEP};
  font-weight: bold;
  width: 40px;
  text-align: center;
`

const HackerName = styled.span`
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MIDNIGHT_PURPLE_DEEP};
  font-weight: bold;
  text-align: start;
`

const HackerInfoText = styled.span`
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MIDNIGHT_PURPLE_DEEP};
`

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
`

const StyledHackerEntryDiv = styled.div`
  height: 56px;
  min-width: 290px;
  padding: 0 21px;
  display: flex;
  align-items: center;
  gap: 18px;
  cursor: pointer;
  justify-content: space-between;
  ${p => p.selected && `background: ${ASSESSMENT_COLOR.LIGHT_BLUE};`}
`

const StyledTag = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  border: none;
  font-size: 13px;
  line-height: 16px;
  color: ${COLOR.WHITE};
  ${p =>
    p.status === APPLICATION_STATUS.accepted.text || p.status === APPLICATION_STATUS.acceptedAndAttending.text
      ? `background: ${ASSESSMENT_COLOR.GREEN};`
      : p.status === APPLICATION_STATUS.rejected.text ||
        p.status === APPLICATION_STATUS.acceptedUnRSVP.text ||
        p.status === APPLICATION_STATUS.waitlisted.text
      ? `background: ${ASSESSMENT_COLOR.YELLOW};`
      : p.status === APPLICATION_STATUS.scored.text
      ? `background: ${ASSESSMENT_COLOR.BLUE};`
      : p.status === APPLICATION_STATUS.gradinginprog.text
      ? `background: ${ASSESSMENT_COLOR.DARK_GRAY};`
      : `background: ${ASSESSMENT_COLOR.RED};`}
  padding: 0px 5px;
  border-radius: 4px;
  height: 16px;
  margin-left: auto;
  min-width: 80px;
  justify-content: center;
`

const ScoreContainer = styled.div`
  display: flex;
  gap: 10px;
`

export default function HackerEntry({
  index,
  // firstName,
  // lastName,
  id,
  score,
  selectHacker,
  status = '',
  // hasCompleted = false,
  isSelected = false,
}) {
  const getStyleTag = () => {
    switch (status) {
      case APPLICATION_STATUS.accepted.text:
        return <StyledTag status={status}>{APPLICATION_STATUS.accepted.displayText}</StyledTag>
      case APPLICATION_STATUS.acceptedAndAttending.text:
        return <StyledTag status={status}>{APPLICATION_STATUS.acceptedAndAttending.displayText}</StyledTag>
      case APPLICATION_STATUS.acceptedUnRSVP.text:
        return <StyledTag status={status}>{APPLICATION_STATUS.acceptedUnRSVP.displayText}</StyledTag>
      case APPLICATION_STATUS.scored.text:
        return <StyledTag status={status}>{APPLICATION_STATUS.scored.displayText}</StyledTag>
      case APPLICATION_STATUS.waitlisted.text:
        return <StyledTag status={status}>{APPLICATION_STATUS.waitlisted.displayText}</StyledTag>
      case APPLICATION_STATUS.rejected.text:
        return <StyledTag status={status}>{APPLICATION_STATUS.rejected.displayText}</StyledTag>
      case APPLICATION_STATUS.gradinginprog.text:
        return <StyledTag status={status}>{APPLICATION_STATUS.gradinginprog.displayText}</StyledTag>
      case APPLICATION_STATUS.ungraded.text:
      default:
        return <StyledTag status={status}>{APPLICATION_STATUS.ungraded.displayText}</StyledTag>
    }
  }

  const getTotalZScore = () => {
    const { NumExperiences, ResponseOneScore, ResponseTwoScore, ResponseThreeScore } = score?.scores || {}
    if (
      NumExperiences?.normalizedScore !== undefined &&
      ResponseOneScore?.normalizedScore !== undefined &&
      ResponseTwoScore?.normalizedScore !== undefined &&
      ResponseThreeScore?.normalizedScore !== undefined
    ) {
      return (
        NumExperiences.normalizedScore +
        ResponseOneScore.normalizedScore +
        ResponseTwoScore.normalizedScore +
        ResponseThreeScore.normalizedScore
      )
    }
    return undefined
  }

  return (
    <StyledHackerEntryDiv onClick={() => selectHacker(id)} selected={isSelected}>
      <HackerIndex>{index}</HackerIndex>
      <StyledInfoContainer>
        <HackerName>
          {/* {firstName} {lastName} */}
          Applicant {index}
        </HackerName>
        <ScoreContainer>
          <HackerInfoText>
            Score: {score?.totalScore !== undefined ? `${score.totalScore}/${MAX_SCORE}` : 'n/a'}
          </HackerInfoText>
          <HackerInfoText>
            {getTotalZScore() !== undefined && <strong>z: {getTotalZScore().toFixed(2)}</strong>}
          </HackerInfoText>
        </ScoreContainer>
      </StyledInfoContainer>
      {getStyleTag()}
    </StyledHackerEntryDiv>
  )
}

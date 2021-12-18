import React from 'react';
import styled from 'styled-components';
import { ASSESSMENT_COLOR, MAX_SCORE, COLOR } from '../../constants';

const HackerName = styled.span`
  font-size: 15px;
  font-weight: 400;
  line-height: 19px;
  color: ${COLOR.MIDNIGHT_PURPLE};
  font-family: HK Grotesk;
  font-style: normal;
  font-weight: bold;
`;

const HackerInfoText = styled.span`
  font-family: HK Grotesk;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  font-weight: 400;
  line-height: 19px;
  color: ${COLOR.MIDNIGHT_PURPLE};
`;

const StyledHackerEntryDiv = styled.div`
  height: 56px;
  padding: 0 21px;
  display: flex;
  align-items: center;
  gap: 18px;
  cursor: pointer;
  ${(p) => p.selected && `background: ${ASSESSMENT_COLOR.LIGHT_BLUE};`}
`;

const StyledTag = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  align-items: stretch;
  border: none;
  font-family: 'HK Grotesk';
  font-size: 13px;
  line-height: 16px;
  font-weight: 400;
  color: ${COLOR.LIGHT_PURPLE};
  background: ${COLOR.MIDNIGHT_PURPLE_MEDIUM};
  padding: 0px 5px;
  border-radius: 4px;
  height: 16px;
  margin-left: 20px;
`;

export default function HackerEntry({
  index,
  firstName,
  lastName,
  id,
  score,
  selectHacker,
  hasCompleted = false,
  selectedHackerID = null,
}) {
  return (
    <StyledHackerEntryDiv
      onClick={() => selectHacker(id)}
      selected={id === selectedHackerID}
    >
      <div>{index}</div>
      <div>
        <HackerName>
          {firstName} {lastName}
        </HackerName>
        <HackerInfoText>
          ID #{id} | Score: {score ? score.totalScore ?? '?' : '0'} /{MAX_SCORE}
        </HackerInfoText>
      </div>
      {hasCompleted && <StyledTag>Completed</StyledTag>}
    </StyledHackerEntryDiv>
  );
}

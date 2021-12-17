import React from "react";
import styled from "styled-components";
import { COMPLETED_TAG, ASSESSMENT_COLOR, MAX_SCORE } from "../../constants";
import Tag from "../tag";

const styles = {
  nameEmailContainer: {
    flex: 3,
    textAlign: "left",
  },
  indexScoreContainer: {
    flex: 1,
    textAlign: "right",
  },
  unselectedHackerContainer: {},
  selectedHackerContainer: {},
};
// TODO: make a separate component for the completed tag here since this is the only place it will be used
const HackerName = styled.p`
  font-size: 16px;
  color: ${ASSESSMENT_COLOR.DARK_GRAY};
  margin: 0px;
  font-weight: bold;
`;

const LightGrayText = styled.p`
  font-size: 16px;
  color: ${ASSESSMENT_COLOR.LIGHT_GRAY};
  margin: 0px;
`;

const UnselectedRowDiv = styled.div`
  display: flex;
  padding: 10px 16px 6px 16px;
  cursor: pointer;
`;
const SelectedRowDiv = styled.div`
  display: flex;
  padding: 10px 16px 6px 16px;
  cursor: pointer;
  background: ${ASSESSMENT_COLOR.LIGHT_BLUE};
`;

const Scored = styled.p`
  color: ${ASSESSMENT_COLOR.LIGHT_GRAY};
  font-size: 16px;
  margin: 0px;
`;

const Unscored = styled.p`
  color: ${ASSESSMENT_COLOR.UNSCORED_GRAY};
  font-size: 16px;
  margin: 0px;
`;

export default function HackerEntry({
  index,
  firstName,
  lastName,
  email,
  id,
  score,
  selectHacker,
  hasCompleted = false,
  selectedHackerID = null,
}) {
  return id === selectedHackerID ? (
    <SelectedRowDiv onClick={() => selectHacker(id)}>
      <div style={styles.nameEmailContainer}>
        <HackerName>
          {firstName} {lastName}{" "}
          {hasCompleted && (
            <Tag
              color={COMPLETED_TAG.color}
              contentColor={COMPLETED_TAG.textColor}
            >
              {COMPLETED_TAG.text}
            </Tag>
          )}
        </HackerName>
        <LightGrayText>{email}</LightGrayText>
      </div>
      <div style={styles.indexScoreContainer}>
        <LightGrayText>{id}</LightGrayText>
        {score ? (
          <Scored>
            {score.totalScore ?? "?"}/{MAX_SCORE}
          </Scored>
        ) : (
          <Unscored>/{MAX_SCORE}</Unscored>
        )}
      </div>
    </SelectedRowDiv>
  ) : (
    <UnselectedRowDiv onClick={() => selectHacker(id)}>
      <div style={styles.nameEmailContainer}>
        <HackerName>
          {firstName} {lastName} <Tag {...COMPLETED_TAG} />
        </HackerName>
        <LightGrayText>{email}</LightGrayText>
      </div>
      <div style={styles.indexScoreContainer}>
        <LightGrayText>{index}</LightGrayText>
        {score ? (
          <Scored>
            {score.totalScore ?? "?"}/{MAX_SCORE}
          </Scored>
        ) : (
          <Unscored>/{MAX_SCORE}</Unscored>
        )}
      </div>
    </UnselectedRowDiv>
  );
}

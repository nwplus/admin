import React from 'react';
import styled from 'styled-components';
import {
  APPLICATION_STATUS,
  ASSESSMENT_COLOR,
  MAX_SCORE,
} from '../../constants';
import ApplicantResponse from './applicantResponse';
import ApplicantScore from './applicantScore';
import Tag from './Tag';

const styles = {
  nameEmailContainer: {
    flex: 3,
    textAlign: 'left',
  },
  indexScoreContainer: {
    flex: 1,
    textAlign: 'right',
  },
  unselectedHackerContainer: {},
  selectedHackerContainer: {},
};

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

export default function Table(props) {
  const { selectedHacker } = props;

  const selectHacker = (hacker) => {
    props.setSelectedHacker(hacker);
  };

  function Row(rowProp) {
    const appStatus = rowProp.hacker.status.applicationStatus;
    return selectedHacker.basicInfo === rowProp.hacker.basicInfo ? (
      <SelectedRowDiv onClick={() => selectHacker(rowProp.hacker)}>
        <div style={styles.nameEmailContainer}>
          <HackerName>
            {rowProp.hacker.basicInfo.firstName}{' '}
            {rowProp.hacker.basicInfo.lastName}{' '}
            <Tag {...APPLICATION_STATUS[appStatus]} />
          </HackerName>
          <LightGrayText>{rowProp.hacker.basicInfo.email}</LightGrayText>
        </div>
        <div style={styles.indexScoreContainer}>
          <LightGrayText>{rowProp.index}</LightGrayText>
          {rowProp.hacker.score ? (
            <Scored>
              {rowProp.hacker.score.totalScore ?? '?'}/{MAX_SCORE}
            </Scored>
          ) : (
            <Unscored>/{MAX_SCORE}</Unscored>
          )}
        </div>
      </SelectedRowDiv>
    ) : (
      <UnselectedRowDiv onClick={() => selectHacker(rowProp.hacker)}>
        <div style={styles.nameEmailContainer}>
          <HackerName>
            {rowProp.hacker.basicInfo.firstName}{' '}
            {rowProp.hacker.basicInfo.lastName}{' '}
            <Tag {...APPLICATION_STATUS[appStatus]} />
          </HackerName>
          <LightGrayText>{rowProp.hacker.basicInfo.email}</LightGrayText>
        </div>
        <div style={styles.indexScoreContainer}>
          <LightGrayText>{rowProp.index}</LightGrayText>
          {rowProp.hacker.score ? (
            <Scored>
              {rowProp.hacker.score.totalScore ?? '?'}/{MAX_SCORE}
            </Scored>
          ) : (
            <Unscored>/{MAX_SCORE}</Unscored>
          )}
        </div>
      </UnselectedRowDiv>
    );
  }

  const AllHackersRow = () => {
    const graded = props.displayedHackers.filter(
      (h) => h.status.applicationStatus === APPLICATION_STATUS.scored.text
    ).length;
    const accepted = props.displayedHackers.filter(
      (h) => h.status.applicationStatus === APPLICATION_STATUS.accepted.text
    ).length;
    return (
      <UnselectedRowDiv>
        <div style={styles.nameEmailContainer}>
          <HackerName>
            {graded}/{props.displayedHackers.length}{' '}
            {props.displayedHackers.length === 1
              ? 'Hacker graded'
              : 'Hackers graded'}
          </HackerName>
          <HackerName>
            {accepted}/{props.displayedHackers.length}{' '}
            {props.displayedHackers.length === 1
              ? 'Hacker accepted'
              : 'Hackers accepted'}
          </HackerName>
        </div>
      </UnselectedRowDiv>
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <AllHackersRow />
        {props.displayedHackers.map((hacker, index) => {
          return (
            <Row key={hacker.basicInfo.email} hacker={hacker} index={index} />
          );
        })}
      </div>
      {Object.keys(selectedHacker).length !== 0 ? (
        <>
          <ApplicantScore hacker={selectedHacker} style={{ flex: 1 }} />
          <ApplicantResponse
            setSelectedHacker={props.setSelectedHacker}
            hacker={selectedHacker}
            style={{ flex: 1 }}
          />
        </>
      ) : (
        <div />
      )}
    </div>
  );
}

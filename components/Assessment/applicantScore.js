/* eslint-disable jsx-a11y/label-has-associated-control */
// this is the second side bar for the scoringPage
import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {
  updateApplicantScore,
  updateApplicantStatus,
} from '../../utility/firebase';
import { Button } from './Button';
import ScoreInput from './scoreInput';
import AddTagButton from './AddTagButton';
import { AuthContext } from '../../utility/auth';
import {
  ASSESSMENT_COLOR,
  APPLICATION_STATUS,
  MAX_SCORE,
  SCORING,
} from '../../constants';

const Main = styled.div`
  padding: 0px 20px;
  text-align: left;
`;

const Summary = styled.div`
  text-align: left;
  margin-top: 20px;
  padding: 20px 20px;
  background: #f2f2f2;
`;

export default function ApplicantScore(props) {
  const { hacker, existingTags, SetExistingTags } = props;
  const [applicantTags, SetApplicantTags] = useState([]);
  const [hasScore, setHasScore] = useState(false);

  const appStatus = hacker.status.applicationStatus;

  const { user } = useContext(AuthContext);

  const [score, setScore] = useState({
    ResumeScore: null,
    ResponseScore: null,
  });

  useEffect(() => {
    if (hacker?.score?.scores) {
      setScore(hacker.score.scores);
      setHasScore(true);
    } else {
      setScore({
        ResumeScore: null,
        ResponseScore: null,
      });
      setHasScore(false);
    }
  }, [hacker]);

  const isGraded = (scores) => {
    return !Object.values(scores).some((x) => x === null);
  };

  const handleClick = async (value, label) => {
    switch (label) {
      case 'Resume/LinkedIn':
        await updateApplicantScore(
          props.hacker._id,
          {
            ...score,
            ResumeScore: value,
          },
          user.email
        );
        break;
      case 'Written Response Score':
        await updateApplicantScore(
          props.hacker._id,
          {
            ...score,
            ResponseScore: value,
          },
          user.email
        );
        break;
      default:
        alert('Error!');
        break;
    }
  };
  return (
    <div>
      <Main>
        <h4>Scoring</h4>
        <ScoreInput
          label="Resume/LinkedIn"
          score={score.ResumeScore}
          handleClick={handleClick}
          maxScore={SCORING.RESUME}
        />
        <ScoreInput
          maxScore={SCORING.ESSAY}
          label="Written Response Score"
          score={score.ResponseScore}
          handleClick={handleClick}
        />
      </Main>
      {hasScore && (
        <Summary>
          <label>
            {' '}
            Total Score: {hacker.score?.totalScore}/{MAX_SCORE}{' '}
          </label>
          <br />
          <label> Last updated by: {hacker.score?.lastUpdatedBy}</label>
          <br />
          <label>
            {' '}
            at:{' '}
            {moment(hacker.score?.lastUpdated.toDate()).format(
              'dddd, MMMM Do, YYYY h:mm:ss A'
            )}
          </label>
          <br />
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button
              width="flex"
              bColor={ASSESSMENT_COLOR.BLUE_TEXT}
              onClick={async () => {
                if (isGraded(score)) {
                  await updateApplicantStatus(
                    hacker._id,
                    APPLICATION_STATUS.scored.text
                  );
                }
              }}
              disabled={
                !isGraded(score) || appStatus === APPLICATION_STATUS.scored.text
              }
            >
              Mark as graded
            </Button>
          </div>
        </Summary>
      )}
      <AddTagButton/>
    </div>
  );
}

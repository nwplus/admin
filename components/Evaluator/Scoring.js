import styled from 'styled-components';
import { useState } from 'react';
import Button from '../button';
import ScoreInput from './scoreInput';
import TextField from '../TextField';
import { Title4 } from '../Typography';
import { calculateTotalScore } from '../../utility/utilities';
import { COLOR, MAX_SCORE, SCORING } from '../../constants';

const applicant = {
  score: {
    scores: {
      LinkScore: 5,
      ResumeScore: 4,
      ResponseOneScore: 4,
      ResponseTwoScore: 4,
    },
    totalScore: 17,
  },
};

const ScoreInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BottomSection = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 20px;
  text-align: right;
  margin-top: 32px;
`;

export default function Scoring() {
  const [scores, setScores] = useState(applicant.score.scores);
  const [totalScore, setTotalScore] = useState(applicant.score.totalScore);
  const [comment, setComment] = useState(applicant?.comment || '');

  const handleClick = (score, label) => {
    // Switch to whatever the field is in Firebase
    let field = '';
    switch (label) {
      case SCORING.LINK.label:
        field = 'LinkScore';
        break;
      case SCORING.RESUME.label:
        field = 'ResumeScore';
        break;
      case SCORING.ESSAY.label:
        field = 'ResponseOneScore';
        break;
      case SCORING.ESSAY_TWO.label:
        field = 'ResponseTwoScore';
        break;
      default:
        break;
    }
    const newScores = { ...scores };
    newScores[field] = score;
    setScores(newScores);
    setTotalScore(calculateTotalScore(newScores));
  };

  const handleSave = () => {
    // TODO: once we're pulling applicants from Firebase we can
    // - accept the applicant object as a prop
    // - call updateApplicantScore in this function to update the applicant
    console.log(scores);
    console.log(totalScore);
    console.log(comment);
  };

  return (
    <div>
      <Title4 color={COLOR.MIDNIGHT_PURPLE}>Scoring</Title4>
      <ScoreInputs>
        <ScoreInput
          label={SCORING.LINK.label}
          handleClick={handleClick}
          score={scores.LinkScore}
          maxScore={SCORING.LINK}
        />
        <ScoreInput
          label={SCORING.RESUME.label}
          handleClick={handleClick}
          score={scores.ResumeScore}
          maxScore={SCORING.RESUME}
        />
        <ScoreInput
          label={SCORING.ESSAY.label}
          handleClick={handleClick}
          score={scores.ResponseOneScore}
          maxScore={SCORING.ESSAY}
        />
        <ScoreInput
          label={SCORING.ESSAY_TWO.label}
          handleClick={handleClick}
          score={scores.ResponseTwoScore}
          maxScore={SCORING.ESSAY_TWO}
        />
        <TextField
          customValue={comment}
          onChangeCustomValue={(e) => setComment(e.target.value)}
          placeholder="Add your comment here"
        />
      </ScoreInputs>
      <BottomSection>
        Total Score: {totalScore} / {MAX_SCORE}
        <Button
          color={COLOR.MIDNIGHT_PURPLE_LIGHT}
          contentColor={COLOR.WHITE}
          onClick={handleSave}
        >
          Save
        </Button>
      </BottomSection>
    </div>
  );
}

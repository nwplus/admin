import styled from 'styled-components';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import Button from '../button';
import ScoreInput from './scoreInput';
import TextField from '../TextField';
import AddTagButton from './AddTagButton';
import { Title5 } from '../Typography';
import { calculateTotalScore } from '../../utility/utilities';
import { COLOR, MAX_SCORE, SCORING, TAGS } from '../../constants';
import { AuthContext } from '../../utility/auth';
import { updateApplicantScore } from '../../utility/firebase';

const Container = styled.div`
  ${(p) => !p.shouldDisplay && 'display: none'};
  padding: 0 1rem 1rem 1rem;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
`;

const ScoreInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BottomSection = styled.div`
  flex-direction: column;
  gap: 20px;
  margin-top: 28px;
`;

const StyledButton = styled(Button)`
  margin-top: 12px;
`;

const SmallText = styled.div`
  font-size: 0.8em;
  color: ${COLOR.GREY_500};
`;

export default function Scoring({ shouldDisplay, applicant }) {
  const [scores, setScores] = useState({});
  const [totalScore, setTotalScore] = useState(null);
  const [comment, setComment] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setScores(applicant?.score?.scores || {});
    setTotalScore(applicant?.score?.totalScore || null);
    setComment(applicant?.score?.comment || '');
  }, [applicant]);

  const handleClick = (score, label) => {
    // Switch to whatever the field is in Firebase
    let field = '';
    switch (label) {
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

  const handleSave = async () => {
    await updateApplicantScore(applicant._id, scores, comment, user.email);
  };

  return (
    <Container shouldDisplay={shouldDisplay}>
      <Title5 color={COLOR.MIDNIGHT_PURPLE}>Scoring</Title5>
      <ScoreInputs>
        <ScoreInput
          label={SCORING.RESUME.label}
          handleClick={handleClick}
          score={scores?.ResumeScore}
          maxScore={SCORING.RESUME}
        />
        <ScoreInput
          label={SCORING.ESSAY.label}
          handleClick={handleClick}
          score={scores?.ResponseOneScore}
          maxScore={SCORING.ESSAY}
        />
        <ScoreInput
          label={SCORING.ESSAY_TWO.label}
          handleClick={handleClick}
          score={scores?.ResponseTwoScore}
          maxScore={SCORING.ESSAY_TWO}
        />
        <TextField
          customValue={comment}
          onChangeCustomValue={(e) => setComment(e.target.value)}
          placeholder="Add your comment here"
        />
      </ScoreInputs>
      <BottomSection>
        <AddTagButton allTags={TAGS} hacker={applicant} />
        Total Score: {totalScore} / {MAX_SCORE}
        {applicant && (
          <SmallText>
            Last updated by: {applicant?.score?.lastUpdatedBy} at{' '}
            {moment(applicant?.score?.lastUpdated.toDate()).format(
              'MMM Do, YYYY h:mm:ss A'
            )}
          </SmallText>
        )}
        <StyledButton
          color={COLOR.MIDNIGHT_PURPLE_LIGHT}
          contentColor={COLOR.WHITE}
          onClick={handleSave}
        >
          Save
        </StyledButton>
      </BottomSection>
    </Container>
  );
}

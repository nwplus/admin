import styled from 'styled-components';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import Button from '../button';
import ScoreInput from './scoreInput';
import TextField from '../TextField';
import AddTagButton from './AddTagButton';
import { Title4 } from '../Typography';
import { calculateTotalScore } from '../../utility/utilities';
import { COLOR, MAX_SCORE, SCORING, TAGS } from '../../constants';
import { AuthContext } from '../../utility/auth';
import { updateApplicantScore } from '../../utility/firebase';

const Container = styled.div`
  display: ${p => !p.shouldDisplay && 'none'};
`;

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

const BottomSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SmallText = styled.div`
  font-size: 0.8em;
  color: ${COLOR.GREY_500};
`;

export default function Scoring({ shouldDisplay, applicant }) {
  const [scores, setScores] = useState(null);
  const [totalScore, setTotalScore] = useState(null);
  const [comment, setComment] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setScores(applicant?.score?.scores || null);
    setTotalScore(applicant?.score?.totalScore || null);
    setComment(applicant?.score?.comment || '');
  }, [applicant]);

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

  const handleSave = async () => {
    await updateApplicantScore(applicant._id, scores, comment, user.email);
  };

  return (
    <Container shouldDisplay={shouldDisplay} >
      <Title4 color={COLOR.MIDNIGHT_PURPLE}>Scoring</Title4>
      <ScoreInputs>
        <ScoreInput
          label={SCORING.LINK.label}
          handleClick={handleClick}
          score={scores?.LinkScore}
          maxScore={SCORING.LINK}
        />
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
      <BottomSectionContainer>
        <AddTagButton
          allTags={TAGS}
          hacker={applicant}
        />
        <BottomSection>
          <div>
            Total Score: {totalScore} / {MAX_SCORE}
            {applicant && (
              <SmallText>
                Last updated by: {applicant?.score?.lastUpdatedBy} at{' '}
                {moment(applicant?.score?.lastUpdated.toDate()).format(
                  'MMM Do, YYYY h:mm:ss A'
                )}
              </SmallText>
            )}
          </div>
          <Button
            color={COLOR.MIDNIGHT_PURPLE_LIGHT}
            contentColor={COLOR.WHITE}
            onClick={handleSave}
          >
            Save
          </Button>
        </BottomSection>
      </BottomSectionContainer>
    </Container>
  );
}

import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { APPLICATION_STATUS, COLOR, MAX_SCORE, SCORING, TAGS } from '../../constants'
import { AuthContext } from '../../utility/auth'
import { updateApplicantScore, updateApplicantStatus } from '../../utility/firebase'
import { calculateTotalScore } from '../../utility/utilities'
import TextField from '../TextField'
import { Title5 } from '../Typography'
import Button from '../button'
import AddTagButton from './AddTagButton'
import ScoreInput from './scoreInput'

const Container = styled.div`
  ${p => !p.shouldDisplay && 'display: none'};
  padding: 0 1rem 1rem 1rem;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
`

const ScoreInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const BottomSection = styled.div`
  flex-direction: column;
  gap: 20px;
  margin-top: 28px;
`

const StyledButton = styled(Button)`
  margin-top: 12px;
`

// const Label = styled.p`
//   color: ${ASSESSMENT_COLOR.LIGHT_GRAY};
// `;

export default function Scoring({ shouldDisplay, applicant }) {
  const [scores, setScores] = useState({})
  const [totalScore, setTotalScore] = useState(null)
  const [comment, setComment] = useState('')

  const { user } = useContext(AuthContext)

  useEffect(() => {
    setScores(applicant?.score?.scores || {})
    setTotalScore(applicant?.score?.totalScore || null)
    setComment(applicant?.score?.comment || '')
  }, [applicant?._id])

  const qualifyingBonus = () => {
    return false
    // manually input if hacker is first time
    // const { skills } = applicant;
    // return !skills?.hackathonsAttended
    //   ? BONUS_SCORING.FIRST_TIME_HACKER.value *
    //       BONUS_SCORING.FIRST_TIME_HACKER.weight
    //   : 0;
  }

  // TODO: For next hackathon, change to camelCase.
  const handleClick = (score, label) => {
    // Switch to whatever the field is in Firebase
    let field = ''
    switch (label) {
      case SCORING.RESUME.label:
        field = 'ResumeScore'
        break
      case SCORING.NUM_EXP.label:
        field = 'NumExperiences'
        break
      case SCORING.ESSAY1.label:
        field = 'ResponseOneScore'
        break
      case SCORING.ESSAY2.label:
        field = 'ResponseTwoScore'
        break
      case SCORING.ESSAY3.label:
        field = 'ResponseThreeScore'
        break
      default:
        break
    }
    const newScores = { ...scores }
    newScores[field] = {
      ...newScores[field],
      score,
    }
    newScores.BonusScore = qualifyingBonus()
    setScores(newScores)
    setTotalScore(calculateTotalScore(newScores))
  }

  const handleSave = async () => {
    const updatedScores = await updateApplicantScore(
      applicant._id,
      scores,
      applicant?.score?.scores,
      comment,
      user.email
    )
    await updateApplicantStatus(applicant._id, APPLICATION_STATUS.scored.text)
    setScores(updatedScores)
  }

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
          label={SCORING.NUM_EXP.label}
          handleClick={handleClick}
          score={scores?.NumExperiences}
          maxScore={SCORING.NUM_EXP}
        />
        {/* {applicant?.skills?.longAnswers3 ? ( */}
        <ScoreInput
          label={SCORING.ESSAY1.label}
          handleClick={handleClick}
          score={scores?.ResponseOneScore}
          maxScore={SCORING.ESSAY1}
          hasMinusOne
        />
        {/* ) : (
          <ScoreInput
            label={SCORING.ESSAY1NOESSAY3.label}
            handleClick={handleClick}
            score={scores?.ResponseOneScore}
            maxScore={SCORING.ESSAY1NOESSAY3}
            hasMinusOne
          />
        )} */}
        <ScoreInput
          label={SCORING.ESSAY2.label}
          handleClick={handleClick}
          score={scores?.ResponseTwoScore}
          maxScore={SCORING.ESSAY2}
          hasMinusOne
        />
        {applicant?.skills?.longAnswers3 && (
          <ScoreInput
            label={SCORING.ESSAY3.label}
            handleClick={handleClick}
            score={scores?.ResponseThreeScore}
            maxScore={SCORING.ESSAY3}
            hasMinusOne
          />
        )}
        {/* {!applicant?.skills?.hackathonsAttended && (
          <Label>First time hacker: +1</Label>
        )} */}
        <TextField
          customValue={comment}
          onChangeCustomValue={e => setComment(e.target.value)}
          placeholder="Add your comment here"
        />
      </ScoreInputs>
      <BottomSection>
        <AddTagButton allTags={TAGS} hacker={applicant} />
        Total Score: {totalScore} / {MAX_SCORE}
        <StyledButton color={COLOR.MIDNIGHT_PURPLE_LIGHT} contentColor={COLOR.WHITE} onClick={handleSave}>
          Save
        </StyledButton>
      </BottomSection>
    </Container>
  )
}

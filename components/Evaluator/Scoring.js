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
import Modal from '../Assessment/Modal'

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

const StyledModal = styled(Modal)`
  height: auto !important;
  border-radius: 10px;
`
const ModalContent = styled.div`
  padding: 20px;
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const ModalButton = styled(Button)`
  margin: 10px;
  background: ${props => (props.variant === 'no' ? COLOR.RED : COLOR.GREEN)};
  color: white;

  // const Label = styled.p
`
//   color: ${ASSESSMENT_COLOR.LIGHT_GRAY};
// `;

export default function Scoring({ shouldDisplay, applicant }) {
  const [scores, setScores] = useState({})
  const [totalScore, setTotalScore] = useState(null)
  const [comment, setComment] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [previousEditor, setPreviousEditor] = useState('')

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

    if (scores[field]?.lastUpdatedBy && user.email !== scores[field]?.lastUpdatedBy) {
      setCurrentQuestion({ field, score })
      setPreviousEditor(scores[field]?.lastUpdatedBy)
      setIsModalOpen(true)
    } else {
      updateScore(field, score)
    }
  }

  const updateScore = (field, score) => {
    const newScores = { ...scores }
    newScores[field] = {
      ...newScores[field],
      score,
    }
    newScores.BonusScore = qualifyingBonus()
    setScores(newScores)
    setTotalScore(calculateTotalScore(newScores))
  }

  const handleYesClick = () => {
    setIsModalOpen(false)
    updateScore(currentQuestion.field, currentQuestion.score)
    setCurrentQuestion(null)
  }

  const handleNoClick = () => {
    setIsModalOpen(false)
    setCurrentQuestion(null)
  }

  // if none of the required fields are in scores or if scores doesnt even exist, set APPLICATION_STATUS.ungraded.text
  // if one of the reuiqred fields are in scores and not all, set APPLICATION_STATUS.gradinginprog.text
  // if all required fields are in, set APPLICATION_STATUS.scored.text
  const getStatus = () => {
    // TODO: UPDATE REQUIRED FIELDS PER HACKATHON
    const requiredFields = ['ResumeScore', 'ResponseOneScore', 'ResponseTwoScore', 'ResponseThreeScore']

    if (!scores) {
      return APPLICATION_STATUS.ungraded.text
    }

    const filledFields = requiredFields.filter(field => scores[field] !== null && scores[field] !== undefined)

    if (filledFields.length === 0) {
      return APPLICATION_STATUS.ungraded.text
    }
    if (filledFields.length < requiredFields.length) {
      return APPLICATION_STATUS.gradinginprog.text
    }
    return APPLICATION_STATUS.scored.text
  }

  const handleSave = async () => {
    const updatedScores = await updateApplicantScore(
      applicant._id,
      scores,
      applicant?.score?.scores,
      comment,
      user.email
    )
    // checks if all fields have scores and update accordingly
    const newStatus = getStatus(updatedScores)
    await updateApplicantStatus(applicant._id, newStatus)
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
      {isModalOpen && (
        <StyledModal setShowing={setIsModalOpen}>
          <ModalContent>
            <p>
              ‼️ <strong>You are about to modify an existing score from {previousEditor}</strong>
            </p>
            <p>
              Changing this score will impact the sample size of corresponding z-scores. <strong>Are you sure?</strong>
            </p>
            <ButtonContainer>
              <ModalButton variant="no" onClick={handleNoClick}>
                No
              </ModalButton>
              <ModalButton variant="yes" onClick={handleYesClick}>
                Yes
              </ModalButton>
            </ButtonContainer>
          </ModalContent>
        </StyledModal>
      )}
    </Container>
  )
}

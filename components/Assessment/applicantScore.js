/* eslint-disable jsx-a11y/label-has-associated-control */
// this is the second side bar for the scoringPage
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { APPLICATION_STATUS, ASSESSMENT_COLOR, MAX_SCORE, SCORING } from '../../constants'
import { AuthContext } from '../../utility/auth'
import { updateApplicantScore, updateApplicantStatus } from '../../utility/firebase'
import { Button } from './Button'
import ScoreInput from './scoreInput'

const Main = styled.div`
  padding: 0px 20px;
  text-align: left;
`

const Summary = styled.div`
  text-align: left;
  margin-top: 20px;
  padding: 20px 20px;
  background: #f2f2f2;
`

export default function ApplicantScore(props) {
  const { hacker } = props
  const [hasScore, setHasScore] = useState(false)

  const appStatus = hacker.status.applicationStatus

  const { user } = useContext(AuthContext)

  const [score, setScore] = useState({
    ResumeScore: null,
    ResponseOneScore: null,
    ResponseTwoScore: null,
  })

  useEffect(() => {
    if (hacker?.score?.scores) {
      setScore(hacker.score.scores)
      setHasScore(true)
    } else {
      setScore({
        ResumeScore: null,
        ResponseOneScore: null,
        ResponseTwoScore: null,
      })
      setHasScore(false)
    }
  }, [hacker])

  const isGraded = scores => {
    return !Object.values(scores).some(x => x === null)
  }

  const handleClick = async (value, label) => {
    switch (label) {
      case 'Resume/LinkedIn':
        await updateApplicantScore(
          props.hacker._id,
          {
            ...score,
            ResumeScore: value,
          },
          '',
          user.email
        )
        break
      case 'Written Response Score 1':
        await updateApplicantScore(
          props.hacker._id,
          {
            ...score,
            ResponseOneScore: value,
          },
          '',
          user.email
        )
        break
      case 'Written Response Score 2':
        await updateApplicantScore(
          props.hacker._id,
          {
            ...score,
            ResponseTwoScore: value,
          },
          '',
          user.email
        )
        break
      default:
        alert('Error!')
        break
    }
  }
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
          maxScore={SCORING.ESSAY1}
          label="Written Response Score 1"
          score={score.ResponseOneScore}
          handleClick={handleClick}
        />
        <ScoreInput
          maxScore={SCORING.ESSAY2}
          label="Written Response Score 2"
          score={score.ResponseTwoScore}
          handleClick={handleClick}
        />
        <ScoreInput
          maxScore={SCORING.ESSAY3}
          label="Written Response Score 3"
          score={score.ResponseThreeScore}
          handleClick={handleClick}
        />
        <ScoreInput
          maxScore={SCORING.ESSAY4}
          label="Written Response Score 4"
          score={score.ResponseFourScore}
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
          <label> at: {moment(hacker.score?.lastUpdated.toDate()).format('dddd, MMMM Do, YYYY h:mm:ss A')}</label>
          <br />
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button
              width="flex"
              bColor={ASSESSMENT_COLOR.BLUE_TEXT}
              onClick={async () => {
                if (isGraded(score)) {
                  await updateApplicantStatus(hacker._id, APPLICATION_STATUS.scored.text)
                }
              }}
              disabled={!isGraded(score) || appStatus === APPLICATION_STATUS.scored.text}
            >
              Mark as graded
            </Button>
          </div>
        </Summary>
      )}
    </div>
  )
}

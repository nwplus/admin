import React, { useState } from 'react'
import styled from 'styled-components'
import { APPLICATION_STATUS, ASSESSMENT_COLOR } from '../../constants'
import { getApplicantsToAccept, updateApplicantStatus } from '../../utility/firebase'
import { Button } from './Button'
import Modal from './Modal'

const ScoreInput = styled.input`
  font-size: 16px;
  border: 1px solid ${ASSESSMENT_COLOR.BLACK};
  border-radius: 4px;
  box-sizing: border-box;
  margin: 8px 20px 8px 20px;
  text-align: left;
  padding: 0px 10px;
  :focus {
    color: ${ASSESSMENT_COLOR.BLACK};
  }
`

const ShortInput = styled.input`
  font-size: 16px;
  border: 1px solid ${ASSESSMENT_COLOR.BLACK};
  border-radius: 4px;
  box-sizing: border-box;
  text-align: left;
  padding: 0px 10px;
  max-width: 100px;
  :focus {
    color: ${ASSESSMENT_COLOR.BLACK};
  }
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const NumHackathons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 20px 8px 20px;
`

const TotalApplicantsP = styled.p`
  font-weight: bold;
`

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const acceptApplicant = async applicant => {
  return updateApplicantStatus(applicant._id, APPLICATION_STATUS.accepted.text)
}

export default function AcceptingModal({ setShowing }) {
  const [totalApplicants, setTotalApplicants] = useState(0)
  const [score, setScore] = useState(undefined)
  const [numHackathonsMin, setNumHackathonsMin] = useState(undefined)
  const [numHackathonsMax, setNumHackathonsMax] = useState(undefined)
  const [applicantsToAccept, setApplicants] = useState([])

  const getApplicants = async () => {
    const apps = await getApplicantsToAccept(score, numHackathonsMin, numHackathonsMax)
    setTotalApplicants(apps.length)
    setApplicants(apps)
  }

  const acceptApplicants = async () => {
    if (!applicantsToAccept) return
    await Promise.all(applicantsToAccept.map(app => acceptApplicant(app)))
    setShowing(false)
  }

  return (
    <Modal setShowing={setShowing}>
      <h3>Accept applicants</h3>
      <FlexDiv>
        <InputContainer>
          <ScoreInput
            onChange={e => {
              // eslint-disable-next-line no-restricted-globals
              if (!isNaN(e.target.value)) setScore(e.target.value)
            }}
            value={score ?? ''}
            placeholder="minimum score"
          />
          <NumHackathons>
            <ShortInput
              onChange={e => {
                // eslint-disable-next-line no-restricted-globals
                if (!isNaN(e.target.value)) setNumHackathonsMin(e.target.value)
              }}
              value={numHackathonsMin ?? ''}
              placeholder="min hackathons"
            />
            <ShortInput
              onChange={e => {
                // eslint-disable-next-line no-restricted-globals
                if (!isNaN(e.target.value)) setNumHackathonsMax(e.target.value)
              }}
              value={numHackathonsMax ?? ''}
              placeholder="max hackathons"
            />
          </NumHackathons>
        </InputContainer>
        <TotalApplicantsP>Total applicants: {totalApplicants}</TotalApplicantsP>
      </FlexDiv>
      <FlexDiv style={{ justifyContent: 'center' }}>
        <Button
          onClick={() => {
            getApplicants()
          }}
          disabled={!(score > 0)}
          width="flex"
          bColor={ASSESSMENT_COLOR.BLUE}
        >
          See count
        </Button>
        <Button
          onClick={() => {
            acceptApplicants()
          }}
          disabled={!(totalApplicants > 0)}
          width="flex"
          bColor="green"
        >
          Accept Applicants
        </Button>
      </FlexDiv>
    </Modal>
  )
}

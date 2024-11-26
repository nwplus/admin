import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { APPLICATION_STATUS, ASSESSMENT_COLOR } from '../../constants'
import {
  getApplicantsToAccept,
  getSpecificHackerAppQuestionOptions,
  updateApplicantStatus,
} from '../../utility/firebase'
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

const RangeContainer = styled.div`
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

const MultiselectLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`

const acceptApplicant = async applicant => {
  return updateApplicantStatus(applicant._id, APPLICATION_STATUS.accepted.text)
}

export default function AcceptingModal({ setShowing }) {
  const [totalApplicants, setTotalApplicants] = useState(0)
  const [score, setScore] = useState(undefined)
  const [numHackathonsMin, setNumHackathonsMin] = useState(undefined)
  const [numHackathonsMax, setNumHackathonsMax] = useState(undefined)
  const [yearLevelOptions, setYearLevelOptions] = useState([])
  const [yearLevelsSelected, setYearLevelsSelected] = useState([])
  const [applicantsToAccept, setApplicants] = useState([])
  const [contributionRoleOptions, setContributionRoleOptions] = useState([])
  const [contributionRolesSelected, setContributionRolesSelected] = useState([])
  const [numExperiencesMin, setNumExperiencesMin] = useState(undefined)
  const [numExperiencesMax, setNumExperiencesMax] = useState(undefined)

  const getApplicants = async () => {
    const apps = await getApplicantsToAccept(
      score,
      numHackathonsMin,
      numHackathonsMax,
      yearLevelsSelected,
      contributionRolesSelected,
      numExperiencesMin,
      numExperiencesMax
    )
    setTotalApplicants(apps.length)
    setApplicants(apps)
  }

  const acceptApplicants = async () => {
    if (!applicantsToAccept) return
    await Promise.all(applicantsToAccept.map(app => acceptApplicant(app)))
    setShowing(false)
  }

  const handleYearLevelChange = option => {
    setYearLevelsSelected(prevSelected => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter(item => item !== option)
      } else {
        return [...prevSelected, option]
      }
    })
  }

  const handleRoleChange = option => {
    setContributionRolesSelected(prevSelected => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter(item => item !== option)
      } else {
        return [...prevSelected, option]
      }
    })
  }

  useEffect(() => {
    const getYearLevelOptions = async () => {
      const yearLevelOptions = await getSpecificHackerAppQuestionOptions('BasicInfo', 'educationLevel')
      setYearLevelOptions(yearLevelOptions)
    }
    const getContributionRoleOptions = async () => {
      const roleOptions = await getSpecificHackerAppQuestionOptions('Skills', 'contributionRole')
      setContributionRoleOptions(roleOptions)
    }

    getYearLevelOptions()
    getContributionRoleOptions()
  }, [])

  return (
    <Modal setShowing={setShowing}>
      <h3>Accept applicants</h3>
      <InputContainer>
        <TotalApplicantsP>Minimum score</TotalApplicantsP>
        <ScoreInput
          onChange={e => {
            // eslint-disable-next-line no-restricted-globals
            if (!isNaN(e.target.value)) setScore(e.target.value)
          }}
          value={score ?? ''}
          placeholder="minimum score"
        />
        <TotalApplicantsP>Number of Hackathons Attended</TotalApplicantsP>
        <RangeContainer>
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
        </RangeContainer>
        <div>
          <TotalApplicantsP>Year Levels</TotalApplicantsP>
          <div>
            {yearLevelOptions.map(option => (
              <MultiselectLabel key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={yearLevelsSelected.includes(option)}
                  onChange={() => handleYearLevelChange(option)}
                />
                {option}
              </MultiselectLabel>
            ))}
          </div>
        </div>
        <div>
          <TotalApplicantsP>Contribution Roles</TotalApplicantsP>
          <div>
            {contributionRoleOptions.map(option => (
              <MultiselectLabel key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={contributionRolesSelected.includes(option)}
                  onChange={() => handleRoleChange(option)}
                />
                {option}
              </MultiselectLabel>
            ))}
          </div>
        </div>
        <TotalApplicantsP>Number of Experiences</TotalApplicantsP>
        <RangeContainer>
          <ShortInput
            onChange={e => {
              // eslint-disable-next-line no-restricted-globals
              if (!isNaN(e.target.value)) setNumExperiencesMin(e.target.value)
            }}
            value={numExperiencesMin ?? ''}
            placeholder="min experience"
          />
          <ShortInput
            onChange={e => {
              // eslint-disable-next-line no-restricted-globals
              if (!isNaN(e.target.value)) setNumExperiencesMax(e.target.value)
            }}
            value={numExperiencesMax ?? ''}
            placeholder="max experience"
          />
        </RangeContainer>
      </InputContainer>
      <TotalApplicantsP>Total applicants: {totalApplicants}</TotalApplicantsP>
      <FlexDiv style={{ justifyContent: 'center' }}>
        <Button
          onClick={() => {
            getApplicants()
          }}
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

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ASSESSMENT_COLOR, COLOR } from '../../constants'
import { getResumeFile } from '../../utility/firebase'
import ResponseInput from '../Assessment/responseInput'
import { Title5 } from '../Typography'

const Container = styled.div`
  ${p => !p.shouldDisplay && 'display: none'};
  border-radius: 5px;
  border: none;
  padding: 0 20px 20px;
  height: 100%;
  text-align: left;
  overflow-y: auto;

  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;

  ::-webkit-scrollbar {
    width: 10px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-style: solid;
    border-color: transparent;
    background-clip: padding-box;
    border-radius: 10px;
    box-shadow: inset 0 0 6px 6px ${ASSESSMENT_COLOR.UNSCORED_GRAY};
  }
`

const CONTRIBUTION_ROLE_OPTIONS = Object.freeze({
  beginner: 'Beginner',
  designer: 'Designer',
  developer: 'Developer',
  pm: 'Product/project manager',
  other: 'Other',
})

export default function ApplicantResponse({ shouldDisplay, hacker }) {
  const [resumeURL, setResumeURL] = useState(null)
  // const [waiverURL, setWaiverURL] = useState(null)
  const [contributionRole, setContributionRole] = useState('')

  const fetchContributionRole = contributionMap => {
    const getContribution = obj => Object.keys(obj).filter(key => obj[key])
    const contribution = getContribution(contributionMap).map(e => CONTRIBUTION_ROLE_OPTIONS[e])
    const contributionValues = []
    // eslint-disable-next-line no-plusplus
    for (let k = 0; k < contribution.length; k++) {
      contributionValues.push(contribution[k])

      if (k < contribution.length - 1) {
        contributionValues.push(', ')
      }
    }

    setContributionRole(contributionValues)
  }

  useEffect(() => {
    if (hacker) {
      getResumeFile(hacker._id).then(async url => {
        setResumeURL(url)
      })
      // getWaiverFile(hacker._id).then(async url => {
      //   setWaiverURL(url)
      // })
      fetchContributionRole(hacker?.skills.contributionRole)
    }
  }, [hacker])

  return (
    <Container shouldDisplay={shouldDisplay}>
      <Title5 color={COLOR.MIDNIGHT_PURPLE}>Applicant Response</Title5>
      <ResponseInput label="Firebase ID" response={`${hacker?._id}`} />

      <ResponseInput label="Role" response={contributionRole} />

      <ResponseInput
        label="Is this your first hackathon?"
        response={hacker?.skills?.numHackathonsAttended === '0' ? 'yes' : 'no'}
      />

      <ResponseInput
        label="Do you identify as part of an underrepresented gender in the technology industry?"
        response={hacker?.basicInfo?.identifyAsUnderrepresented}
      />

      {/* <ResponseInput url={waiverURL} label="Waiver" response={waiverURL} /> */}

      <ResponseInput label="If you had all the skills in the world, what product would you make? Why would this product be beneficial to you or your community?" response={`${hacker?.skills?.longAnswers1}`} />

      <ResponseInput
        label="Tell us about a time you made an idea or goal come to life. What was the situation?"
        response={`${hacker?.skills?.longAnswers2}`}
      />

      {hacker?.skills?.longAnswers3 && (
        <ResponseInput
          label="What do you hope to get out of HackCamp? What are you most excited to learn about at HackCamp?"
          response={`${hacker?.skills?.longAnswers3}`}
        />
      )}

      <ResponseInput url={resumeURL} label="Resume" response={resumeURL} />

      <ResponseInput url label="Github" response={hacker?.skills?.github} />

      <ResponseInput url label="Personal site" response={hacker?.skills?.portfolio} />

      <ResponseInput url label="LinkedIn" response={hacker?.skills?.linkedin} />
    </Container>
  )
}

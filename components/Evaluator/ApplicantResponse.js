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

      <ResponseInput label="Year Level" response={hacker?.basicInfo?.educationLevel} />
      <ResponseInput label="Num Hackathons Attended" response={hacker?.skills?.numHackathonsAttended} />

      <ResponseInput
        label="Is this your first hackathon?"
        response={hacker?.skills?.numHackathonsAttended === '0' ? 'yes' : 'no'}
        // for HackCamp
        // responseTextColor={
        //   hacker?.skills?.numHackathonsAttended === '0' ? ASSESSMENT_COLOR.BLACK : ASSESSMENT_COLOR.RED
        // }
      />

      {/* <ResponseInput
        label="Do you identify as part of an underrepresented gender in the technology industry?"
        response={hacker?.basicInfo?.identifyAsUnderrepresented}
      /> */}

      {/* <ResponseInput url={waiverURL} label="Waiver" response={waiverURL} /> */}

      <ResponseInput
        label="Q1 - Here at cmd-f, we value community, innovation and passion. Tell us about a time where you have shown one or more of these traits. (150 words)"
        response={`${hacker?.skills?.longAnswers1}`}
      />

      <ResponseInput
        label="Q2 - If you had unlimited resources at your disposal, what is one change you would make in the tech industry to make it more inclusive for underrepresented genders and why? (200 words)"
        response={`${hacker?.skills?.longAnswers2}`}
      />

      {/* {hacker?.skills?.longAnswers3 && ( */}
      <ResponseInput
        label="Q3 - The sweetest rewards stem from hard work. Tell us about a technical or non-technical project you are proud of — include your inspiration, why you chose this project and what you learnt from it. (200 words)"
        response={`${hacker?.skills?.longAnswers3}`}
      />
      {/* )} */}

      {/* {hacker?.skills?.longAnswers4 && ( */}
      <ResponseInput
        label="Q4 - If you were a baked good, what would you be and why? (50 words)"
        response={`${hacker?.skills?.longAnswers4}`}
      />
      {/* )} */}

      <ResponseInput url={resumeURL} label="Resume" response={resumeURL} />

      <ResponseInput url label="Github" response={hacker?.skills?.github} />

      <ResponseInput url label="Personal site" response={hacker?.skills?.portfolio} />

      <ResponseInput url label="LinkedIn" response={hacker?.skills?.linkedin} />
    </Container>
  )
}

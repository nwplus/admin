// this is the third sidebar for the scoring page

import moment from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ASSESSMENT_COLOR, TABS } from '../../constants'
import { getResumeFile } from '../../utility/firebase'
import ResponseInput from './responseInput'

const Main = styled.div`
  padding: 20px;
  max-width: 33%;
  border: 1px solid gray;
  text-align: left;
  overflow-y: scroll;
  height: 85vh;
`

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
  border-bottom: 1px gray solid;
  width: 100%;
`

const Tab = styled.div`
  margin-right: 20px;
  :hover {
    color: ${ASSESSMENT_COLOR.BLUE_TEXT};
    cursor: pointer;
  }
`
const ExitTab = styled.div`
  color: grey;
  margin-left: auto;
  :hover {
    color: ${ASSESSMENT_COLOR.BLUE_TEXT};
    cursor: pointer;
  }
`

export default function ApplicantResponse(props) {
  const { hacker } = props
  const [activeTab, setActiveTab] = useState(TABS.OVERVIEW)

  return (
    <Main>
      <TabContainer>
        <Tab onClick={() => setActiveTab(TABS.OVERVIEW)}> Basic Info </Tab>
        <Tab onClick={() => setActiveTab(TABS.RESUME)}> Skills </Tab>
        <Tab onClick={() => setActiveTab(TABS.COMMENTS)}> Comments(WIP) </Tab>
        <ExitTab onClick={() => props.setSelectedHacker({})}> X </ExitTab>
      </TabContainer>
      {activeTab === TABS.OVERVIEW ? (
        <OverviewTab> </OverviewTab>
      ) : activeTab === TABS.RESUME ? (
        <ResumeTab />
      ) : (
        <CommentTab comments={props.hacker.comments} />
      )}
    </Main>
  )

  function OverviewTab() {
    return (
      <div style={{ paddingTop: '10px', paddingBottom: '30px' }}>
        <ResponseInput label="Full name" response={`${hacker.basicInfo?.firstName} ${hacker.basicInfo?.lastName}`} />
        <ResponseInput label="Email" response={hacker.basicInfo?.email} />
        <ResponseInput label="Role" response={hacker.basicInfo?.contributionRole} />
        <ResponseInput label="19 or over?" response={hacker.basicInfo?.isOfLegalAge ? 'yes' : 'no'} />
        <ResponseInput label="School" response={`Studying ${hacker.basicInfo?.school}`} />
        <ResponseInput label="Major" response={hacker.basicInfo?.major} />
        <ResponseInput label="Visiting From" response={hacker.basicInfo?.location} />
        <ResponseInput
          label="Last Updated"
          response={moment(hacker.submission?.lastUpdated.toDate()).format('dddd, MMMM Do, YYYY h:mm:ss A')}
        />
      </div>
    )
  }

  function ResumeLink() {
    const [file, setFile] = useState(null)
    const [noResume, setNoResume] = useState(false)
    useEffect(() => {
      getResumeFile(hacker._id)
        .then(async url => {
          const data = await fetch(url)
          setFile(await data.blob())
          const fileURL = URL.createObjectURL(file)
          setFile(fileURL)
        })
        .catch(() => setNoResume(true))
    }, [])

    return !file && noResume === false ? (
      <>Loading</>
    ) : noResume ? (
      <div>No resume</div>
    ) : (
      <a href={file} target="_blank" rel="noopener noreferrer">
        View Resume
      </a>
    )
  }

  function ResumeTab() {
    return (
      <div style={{ paddingTop: '10px' }}>
        <ResponseInput label="Hackathons Attended" response={hacker.skills?.hackathonsAttended} />
        <ResponseInput label="Resume" response={ResumeLink()} />
        <ResponseInput url label="GitHub/GitLab/BitBucket" response={hacker.skills?.github} />
        <ResponseInput url label="LinkedIn" response={hacker.skills?.linkedin} />
        <ResponseInput url label="Portfolio" response={hacker.skills?.portfolio} />
        <ResponseInput
          openable
          label={
            <div>
              Long answer question 1
              <br />
              1. What should technology be used for?
            </div>
          }
          response={props.hacker.skills.longAnswers1}
        />
        <ResponseInput
          openable
          label={
            <div>
              Long answer 2 which is either
              <br />
              1. How would you like to challenge yourself during this hackathon?
              <br />
              2. Describe a time where you went above and beyond of your role to demonstrate leadership in a project.
            </div>
          }
          response={props.hacker.skills.longAnswers2}
        />
      </div>
    )
  }

  function CommentTab() {
    if (props.comments) {
      return (
        <div>
          {Object.entries(props.comments).map(([key]) => (
            <div> {key} </div>
          ))}
        </div>
      )
    }
    return <div> WIP </div>
  }
}

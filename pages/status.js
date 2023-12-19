import { useState } from 'react'
import styled from 'styled-components'
import Page from '../components/page'
import { getHackathons, getApplicants, updateApplicantStatus } from '../utility/firebase'
import Button from '../components/button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 16px;
`

const Success = styled.div`
  background: #00b775;
  padding: 16px;
`

const Error = styled.div`
  background: #eb5757;
  white-space: pre-wrap;
  padding: 16px;
`

const Text = styled.div`
  font-size: 24px;
`

const ApplicantsInput = styled.textarea`
  resize: vertical;
`

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 8px;
`

const hackerStatuses = [
  'applied',
  'waitlisted',
  'rejected',
  'acceptedNoResponseYet',
  'acceptedAndAttending',
  'acceptedUnRSVP',
  'acceptedNoRSVP',
  'inProgress',
]

export default function Status({ hackathons }) {
  const [emails, setEmails] = useState('')
  const [hackathonSelected, setHackathonSelected] = useState('')
  const [statusSelected, setStatusSelected] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const validateInputs = () => {
    if (!emails) {
      setError('Please enter one or more emails')
      return false
    }
    if (!hackathonSelected) {
      setError('Please select a hackathon')
      return false
    }
    if (!statusSelected) {
      setError('Please select a status')
      return false
    }
    return true
  }

  const handleUpdate = async () => {
    setSuccess('')
    setError('')
    if (!validateInputs()) return

    let emailList = emails.split(',')
    emailList = emailList.map(email => email.trim())

    const applicants = await getApplicants(hackathonSelected)
    const filteredApplicants = []
    const filteredEmails = new Set()
    const unfoundApplicants = []

    for (const applicant of applicants) {
      if (emailList.includes(applicant.basicInfo?.email)) {
        filteredApplicants.push(applicant._id)
        filteredEmails.add(applicant.basicInfo?.email)
      }
    }

    for (const email of emailList) {
      if (!filteredEmails.has(email)) {
        unfoundApplicants.push(email)
      }
    }

    for (const userId of filteredApplicants) {
      await updateApplicantStatus(userId, statusSelected, hackathonSelected)
    }

    if (filteredApplicants.length > 0) {
      setSuccess(`Updated ${filteredApplicants.length} hacker(s) to ${statusSelected} status`)
    }
    if (unfoundApplicants.length > 0) {
      setError(`Could not find ${unfoundApplicants.length} email(s) in list provided:\n${unfoundApplicants.join('\n')}`)
    }
  }

  return (
    <Page currentPath="status" hackathons={hackathons}>
      <Container>
        {success && <Success>{success}</Success>}
        {error && <Error>{error}</Error>}
        <Text>Enter emails, separated by a comma:</Text>
        <ApplicantsInput
          placeholder="e.g. alvin.kam.33@gmail.com,heyitsme@hotmail.com..."
          value={emails}
          onChange={e => setEmails(e.target.value)}
        />
        <Text>Choose a hackathon:</Text>
        <select value={hackathonSelected} onChange={e => setHackathonSelected(e.target.value)}>
          <option value="" disabled selected hidden>
            Hackathon...
          </option>
          {hackathons.map(hackathon => (
            <option value={hackathon} key={hackathon}>
              {hackathon}
            </option>
          ))}
        </select>
        <Text>Choose a status:</Text>
        <select value={statusSelected} onChange={e => setStatusSelected(e.target.value)}>
          <option value="" disabled selected hidden>
            Status...
          </option>
          {hackerStatuses.map(status => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </select>
        <ButtonContainer>
          <Button hoverBackgroundColor="#EB5757" onClick={handleUpdate}>
            Update
          </Button>
        </ButtonContainer>
      </Container>
    </Page>
  )
}

export const getStaticProps = async () => {
  const hackathons = await getHackathons()
  return {
    props: {
      hackathons,
    },
  }
}

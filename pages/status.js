import { useState } from 'react'
import styled from 'styled-components'
import Page from '../components/page'
import { getHackathons, getApplicants, updateApplicantStatus, updateWaiver } from '../utility/firebase'
import Button from '../components/button'
import Checkbox from '../components/checkbox'

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

const FormatOptions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
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
  'inProgress',
]

export default function Status({ hackathons }) {
  const [emailFormat, setEmailFormat] = useState('\n')
  const [emails, setEmails] = useState('')
  const [hackathonSelected, setHackathonSelected] = useState('')
  const [statusSelected, setStatusSelected] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [releaseLiabilityStatus, setreleaseLiabilityStatus] = useState(false)
  const [mediaConsentStatus, setMediaConsentStatus] = useState(false)
  const [safewalkSelectStatus, setsafewalkSelectStatus] = useState('safewalkNo')
  const [mentorshipSelectStatus, setMentorshipSelectStatus] = useState('nwMentorshipNo')
  const [emailConsentStatus, setEmailConsentStatus] = useState(false)

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

    let emailList = emails.split(emailFormat)
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
      if (statusSelected === 'acceptedAndAttending') {
        await updateWaiver(userId, 'releaseLiabilityCheck', releaseLiabilityStatus, hackathonSelected)
        await updateWaiver(userId, 'mediaConsentCheck', mediaConsentStatus, hackathonSelected)
        await updateWaiver(userId, 'safewalkSelect', safewalkSelectStatus, hackathonSelected)
        await updateWaiver(userId, 'nwMentorshipSelect', mentorshipSelectStatus, hackathonSelected)
        await updateWaiver(userId, 'sponsorEmailConsentCheck', emailConsentStatus, hackathonSelected)
      }
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
        <Text>Enter emails:</Text>
        <FormatOptions>
          <Checkbox label="Separated by newline" checked={emailFormat === '\n'} onClick={() => setEmailFormat('\n')} />
          <Checkbox label="Separated by comma" checked={emailFormat === ','} onClick={() => setEmailFormat(',')} />
        </FormatOptions>
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
        {statusSelected === 'acceptedAndAttending' && (
          <>
            {[
              {
                label: 'Release of Liability Waiver',
                checked: releaseLiabilityStatus,
                onClick: () => setreleaseLiabilityStatus(!releaseLiabilityStatus),
              },
              {
                label: 'Media Consent',
                checked: mediaConsentStatus,
                onClick: () => setMediaConsentStatus(!mediaConsentStatus),
              },
              {
                label: 'Safewalk',
                checked: safewalkSelectStatus === 'safewalkYes',
                onClick: () => setsafewalkSelectStatus(prev => (prev === 'safewalkYes' ? 'safewalkNo' : 'safewalkYes')),
              },
              {
                label: 'nwMentorship',
                checked: mentorshipSelectStatus === 'nwMentorshipYes',
                onClick: () =>
                  setMentorshipSelectStatus(prev =>
                    prev === 'nwMentorshipYes' ? 'nwMentorshipNo' : 'nwMentorshipYes'
                  ),
              },
              {
                label:
                  'I authorize the use of my email to receive hiring opportunities, promotions, and information from participating nwHacks sponsors',
                checked: emailConsentStatus,
                onClick: () => setEmailConsentStatus(!emailConsentStatus),
              },
            ].map(({ label, checked, onClick }) => (
              <div key={label}>
                <Checkbox label={label} checked={checked} onClick={onClick} />
              </div>
            ))}
          </>
        )}
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

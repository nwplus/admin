import moment from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import FeatureFlag from '../../../components/FeatureFlag'
import Card, {
  CancelButton,
  CardButtonContainer,
  CardContent,
  CardContentButtonContainer,
  CardHeader,
  CardTitle,
} from '../../../components/card'
import Input from '../../../components/input'
import Page from '../../../components/page'
// import { UploadContainer } from '../../components/modal';
import Button from '../../../components/button'
import { EDIT, PORTAL_NAVBAR } from '../../../constants'
import { useAuth } from '../../../utility/auth'
import {
  formatDate,
  getHackathons,
  getTimestamp,
  subscribeToPortalSettings,
  updatePortalSettings,
  uploadLivesiteLogoToStorage,
} from '../../../utility/firebase'

const Label = styled.p`
  font-weight: bold;
  margin: 10px 0;
`

const Group = styled.div`
  margin: 32px 0;
  &:nth-child(1) {
    margin-top: 0;
  }
`

export default ({ hackathons }) => {
  const [settings, setSettings] = useState({})
  const router = useRouter()
  const { id } = router.query
  const activeHackathon = id?.slice(0, -4).toLowerCase()
  const [data, setData] = useState({})

  useEffect(() => {
    if (!activeHackathon) {
      return undefined
    }
    return subscribeToPortalSettings(firebaseData => {
      setData(firebaseData)

      const hackathonData = Object.keys(firebaseData).reduce((acc, key) => {
        if (key === 'lastEdited' || key === 'lastEditedBy') {
          acc[key] = firebaseData[key]
        } else {
          acc[key] = firebaseData[key]?.[activeHackathon]
        }
        return acc
      }, {})
      setSettings(hackathonData)
    })
  }, [activeHackathon])

  const [isEditing, setisEditing] = useState(false)
  const [imgFile] = useState()
  // const inputFile = React.createRef();
  // const [imgFile, setImgFile] = useState();
  // const [fileUpload] = useState({});
  const { email: user } = useAuth().user

  // MODAL SUBMIT BUTTON CLICKED (NEW + EDIT)
  const handleSave = async () => {
    // Create an object that preserves the nested hackathon structure
    const updatedData = Object.keys(settings).reduce((acc, key) => {
      // Skip lastEdited and lastEditedBy as they're top-level fields
      if (key !== 'lastEdited' && key !== 'lastEditedBy') {
        acc[key] = {
          ...data[key], // Keep existing data for all hackathons
          [activeHackathon]: settings[key], // Update only current hackathon's data
        }
      }
      return acc
    }, {})

    if (imgFile) {
      const url = await uploadLivesiteLogoToStorage(imgFile)
      await updatePortalSettings({
        ...updatedData,
        imgUrl: {
          ...data.imgUrl,
          [activeHackathon]: url,
        },
        lastEdited: getTimestamp(),
        lastEditedBy: user,
      })
    } else {
      await updatePortalSettings({
        ...updatedData,
        lastEdited: getTimestamp(),
        lastEditedBy: user,
      })
    }
    setisEditing(false)
  }

  // const selectImageFile = (e) => {
  //   if (e.target.files[0]) {
  //     setImgFile(e.target.files[0]);
  //     fileUpload.imgName = e.target.files[0].name;
  //   }
  // };

  const DatePicker = ({ field }) => {
    const [editingDate, setEditingDate] = useState()

    const handleDateChange = event => {
      // State: Contains UTC ISO string of the date
      const momentDate = moment(event.target.value)
      setEditingDate(momentDate.toISOString())
    }

    const handleBlur = () => {
      if (editingDate) {
        setSettings({ ...settings, [field]: editingDate })
      }
      setEditingDate('')
    }

    // View: Converts ISO UTC string to local date in format 2017-06-01T08:30
    const domStringDate = moment.utc(settings[field]).local().format('YYYY-MM-DDTHH:mm')
    return (
      <input
        type="datetime-local"
        value={domStringDate}
        onBlur={() => handleBlur()}
        onChange={e => handleDateChange(e)}
      />
    )
  }

  // Livesite doesnt support logo from CMS yet
  // const LogoUpload = () => (
  //   <>
  //     <input
  //       type="file"
  //       id="file"
  //       ref={inputFile}
  //       accept="image/*"
  //       onChange={selectImageFile}
  //       style={{ display: 'none' }}
  //     />
  //     <UploadContainer
  //       type="text"
  //       value={fileUpload.imgName}
  //       onClick={() => inputFile.current.click()}
  //     />
  //   </>
  // );

  const LocalDate = ({ date }) => {
    if (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    }
    return null
  }

  const toggleInput = field => {
    setSettings({
      ...settings,
      [field]: !settings[field],
    })
  }

  const handleChange = (field, e) => {
    if (field === 'preHackathonWorkshops') {
      setSettings({
        ...settings,
        notionLinks: {
          preHackathonWorkshops: e.target.value,
        },
      })
    } else if (['covid', 'media', 'nwMentorship', 'releaseLiability'].includes(field)) {
      setSettings({
        ...settings,
        waiversAndForms: {
          ...(settings.waiversAndForms || {}),
          [field]: e.target.value,
        },
      })
    } else {
      setSettings({
        ...settings,
        [field]: e.target.value,
      })
    }
  }

  return (
    <Page currentPath={`portal/${id}`} hackathons={hackathons} navbarItems={PORTAL_NAVBAR}>
      <Card>
        <CardHeader>
          <CardTitle>Portal Settings</CardTitle>
          <p>{`Last edited by ${settings.lastEditedBy} at ${formatDate(settings.lastEdited?.seconds)}`}</p>
          <CardButtonContainer>
            <Button type={EDIT} onClick={() => setisEditing(!isEditing)} />
          </CardButtonContainer>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <>
              <FeatureFlag
                title="Project Submissions Open"
                value={settings.submissionsOpen}
                onChange={() => toggleInput('submissionsOpen')}
              />
              <FeatureFlag title="Portal Live" value={settings.portalLive} onChange={() => toggleInput('portalLive')} />
              <FeatureFlag
                title="Judging Open"
                value={settings.judgingOpen}
                onChange={() => toggleInput('judgingOpen')}
              />
              <FeatureFlag
                title="Judging Released"
                value={settings.judgingReleased}
                onChange={() => toggleInput('judgingReleased')}
              />
              <FeatureFlag
                title="Applications Open"
                value={settings.applicationsOpen}
                onChange={() => toggleInput('applicationsOpen')}
              />

              <Label>Application Deadline (Hacker app copy)</Label>
              <Input value={settings.applicationDeadline} onChange={e => handleChange('applicationDeadline', e)} />
              <Label>RSVP Deadline (Hacker app copy)</Label>
              <Input value={settings.rsvpBy} onChange={e => handleChange('rsvpBy', e)} />
              <Label>Waitlist notify time (Hacker app copy)</Label>
              <Input value={settings.offWaitlistNotify} onChange={e => handleChange('offWaitlistNotify', e)} />
              <Label>Acceptances sent by (Hacker app copy)</Label>
              <Input value={settings.sendAcceptancesBy} onChange={e => handleChange('sendAcceptancesBy', e)} />

              <Group>
                <Label>{settings.activeHackathon} Start Time</Label>
                <DatePicker field="hackathonStart" />
              </Group>
              <Group>
                <Label>{settings.activeHackathon} End Time</Label>
                <DatePicker field="hackathonEnd" />
              </Group>
              <Group>
                <Label>Hacking Period Start Time</Label>
                <DatePicker field="hackingStart" />
              </Group>
              <Group>
                <Label>Hacking Period End Time</Label>
                <DatePicker field="hackingEnd" />
              </Group>
              <Group>
                <Label>Hackathon Weekend (copy)</Label>
                <Input value={settings.hackathonWeekend} onChange={e => handleChange('hackathonWeekend', e)} />
              </Group>
              <Group>
                <Label>Pre-Hackathon Workshop Notion Link</Label>
                <Input
                  value={settings.notionLinks?.preHackathonWorkshops || ''}
                  onChange={e => handleChange('preHackathonWorkshops', e)}
                  placeholder="Enter Notion link for pre-hackathon workshops"
                />
              </Group>
              <Group>
                <Label>COVID Waiver Form</Label>
                <Input
                  value={settings.waiversAndForms?.covid || ''}
                  onChange={e => handleChange('covid', e)}
                  placeholder="Enter COVID waiver form link"
                />
              </Group>
              <Group>
                <Label>Media Release Form</Label>
                <Input
                  value={settings.waiversAndForms?.media || ''}
                  onChange={e => handleChange('media', e)}
                  placeholder="Enter media release form link"
                />
              </Group>
              <Group>
                <Label>Mentorship Agreement Form</Label>
                <Input
                  value={settings.waiversAndForms?.nwMentorship || ''}
                  onChange={e => handleChange('nwMentorship', e)}
                  placeholder="Enter mentorship agreement form link"
                />
              </Group>
              <Group>
                <Label>Liability Release Form</Label>
                <Input
                  value={settings.waiversAndForms?.releaseLiability || ''}
                  onChange={e => handleChange('releaseLiability', e)}
                  placeholder="Enter liability release form link"
                />
              </Group>
              {/* <Group>
                <Label>Livesite Logo</Label>
                <LogoUpload />
              </Group> */}
              <CardContentButtonContainer>
                <CancelButton onClick={() => setisEditing(false)} />
                <Button onClick={() => handleSave()}>Save</Button>
              </CardContentButtonContainer>
            </>
          ) : (
            <>
              {/* <Group>
                <Label>Active Hackathon</Label>
                {settings.activeHackathon}
              </Group> */}
              <FeatureFlag title="Project Submissions Open" value={settings.submissionsOpen} disabled />
              <FeatureFlag title="Portal Live" value={settings.portalLive} disabled />
              <FeatureFlag title="Judging Open" value={settings.judgingOpen} disabled />
              <FeatureFlag title="Judging Released" value={settings.judgingReleased} disabled />
              <FeatureFlag title="Applications Open" value={settings.applicationsOpen} disabled />
              <Group>
                <Label>Application Deadline (copy)</Label>
                {settings.applicationDeadline || 'Not set'}
              </Group>
              <Group>
                <Label>RSVP Deadline (copy)</Label>
                {settings.rsvpBy}
              </Group>
              <Group>
                <Label>Waitlist notify time (copy)</Label>
                {settings.offWaitlistNotify}
              </Group>
              <Group>
                <Label>Acceptances sent by (copy)</Label>
                {settings.sendAcceptancesBy}
              </Group>
              <Group>
                <Label>{settings.activeHackathon} Start Time</Label>
                <LocalDate date={settings.hackathonStart} />
              </Group>
              <Group>
                <Label>{settings.activeHackathon} End Time</Label>
                <LocalDate date={settings.hackathonEnd} />
              </Group>
              <Group>
                <Label>Hacking Period Start Time</Label>
                <LocalDate date={settings.hackingStart} />
              </Group>
              <Group>
                <Label>Hacking Period End Time</Label>
                <LocalDate date={settings.hackingEnd} />
              </Group>
              <Group>
                <Label>Hackathon Weekend (copy)</Label>
                {settings.hackathonWeekend}
              </Group>
              <Group>
                <Label>Pre-Hackathon Workshop Notion Link</Label>
                {settings.notionLinks?.preHackathonWorkshops || 'Not set'}
              </Group>
              <Group>
                <Label>COVID Waiver Form</Label>
                {settings.waiversAndForms?.covid || 'Not set'}
              </Group>
              <Group>
                <Label>Media Release Form</Label>
                {settings.waiversAndForms?.media || 'Not set'}
              </Group>
              <Group>
                <Label>Mentorship Agreement Form</Label>
                {settings.waiversAndForms?.nwMentorship || 'Not set'}
              </Group>
              <Group>
                <Label>Liability Release Form</Label>
                {settings.waiversAndForms?.releaseLiability || 'Not set'}
              </Group>
              {/* Not enabled on livesite yet
              <Group>
                <Label>Livesite Logo</Label>
                <img src={settings.imgUrl} alt="logo" />
              </Group> */}
            </>
          )}
        </CardContent>
      </Card>
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

export const getStaticPaths = async () => {
  const hackathons = await getHackathons()
  const paths = hackathons.map(id => ({
    params: { id },
  }))

  return {
    paths,
    fallback: false,
  }
}

// hasn't been updated for the new portal object yet
/* eslint-disable no-alert */
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import AnnouncementsCard from '../../../components/announcementsCard'
import Modal from '../../../components/modal'
import Page from '../../../components/page'
import TextBox from '../../../components/textbox'
import Checkbox from '../../../components/checkbox'
import { DateTimePicker } from '../../../components/dateTimePicker'
import { EDIT, PORTAL_NAVBAR, NEW } from '../../../constants'
import { useAuth } from '../../../utility/auth'
import {
  deleteAnnouncement,
  getHackathons,
  subscribeToLivesiteAnnouncements,
  updateAnnouncement,
} from '../../../utility/firebase'

const StyledTextBox = styled(TextBox)`
  margin-bottom: 12px;
`
const ScheduleOptions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`

const Markdown = ({ content }) => (
  <ReactMarkdown
    linkTarget="_blank"
    allowedTypes={['text', 'paragraph', 'strong', 'emphasis', 'link', 'break', 'list', 'listItem']}
  >
    {content}
  </ReactMarkdown>
)

const announcementDateFormat = timestamp => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(timestamp).toLocaleDateString('en-US', options)
}

export default ({ hackathons }) => {
  const [announcements, setAnnouncements] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeModal, setActiveModal] = useState('')
  const [currentAnnouncement, setCurrentAnnouncement] = useState({})
  const [announcementTimeOption, setAnnouncementTimeOption] = useState('immediate')
  const [announcementTime, setAnnouncementTime] = useState(Date.now())
  const { email: user } = useAuth().user
  const router = useRouter()
  const { id: activeHackathon } = router.query

  useEffect(() => {
    if (!activeHackathon) {
      return undefined
    }
    return subscribeToLivesiteAnnouncements(activeHackathon, data => {
      setAnnouncements(data)
      setIsLoading(false)
    })
  }, [activeHackathon, setAnnouncements])

  const handleNew = () => {
    setCurrentAnnouncement({ editor: user })
    setActiveModal(NEW)
  }

  const handleDelete = key => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure? This cannot be undone')) {
      deleteAnnouncement(activeHackathon, key)
    }
  }

  const handleEdit = key => {
    setCurrentAnnouncement({ ...announcements[key], editor: user, id: key })
    setActiveModal(EDIT)
  }

  const handleCloseModal = () => {
    if (currentAnnouncement.content) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure? You will lose all progress')) {
        setActiveModal('')
      }
    } else {
      setActiveModal('')
    }
  }

  const handleSave = () => {
    const announcement = { ...currentAnnouncement }
    announcement.type = announcementTimeOption
    if (announcementTimeOption === 'immediate') {
      announcement.announcementTime = Date.now()
    } else if (announcementTimeOption === 'scheduled') {
      announcement.announcementTime = Date.parse(announcementTime)
    }
    updateAnnouncement(activeHackathon, announcement)
    setActiveModal('')
  }

  const changeCurrentAnnouncement = content => {
    setCurrentAnnouncement({ ...currentAnnouncement, content })
  }

  return (
    <Page currentPath={`livesite/${activeHackathon}`} hackathons={hackathons} navbarItems={PORTAL_NAVBAR}>
      <AnnouncementsCard
        isLoading={isLoading}
        announcements={announcements}
        handleNew={handleNew}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <Modal isOpen={activeModal === EDIT} handleClose={handleCloseModal} handleSave={handleSave} modalAction={EDIT}>
        <div>
          <strong>Announcement Content</strong>
          <StyledTextBox
            defaultValue={currentAnnouncement.content}
            modalAction={EDIT}
            onChange={event => changeCurrentAnnouncement(event.target.value)}
          />
          <strong>Preview:</strong>
          <Markdown content={currentAnnouncement.content} />
          <p>
            {moment(currentAnnouncement.timestamp).fromNow()} @ {announcementDateFormat(currentAnnouncement.timestamp)}
          </p>
        </div>
      </Modal>

      <Modal isOpen={activeModal === NEW} handleClose={handleCloseModal} handleSave={handleSave} modalAction={NEW}>
        <div>
          <strong>Announcement Content</strong>
          <StyledTextBox
            defaultValue={currentAnnouncement.content}
            modalAction={NEW}
            onChange={event => changeCurrentAnnouncement(event.target.value)}
          />
          <strong>Schedule Announcement</strong>
          <ScheduleOptions>
            <Checkbox
              label="Announce immediately"
              checked={announcementTimeOption === 'immediate'}
              onClick={() => setAnnouncementTimeOption('immediate')}
            />
            <Checkbox
              label="Schedule a time"
              checked={announcementTimeOption === 'scheduled'}
              onClick={() => setAnnouncementTimeOption('scheduled')}
            />
            {announcementTimeOption === 'scheduled' && (
              <DateTimePicker
                selected={announcementTime}
                onChange={date => setAnnouncementTime(date)}
                timeIntervals={1}
              />
            )}
          </ScheduleOptions>
          {/* <strong>Preview:</strong>
          <Markdown content={currentAnnouncement.content} />
          <p>just now @ {announcementDateFormat(Date.now())}</p> */}
        </div>
      </Modal>
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

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FeatureFlag from '../../components/FeatureFlag'
import Modal from '../../components/modal'
import Page from '../../components/page'
import QuicklinksCard from '../../components/quicklinksCard'
import TextBox from '../../components/textbox'
import { EDIT, LIVESITE_NAVBAR, NEW } from '../../constants'
import { useAuth } from '../../utility/auth'
import {
  deleteQuicklink,
  formatDate,
  getActiveHackathon,
  getHackathons,
  subscribeToLivesiteQuicklinks,
  updateQuicklink,
} from '../../utility/firebase'

const StyledTextBox = styled(TextBox)`
  margin-bottom: 12px;
`

export default ({ hackathons }) => {
  const [activeHackathon, setActiveHackathon] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [quicklinks, setQuicklinks] = useState([])
  const [activeModal, setActiveModal] = useState('')
  const [currentQuicklink, setCurrentQuicklink] = useState({})
  const { email: user } = useAuth().user

  useEffect(() => {
    ;(async () => {
      setActiveHackathon(await getActiveHackathon)
    })()
  })

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (activeHackathon) {
      return subscribeToLivesiteQuicklinks(activeHackathon, data => {
        setQuicklinks(data)
        setIsLoading(false)
      })
    }
  }, [activeHackathon, setQuicklinks])

  const handleNew = () => {
    setCurrentQuicklink({ editor: user })
    setActiveModal(NEW)
  }

  const handleDelete = async key => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure? This cannot be undone')) {
      await deleteQuicklink(activeHackathon, key)
    }
  }

  const handleEdit = key => {
    setCurrentQuicklink({ ...quicklinks[key], editor: user, id: key })
    setActiveModal(EDIT)
  }

  const handleCloseModal = () => {
    if (currentQuicklink.content) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure? You will lose all progress')) {
        setActiveModal('')
      }
    } else {
      setActiveModal('')
    }
  }

  const handleSave = async () => {
    await updateQuicklink(activeHackathon, currentQuicklink)
    setActiveModal('')
  }

  const handleInput = (content, key) => {
    setCurrentQuicklink({ ...currentQuicklink, [key]: content.trim() })
  }

  const quicklinkFields = {
    label: 'Link Label/Title',
    href: 'Link Url/href',
    category: 'Link category',
  }

  return (
    <Page currentPath="Livesite" hackathons={hackathons} navbarItems={LIVESITE_NAVBAR}>
      <QuicklinksCard
        isLoading={isLoading}
        quicklinks={quicklinks}
        handleNew={handleNew}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <Modal
        isOpen={activeModal === EDIT || activeModal === NEW}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        modalAction={activeModal}
      >
        {Object.entries(quicklinkFields).map(([key, label]) => {
          return (
            <div key={key}>
              <strong>{label}</strong>
              <StyledTextBox
                defaultValue={currentQuicklink[key]}
                modalAction={activeModal}
                onChange={event => handleInput(event.target.value, key)}
              />
            </div>
          )
        })}
        <FeatureFlag
          title="Common"
          value={currentQuicklink.common}
          onChange={() => {
            handleInput(!currentQuicklink.common, 'common')
          }}
        />
        <p>*Common links appear on homepage</p>
        <p>
          Last edited by {currentQuicklink.editor} at {formatDate(currentQuicklink.lastModified)}
        </p>
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

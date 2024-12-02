import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Input from '../../../components/input'
import Modal from '../../../components/modal'
import Page from '../../../components/page'
import ProjectsCard from '../../../components/projectsCard'
import TextBox from '../../../components/textbox'
import { EDIT, PORTAL_NAVBAR, NEW } from '../../../constants'
import {
  createProject,
  deleteProject,
  getHackathons,
  subscribeToProjects,
  updateProject,
} from '../../../utility/firebase'

const Label = styled.p`
  font-weight: bold;
  margin: 10px 0;
`

export default ({ hackathons }) => {
  const [projects, setProjects] = useState({})
  const [activeModal, setActiveModal] = useState('')
  const [data, setData] = useState({})
  const router = useRouter()
  const { id: activeHackathon } = router.query

  useEffect(() => {
    if (!activeHackathon) {
      return undefined
    }
    return subscribeToProjects(activeHackathon, firebaseData => {
      setProjects(firebaseData)
    })
  }, [activeHackathon])

  const handleNew = () => {
    setData({
      links: {
        devpost: '',
        youtube: '',
      },
      description: '',
      sponsorPrizes: '',
      teamMembers: [],
      title: '',
    })
    setActiveModal(NEW)
  }

  const handleCloseModal = () => {
    // eslint-disable-next-line
    if (confirm('Are you sure? You will lose all progress')) {
      setActiveModal('')
    }
  }

  const stringToArr = str => {
    return str?.split(',').map(i => i.trim())
  }

  const formatProject = project => {
    project.sponsorPrizes = stringToArr(project.sponsorPrizes)
    const names = stringToArr(project.names) || []
    const emails = stringToArr(project.emails) || []

    project.teamMembers = names.map((name, index) => ({
      name,
      email: emails[index] || '',
      id: '',
    }))

    delete project.names
    delete project.emails
    return project
  }

  const handleSave = async () => {
    if (!Object.values(data).every(field => field === 0 || !!field)) {
      // eslint-disable-next-line no-alert
      alert('All fields required')
      return
    }

    if (data.id) {
      updateProject(activeHackathon, formatProject(data))
      setActiveModal('')
      return
    }
    const project = {
      acknowledged: true,
      countAssigned: 0,
      ...formatProject(data),
    }
    // eslint-disable-next-line
    const confirmation = confirm(JSON.stringify(project, null, 4))
    if (confirmation) {
      await createProject(activeHackathon, project)
      setActiveModal('')
    }
  }

  const handleDelete = key => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure? This cannot be undone')) {
      deleteProject(activeHackathon, key)
    }
  }

  const handleEdit = key => {
    setData({
      ...projects[key],
      id: key,
      names: projects[key].teamMembers?.map(member => member.name).join(', ') || '',
      emails: projects[key].teamMembers?.map(member => member.email).join(', ') || '',
      sponsorPrizes: projects[key].sponsorPrizes?.toString(),
      links: {
        devpost: projects[key].links?.devpost,
        youtube: projects[key].links?.youtube,
      },
    })
    setActiveModal(EDIT)
  }

  const handleChange = (field, e) => {
    if (field === 'names' || field === 'emails') {
      setData({
        ...data,
        [field]: e.target.value,
      })
      return
    }
    if (field.startsWith('links.')) {
      const linkField = field.split('.')[1]
      setData({
        ...data,
        links: {
          ...data.links,
          [linkField]: e.target.value,
        },
      })
      return
    }
    setData({
      ...data,
      [field]: e.target.value,
    })
  }

  return (
    <Page currentPath={`portal/${activeHackathon}`} hackathons={hackathons} navbarItems={PORTAL_NAVBAR}>
      <ProjectsCard
        handleEdit={handleEdit}
        handleNew={handleNew}
        handleSave={handleSave}
        handleDelete={handleDelete}
        projects={projects}
      />
      <Modal
        isOpen={activeModal === EDIT || activeModal === NEW}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        modalAction={activeModal}
      >
        <Label>Title</Label>
        <Input value={data?.title} onChange={e => handleChange('title', e)} />
        <Label>Description</Label>
        <TextBox defaultValue={data?.description} onChange={e => handleChange('description', e)} />
        <Label>Sponsor Prizes (Comma separated)</Label>
        <Input value={data?.sponsorPrizes} onChange={e => handleChange('sponsorPrizes', e)} />
        <Label>Devpost Url</Label>
        <Input value={data?.links?.devpost} onChange={e => handleChange('links.devpost', e)} />
        <Label>Youtube Url</Label>
        <Input value={data?.links?.youtube} onChange={e => handleChange('links.youtube', e)} />
        <Label>Team Members (Comma separated)</Label>
        <Input value={data.names || ''} onChange={e => handleChange('names', e)} />
        <Label>Team Emails (Comma separated)</Label>
        <Input value={data.emails} onChange={e => handleChange('emails', e)} />
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

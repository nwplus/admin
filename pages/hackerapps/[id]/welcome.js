import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TextField from '../../../components/TextField'
import Page from '../../../components/page'
import { COLOR, HACKER_APP_NAVBAR } from '../../../constants'
import {
  getHackathonPaths,
  getHackathons,
  updateHackerAppQuestions,
  getHackerAppQuestions,
  getHackerAppQuestionsMetadata,
  formatDate,
  getTimestamp,
  updateHackerAppQuestionsMetadata,
} from '../../../utility/firebase'
import Button from '../../../components/button'
import Icon from '../../../components/Icon'
import { useAuth } from '../../../utility/auth'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const StyledReactQuill = styled(ReactQuill)`
  height: 220px;
  color: ${COLOR.MIDNIGHT_PURPLE_DEEP};

  .ql-snow .ql-editor {
    font-family: 'HK Grotesk';
  }

  .ql-container {
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
  }

  .ql-toolbar {
    display: block;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
  }
`

const StyledTextComponent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 0px;
`

const HeaderContainer = styled.div`
  display: flex;
`

const Header = styled.h1`
  margin-top: 0;
  font-weight: 600;
  font-size: 32px;
  color: ${COLOR.MIDNIGHT_PURPLE_DEEP};
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 60px;
  right: 80px;
`

const StyledMetadataP = styled.p`
  position: absolute;
  top: 100px;
  right: 80px;
  color: ${COLOR.MIDNIGHT_PURPLE};
`

const descModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ],
}

const formats = ['bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link']

export default ({ id, hackathons }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [metadata, setMetadata] = useState({})
  const { email: user } = useAuth().user

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await getHackerAppQuestions(id, 'Welcome')
      setTitle(questions[0].title || '')
      setContent(questions[0].content || '')
    }
    const fetchMetadata = async () => {
      const fetchedMetadata = await getHackerAppQuestionsMetadata(id, 'Welcome')
      setMetadata(fetchedMetadata)
    }
    fetchQuestions()
    fetchMetadata()
  }, [id])

  const handleSave = async hackathon => {
    const questions = [{ title, content }]
    await updateHackerAppQuestions(hackathon, questions, 'Welcome')
    const newMetadata = { lastEditedAt: getTimestamp() ?? '', lastEditedBy: user ?? '' }
    setMetadata(newMetadata)
    await updateHackerAppQuestionsMetadata(hackathon, 'Welcome', newMetadata)
    alert('Questions were saved to the database!')
  }

  return (
    <>
      <Page
        currentPath={`hackerapps/${id}`}
        hackathons={hackathons}
        hackerAppHeader={id}
        hackerAppNavbarItems={HACKER_APP_NAVBAR}
      >
        <StyledButton
          color={COLOR.MIDNIGHT_PURPLE_DEEP}
          contentColor={COLOR.WHITE}
          hoverBackgroundColor={COLOR.MIDNIGHT_PURPLE_LIGHT}
          onClick={async () => {
            await handleSave(id)
          }}
        >
          <Icon color={COLOR.WHITE} icon="save" />
          Save
        </StyledButton>
        <StyledMetadataP>{`Last Edited by ${metadata.lastEditedBy ?? ''} at ${
          metadata.lastEditedAt?.seconds ? formatDate(metadata.lastEditedAt.seconds) : ''
        }`}</StyledMetadataP>
        <HeaderContainer>
          <Header>1. Add a title and description</Header>
        </HeaderContainer>
        This will be the first message applicants will see before applying to a hackathon.
        <StyledTextComponent>
          <TextField
            placeholder="Add the title here..."
            customValue={title}
            onChangeCustomValue={e => setTitle(e.target.value)}
          />
          <StyledReactQuill
            theme="snow"
            modules={descModules}
            formats={formats}
            placeholder="Write a description..."
            value={content}
            onChange={setContent}
          />
        </StyledTextComponent>
      </Page>
    </>
  )
}

export const getStaticPaths = async () => {
  return getHackathonPaths()
}

export const getStaticProps = async ({ params }) => {
  const hackathons = await getHackathons()
  return {
    props: {
      hackathons,
      id: params.id,
    },
  }
}

import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '../../../components/TextField'
import Page from '../../../components/page'
import { COLOR, HACKER_APP_NAVBAR } from '../../../constants'
import { getHackathonPaths, getHackathons } from '../../../utility/firebase'

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
  return (
    <>
      <Page
        currentPath={`hackerapps/${id}`}
        hackathons={hackathons}
        hackerAppHeader={id}
        hackerAppNavbarItems={HACKER_APP_NAVBAR}
      >
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

import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '../../../components/TextField'
import Page from '../../../components/page'
import { COLOR, HACKER_APP_NAVBAR } from '../../../constants'
import { getHackathonPaths, getHackathons } from '../../../utility/firebase'

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

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', margin: '30px 0px' }}>
          <TextField
            placeholder="Add the title here..."
            customValue={title}
            onChangeCustomValue={e => setTitle(e.target.value)}
          />
          <ReactQuill
            theme="snow"
            modules={descModules}
            formats={formats}
            placeholder="Write a description..."
            style={{ height: '220px', color: `${COLOR.MIDNIGHT_PURPLE_DEEP}` }}
          />
        </div>
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

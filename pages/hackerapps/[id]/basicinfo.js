import React from 'react'
import styled from 'styled-components'
import { getHackathonPaths, getHackathons } from '../../../utility/firebase'
import Page from '../../../components/page'
import { HACKER_APP_NAVBAR, COLOR } from '../../../constants'

const HeaderContainer = styled.div`
  display: flex;
`

const Header = styled.h1`
  margin-top: 0;
  font-weight: 600;
  font-size: 32px;
  color: ${COLOR.MIDNIGHT_PURPLE_DEEP};
`

export default ({id, hackathons}) => {
  return (
    <>
    <Page currentPath={"hackerapps/" + id} hackathons={hackathons} hackerAppHeader={id} hackerAppNavbarItems={HACKER_APP_NAVBAR}>
        <HeaderContainer>
            <Header>2. Add basic information questions</Header>
        </HeaderContainer>
        hacker app qs for {id}: basic info
    </Page>
    </>
  )
}

export const getStaticPaths = async () => {
  return getHackathonPaths();
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
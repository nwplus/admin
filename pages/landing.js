import React from 'react'
import styled from 'styled-components'
import nwPlusLogo from '../assets/nwplus.svg'
import Page from '../components/page'
import { useAuth } from '../utility/auth'
import { getHackathons } from '../utility/firebase'

const NwPlusImage = styled.img`
  margin-top: 5%;
  width: 250px;
  height: 250px;
  margin-bottom: 2%;
`

const WelcomeTitle = styled.h1`
  font-size: 48px;
`

const InfoMessage = styled.p`
  font-size: 32px;
`

export default function Landing({ hackathons }) {
  const { user } = useAuth()
  return (
    <Page hackathons={hackathons}>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <NwPlusImage src={nwPlusLogo} />
        <WelcomeTitle>Welcome to the CMS {user.displayName}!</WelcomeTitle>
        <InfoMessage>Please choose a hackathon from the sidebar.</InfoMessage>
      </div>
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

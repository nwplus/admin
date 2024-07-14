import React from 'react'
import { getHackathonPaths, getHackathons } from '../../../utility/firebase'
import Page from '../../../components/page'
import { HACKER_APP_NAVBAR } from '../../../constants'

export default ({id, hackathons}) => {
  return (
    <>
    <Page currentPath={"hackerapps/" + id} hackathons={hackathons} hackerAppHeader={id} hackerAppNavbarItems={HACKER_APP_NAVBAR}>
        hacker app qs for {id}: welcome
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
import React from 'react'
import Page from '../../components/page'
import { db, getHackathonPaths, getHackathons } from '../../utility/firebase'

export default ({id, hackathons}) => (
  <Page currentPath={id} hackathons={hackathons}>
    FAQ
  </Page>
) 

export const getStaticPaths = async () => {
  return getHackathonPaths()
}

export const getStaticProps = async ({ params }) => {
  const hackathons = await getHackathons()
  return {
    props: {
      hackathons,
      id: params.id
    }
  }
}
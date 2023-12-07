import React from 'react'
import Page from '../../components/page'
import SpocosPage from '../../components/spocos'
import { HACKATHON_NAVBAR } from '../../constants'
import { getHackathonPaths, getHackathons } from '../../utility/firebase'

export default ({ id, hackathons }) => (
  <Page currentPath={id} hackathons={hackathons} navbarItems={HACKATHON_NAVBAR}>
    <SpocosPage hackathonId={id} />
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
      id: params.id,
    },
  }
}

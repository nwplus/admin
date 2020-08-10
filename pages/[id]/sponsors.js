import React from 'react'
import Page from '../../components/page'
import { db, getHackathonIds } from '../../utility/firebase'

export default ({id, hackathons}) => (
  <Page currentPath={id} hackathons={hackathons}>
    Sponsors
  </Page>
) 

export const getStaticPaths = async () => {
  const paths = await getHackathonIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {

  return await db.collection('Hackathons').get().then(querySnapshot => {
    const hackathons = []
    querySnapshot.forEach(doc => {
        hackathons.push(doc.id)
    })
    return {
      props: {
        hackathons,
        id: params.id
      }
    }
  })
}
import React from 'react'
import Page from '../../../components/page'
import { db } from '../../../utility/firebase'

export default ({id}) => (
  <Page>
    Home {id}
  </Page>
)

const getHackathonIds = async () => {

  return db.collection('Hackathons').get().then(querySnapshot => {
    const paths = []
    querySnapshot.forEach(doc => {
      paths.push( {
        params: {
          id: doc.id
        }
      })
    })
    return paths
  })
}

export const getStaticPaths = async () => {
  const paths = await getHackathonIds()
  return {
    paths,
    fallback: false
  }
}

// TODO: Get hackathon data from firebase
export const getStaticProps = ({ params }) => {
  return {
    props: {
      id: params.id
    }
  }
}
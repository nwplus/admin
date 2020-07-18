import React from 'react'
import Page from '../../../components/page'
import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyCqocBCMoqGezpYj3CyKaN_ivPGMxL4-G4',
    authDomain: 'nwplus-ubc-dev.firebaseapp.com',
    databaseURL: 'https://nwplus-ubc-dev.firebaseio.com',
    projectId: 'nwplus-ubc-dev',
  }
  firebase.initializeApp(config)
}

export default ({id}) => (
  <Page>
    Home {id}
  </Page>
)

const getHackathonIds = async () => {
  const db = firebase.firestore()
  return db.collection('Hackathons').get().then(querySnapshot => {
    const paths = []
    querySnapshot.forEach(doc => {
      paths.push( {
        params: {
          id: doc.id
        }
      })
    })
    console.log(paths)
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
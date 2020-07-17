import React from 'react'
import Page from '../../../components/page'

export default ({id}) => (
  <Page>
    Home
  </Page>
)

// TODO: Get hackathon ids from firebase
const getHackathonIds = () => {
  return [
    {
      params: {
        id: 'nwhacks'
      }
    },
    {
      params: {
        id: 'lhd'
      }
    }
  ]
}

export const getStaticPaths = () => {
  const paths = getHackathonIds()
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
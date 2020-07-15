import React from 'react'

export default ({id}) => (
    <div>Page {id}</div>
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

export const getStaticProps = ({ params }) => {
  // Fetch necessary data using params.id
  return {
    props: {
      id: params.id
    }
  }
}
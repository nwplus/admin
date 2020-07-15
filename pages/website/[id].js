import React from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/sidebar'

const Page = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
`

const Content = styled.div`
  padding: 60px;
`

export default ({id}) => (
  <Page>
    <Sidebar />
    <Content>Page {id}</Content>
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
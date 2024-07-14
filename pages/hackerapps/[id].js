import React, { useEffect, useState } from 'react'
import Page from '../../components/page'
import { getHackathonPaths, getHackathons } from '../../utility/firebase'

export default ({id, hackathons}) => {
  return (
    <>
    <Page currentPath={"hackerapps/" + id} hackathons={hackathons}>
        hacker app qs for {id}
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
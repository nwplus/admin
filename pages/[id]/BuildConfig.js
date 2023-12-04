import { Octokit } from '@octokit/rest'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/button'
import Card, { CardContent, CardHeader, CardTitle } from '../../components/card'
import GeneralConfig from '../../components/generalConfig'
import Modal from '../../components/modal'
import Page from '../../components/page'
import { HACKATHON_NAVBAR } from '../../constants'
import { getHackathonPaths, getHackathonSnapShot, getHackathons } from '../../utility/firebase'

const octokit = new Octokit({
  auth: process.env.SERVICE_ACCOUNT_TOKEN,
  baseUrl: 'https://api.github.com',
})
const Container = styled.div`
  margin-bottom: 40px;
`

export default function BuildConfig({ id, hackathons }) {
  const [buildConfig, setBuildConfig] = useState({})
  const [modalOpen, setModalOpen] = useState(false)

  // run gh action on handleSave
  const warningDeployModal = (
    <Modal
      modalTitle="WARNING"
      handleSave={() => {
        octokit.actions.createWorkflowDispatch({
          owner: 'nwplus',
          repo: 'monorepo',
          workflow_id: 'firebase_deploy.yaml',
          ref: 'test-action-dispatch',
          inputs: { targetedHackathon: `${id}_main` },
        })
        setModalOpen(false)
      }}
      isOpen={modalOpen}
      handleClose={() => setModalOpen(false)}
    >
      <span>Are you sure you want to deploy to {id}?</span>
    </Modal>
  )

  const EmptyConfigComponent = ({ config }) => {
    return (
      <Container>
        <Card>
          <CardHeader>
            <CardTitle>
              No {config} for {id}
            </CardTitle>
          </CardHeader>
        </Card>
      </Container>
    )
  }

  const ViewConfigComponent = ({ title, content }) => {
    return (
      <Container>
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <GeneralConfig id={id} title={title} content={content} />
          </CardContent>
        </Card>
      </Container>
    )
  }

  const getHackathonData = async doc => {
    setBuildConfig(doc.data().BuildConfig)
  }

  useEffect(() => {
    const unsubscribe = getHackathonSnapShot(id, getHackathonData)
    return () => unsubscribe()
  }, [window.location.pathname])

  return (
    <Page currentPath={id} hackathons={hackathons} navbarItems={HACKATHON_NAVBAR}>
      <Container>
        <Button onClick={() => setModalOpen(true)}>Deploy</Button>
        {warningDeployModal}
      </Container>

      {!buildConfig ? (
        <EmptyConfigComponent config="Build Config" />
      ) : (
        [
          !buildConfig.componentStyling ? (
            <EmptyConfigComponent key="emptyComponentStyling" config="componentStyling" />
          ) : (
            Object.entries(buildConfig.componentStyling).map(([key, val]) => (
              <ViewConfigComponent key={key} title={key} content={val} />
            ))
          ),

          !buildConfig.globalStyling ? (
            <EmptyConfigComponent key="emptyGlobalStyling" config="globalStyling" />
          ) : (
            <ViewConfigComponent key="globalStyling" title="globalStyling" content={buildConfig.globalStyling} />
          ),
        ]
      )}
    </Page>
  )
}

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

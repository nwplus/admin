import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Page from '../../components/page';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/card';
import { HACKATHON_NAVBAR } from '../../constants';
import GeneralConfig from '../../components/generalConfig';
import {
  getHackathonPaths,
  getHackathonSnapShot,
  getHackathons,
} from '../../utility/firebase';
import Button from '../../components/button'
import { Octokit } from '@octokit/core';
import axios from 'axios'

const octokit = new Octokit({ auth: 'edb5add3fa820e5d4db17b6587ef1ccb9c4a5d24' });

const Container = styled.div`
  margin-bottom: 40px;
`;

const res = async () => await axios.post('https://api.github.com/repos/nwplus/monorepo/dispatches', { event_type: 'cms-deploy'}, { 
  headers: {
    Authorization: 'Bearer edb5add3fa820e5d4db17b6587ef1ccb9c4a5d24',
    Accept: 'application/vnd.github.everest-preview+json'
  }
});
console.log(res.status);

export default function BuildConfig({ id, hackathons }) {
  const [buildConfig, setBuildConfig] = useState({});

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
    );
  };

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
    );
  };

  const getHackathonData = async (doc) => {
    setBuildConfig(doc.data().BuildConfig);
  };

  useEffect(() => {
    const unsubscribe = getHackathonSnapShot(id, getHackathonData);
    return () => unsubscribe();
  }, [window.location.pathname]);

  return (    
    <Page
      currentPath={id}
      hackathons={hackathons}
      navbarItems={HACKATHON_NAVBAR}
    >
      <Container>
        {/* <Button onClick={() => octokit.request('POST/repos/nwplus/dispatches', {
          owner: 'nwplus',
          repo: 'monorepo',
          headers: {
            accept: 'application/vnd.github.everest-preview+json',
            authorization: 'edb5add3fa820e5d4db17b6587ef1ccb9c4a5d24'
          },
          event_type: 'cms-deploy'
        })}>
          Deploy
        </Button>    */}
        <Button onClick={ async () => await axios.post('https://api.github.com/repos/nwplus/monorepo/dispatches', { event_type: 'cms-deploy'}, { 
          headers: {
            Authorization: 'Bearer edb5add3fa820e5d4db17b6587ef1ccb9c4a5d24',
            Accept: 'application/vnd.github.everest-preview+json'
          }
        })}>
          Deploy
        </Button>
      </Container>      

      {!buildConfig ? (
        <EmptyConfigComponent config="Build Config" />
      ) : (
        [
          !buildConfig.componentStyling ? (
            <EmptyConfigComponent
              key="emptyComponentStyling"
              config="componentStyling"
            />
          ) : (
            Object.entries(buildConfig.componentStyling).map(([key, val]) => (
              <ViewConfigComponent key={key} title={key} content={val} />
            ))
          ),

          !buildConfig.globalStyling ? (
            <EmptyConfigComponent
              key="emptyGlobalStyling"
              config="globalStyling"
            />
          ) : (
            <ViewConfigComponent
              key="globalStyling"
              title="globalStyling"
              content={buildConfig.globalStyling}
            />
          ),
        ]
      )}
    </Page>
  );
}

export const getStaticPaths = async () => {
  return getHackathonPaths();
};

export const getStaticProps = async ({ params }) => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
      id: params.id,
    },
  };
};

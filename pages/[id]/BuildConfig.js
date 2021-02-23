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

const Container = styled.div`
  margin-bottom: 40px;
`;

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
      {!buildConfig ? (
        <EmptyConfigComponent config="Build Config" />
      ) : (
        [
          !buildConfig.componentStyling ? (
            <EmptyConfigComponent config="componentStyling" />
          ) : (
            Object.entries(buildConfig.componentStyling).map(([key, val]) => (
              <ViewConfigComponent key={key} title={key} content={val} />
            ))
          ),

          !buildConfig.globalStyling ? (
            <EmptyConfigComponent config="globalStyling" />
          ) : (
            <ViewConfigComponent
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

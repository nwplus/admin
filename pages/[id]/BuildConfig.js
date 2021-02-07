import { useState } from 'react';
import Page from '../../components/page';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/card';
import { HACKATHON_NAVBAR } from '../../constants';
import { db, getHackathonPaths, getHackathons } from '../../utility/firebase';

export default function BuildConfig({ id, hackathons }) {
  const [buildConfig, setBuildConfig] = useState({});

  const EmptyConfigComponent = ({ config }) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            No {config} for {id}
          </CardTitle>
        </CardHeader>
      </Card>
    );
  };

  const ViewConfigComponent = ({ title, content }) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <pre>{JSON.stringify(content, null, 2)}</pre>
        </CardContent>
      </Card>
    );
  };

  db.collection('Hackathons')
    .doc(id)
    .onSnapshot((doc) => {
      setBuildConfig(doc.data().BuildConfig);
    });

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
              <ViewConfigComponent title={key} content={val} />
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

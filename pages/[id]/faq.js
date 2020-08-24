import React from 'react';
import Page from '../../components/page';
import { getHackathonPaths, getHackathons } from '../../utility/firebase';
import Faq from '../faq';

export default ({ id, hackathons }) => (
  <Page currentPath={id} hackathons={hackathons}>
    <Faq currHackathon={id} hackathons={hackathons} />
  </Page>
);

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

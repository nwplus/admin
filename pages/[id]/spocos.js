import React from 'react';
import Page from '../../components/page';
import { getHackathonPaths, getHackathons } from '../../utility/firebase';
import SponsorshipPage from '../sponsorship';

export default ({ id, hackathons }) => (
  <Page currentPath={id} hackathons={hackathons}>
    <SponsorshipPage name={id} />
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

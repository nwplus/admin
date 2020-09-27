import React from 'react';
import Page from '../../components/page';
import { getHackathonPaths, getHackathons } from '../../utility/firebase';
import { LIVESITE_NAVBAR } from '../../constants';

export default ({ hackathons }) => (
  <Page
    currentPath="livesite"
    hackathons={hackathons}
    navbarItems={LIVESITE_NAVBAR}
  />
);

export const getStaticPaths = async () => {
  return getHackathonPaths();
};

export const getStaticProps = async () => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
    },
  };
};

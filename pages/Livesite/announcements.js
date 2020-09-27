import React from 'react';
import Page from '../../components/page';
import { getHackathonPaths, getHackathons } from '../../utility/firebase';
import { LIVESITE_NAVBAR } from '../../constants';

export default ({ hackathons }) => (
  <Page
    currentPath="Livesite"
    hackathons={hackathons}
    navbarItems={LIVESITE_NAVBAR}
  >
    <img
      src="https://i.imgur.com/lEjmB7U.gif"
      width="480"
      height="362"
      alt="panik"
    />
    <p>This area under construction.</p>
  </Page>
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

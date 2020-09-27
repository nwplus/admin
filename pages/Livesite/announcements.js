import React from 'react';
import Page from '../../components/page';
import { getHackathons } from '../../utility/firebase';
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
    <p>Announcements - This area under construction.</p>
  </Page>
);

export const getStaticProps = async () => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
    },
  };
};

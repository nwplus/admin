import React from 'react';
import styled from 'styled-components';
import Page from '../components/page';
import { getHackathons } from '../utility/firebase';
import { LIVESITE_NAVBAR } from '../constants';

const WelcomeTitle = styled.h1`
  font-size: 48px;
`;

const InfoMessage = styled.p`
  font-size: 32px;
`;

export default function Landing({ hackathons }) {
  return (
    <Page
      hackathons={hackathons}
      currentPath="livesite"
      navbarItems={LIVESITE_NAVBAR}
    >
      <div style={{ width: '100%', textAlign: 'center' }}>
        <WelcomeTitle>Welcome to LIVESITE!</WelcomeTitle>
        <img
          src="https://i.imgur.com/lEjmB7U.gif"
          width="480"
          height="362"
          alt="panik"
        />
        <InfoMessage>This area under construction.</InfoMessage>
      </div>
    </Page>
  );
}

export const getStaticProps = async () => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
    },
  };
};

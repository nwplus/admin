import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/sidebar';
import { getHackathons } from '../utility/firebase';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
`;

const WelcomeTitle = styled.h1`
  font-size: 48px;
`;

const InfoMessage = styled.p`
  font-size: 32px;
`;

export default function Landing({ hackathons }) {
  return (
    <Container>
      <Sidebar hackathons={hackathons} currentPath="livesite" />
      <div style={{ width: '80vw' }}>
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
      </div>
    </Container>
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

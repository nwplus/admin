import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/sidebar';
import { getHackathons } from '../utility/firebase';
import nwPlusLogo from '../assets/nwplus.svg';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
`;

const NwPlusImage = styled.img`
  margin-top: 5%;
  width: 250px;
  height: 250px;
  margin-bottom: 2%;
`;

const WelcomeTitle = styled.h1`
  font-size: 60px;
`;

const InfoMessage = styled.p`
  font-size: 40px;
`;

export default function Landing({ hackathons, id }) {
  return (
    <Container>
      <Sidebar currentPath={id} hackathons={hackathons} />
      <div style={{ width: '80vw' }}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <NwPlusImage src={nwPlusLogo} />
          <WelcomeTitle>Welcome to the CMS!</WelcomeTitle>
          <InfoMessage>
            {'<'} Please choose a hackathon from the sidebar.
          </InfoMessage>
        </div>
      </div>
    </Container>
  );
}

export const getStaticProps = async ({ params }) => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
      id: params?.id ?? null,
    },
  };
};

import React from 'react';
import styled from 'styled-components';
import Scoring from '../components/Evaluator/Scoring';
import Page from '../components/page';
import { getHackathons } from '../utility/firebase';

const Container = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Eval({ hackathons }) {
  return (
    <Page hackathons={hackathons} currentPath="eval">
      <Container>
        <LeftContainer>
          <div>Applicant List</div>
          <div>Rubric</div>
        </LeftContainer>
        <div>Applicant Response</div>
        <Scoring />
      </Container>
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

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Scoring from '../components/Evaluator/Scoring';
import HackerList from '../components/Evaluator/HackerList';
import ApplicantResponse from '../components/Evaluator/ApplicantResponse';
import Page from '../components/page';
import Rubric from '../components/Evaluator/Rubric';
import { getAllApplicants, getHackathons } from '../utility/firebase';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  grid-template-rows: 1fr;
  gap: 1rem;
  height: 100vh;
  box-sizing: border-box;
  padding: 1rem;
  background: #f7f7f7;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${(p) =>
    p.items
      ? `height: calc(100vh - ${1 + p.items}rem);`
      : 'height: calc(100vh - 2rem);'};
`;

export default function Eval({ hackathons }) {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    getAllApplicants(setApplicants);
  }, []);

  // If the list of applicants updates, update the information about the currently selected applicant
  useEffect(() => {
    if (selectedApplicant) {
      setSelectedApplicant(
        applicants.find((applicant) => applicant._id === selectedApplicant._id)
      );
    }
  }, [applicants]);

  return (
    <Page hackathons={hackathons} currentPath="eval" isFullscreen>
      <Container>
        <Column items={2}>
          <HackerList
            applicants={applicants}
            selectedApplicant={selectedApplicant}
            setSelectedApplicant={setSelectedApplicant}
          />
          <Rubric />
        </Column>
        <Column>
          <ApplicantResponse
            shouldDisplay={!!selectedApplicant}
            hacker={selectedApplicant}
          />
        </Column>
        <Column>
          <Scoring
            shouldDisplay={!!selectedApplicant}
            applicant={selectedApplicant}
          />
        </Column>
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

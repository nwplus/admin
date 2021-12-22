import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Scoring from '../components/Evaluator/Scoring';
import HackerList from '../components/Evaluator/HackerList';
import ApplicantResponse from '../components/Evaluator/ApplicantResponse';
import Page from '../components/page';
import Rubric from '../components/Evaluator/Rubric';
import { getAllApplicants, getHackathons } from '../utility/firebase';

const Container = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex: 1.5;
`;

const SmallColumn = styled.div`
  flex: 1;
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
        <SmallColumn>
          <HackerList
            applicants={applicants}
            selectedApplicant={selectedApplicant}
            setSelectedApplicant={setSelectedApplicant}
          />
          <Rubric />
        </SmallColumn>
        <Column>
          <ApplicantResponse
            shouldDisplay={!!selectedApplicant}
            hacker={selectedApplicant}
          />
        </Column>
        <SmallColumn>
          <Scoring
            shouldDisplay={!!selectedApplicant}
            applicant={selectedApplicant}
          />
        </SmallColumn>
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

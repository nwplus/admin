import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Scoring from '../components/Evaluator/Scoring';
import HackerEntry from '../components/Evaluator/HackerEntry';
import Page from '../components/page';
import { getAllApplicants, getHackathons } from '../utility/firebase';

const Container = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
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
    <Page hackathons={hackathons} currentPath="eval">
      <Container>
        <LeftContainer>
          <div>Applicant List</div>
          {/* TODO: Replace this with the applicant component */}
          {applicants.map((applicant, i) => {
            console.log(applicant)
            return <HackerEntry
              index={applicant.index || i}
              id={applicant.id || 'tbd'}
              firstName={applicant.basicInfo.firstName}
              lastName={applicant.basicInfo.lastName}
              score={applicant.score}
              selectHacker={() => setSelectedApplicant(applicant)}
              isSelected={selectedApplicant._id === applicant._id}
            />
            })}
          <div>Rubric</div>
        </LeftContainer>
        <div>Applicant Response</div>
        <Scoring applicant={selectedApplicant} />
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

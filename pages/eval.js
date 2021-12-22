import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Scoring from '../components/Evaluator/Scoring';
import ApplicantResponse from '../components/Evaluator/ApplicantResponse';
import Page from '../components/page';
import Rubric from '../components/Evaluator/Rubric';
import { getAllApplicants, getHackathons } from '../utility/firebase';

const Container = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const hacker = {
  status: {
    attending: false,
    applicationStatus: 'scored',
    responded: false,
  },
  submission: {
    submitted: false,
    lastUpdated: {
      seconds: 1638039653,
      nanoseconds: 448000000,
    },
  },
  _id: 'XTbdm2vhBjTTEFGJJ6cb5bCj0Wy2',
  vaccineInfo: {
    willBeDoubleVaxed: true,
  },
  score: {
    lastUpdatedBy: 'kevin@nwplus.io',
    totalScore: 25,
    lastUpdated: {
      seconds: 1639729780,
      nanoseconds: 777000000,
    },
    scores: {
      ResponseOneScore: 6,
      ResumeScore: 6,
      ResponseTwoScore: 6,
      LinkScore: 7,
    },
    comment: 'Comment for Michelle',
  },
  termsAndConditions: {
    shareWithSponsors: false,
    MLHPrivacyPolicy: true,
    shareWithnwPlus: true,
    MLHCodeOfConduct: true,
  },
  submittedProject: '',
  skills: {
    longAnswers2: 'All the time kek',
    longAnswers1: 'Good thimgs',
    resume: 'hello.pdf',
    linkedin: '',
    hackathonsAttended: 1,
    github: 'https://google.com',
    portfolio: 'https://yahoo.ca',
  },
  basicInfo: {
    educationLevel: 'undergraduate',
    lastName: 'Kim',
    isOfLegalAge: true,
    graduation: 2024,
    middleName: '',
    email: 'michelle@nwplus.io',
    phoneNumber: '+1 111-111-1111',
    firstName: 'Michelle',
    contributionRole: 'designer',
    gender: 'female',
    ethnicity: {
      hispanic: false,
      middleEastern: false,
      nativeHawaiian: false,
      other: false,
      caucasian: false,
      preferNot: false,
      asian: true,
      black: true,
      northAmerica: false,
    },
    school: 'The University of British Columbia (UBC)',
    major: 'Computer Science',
  },
  questionnaire: {
    eventsAttended: {
      option2: true,
      option6: true,
      option4: true,
      option3: true,
      option1: true,
    },
    otherEngagementSource: '',
    engagementSource: 'Word of mouth',
  },
  projectsAssigned: [],
  team: '',
};

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
          {applicants.map((applicant) => (
            <button
              type="button"
              onClick={() => setSelectedApplicant(applicant)}
            >
              {applicant.basicInfo.firstName}
            </button>
          ))}
          <Rubric />
        </LeftContainer>
        <div>
          <ApplicantResponse hacker={hacker} />
        </div>
        <Scoring
          shouldDisplay={!!selectedApplicant}
          applicant={selectedApplicant}
        />
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

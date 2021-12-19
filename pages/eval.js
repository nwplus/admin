import React from 'react';
import styled from 'styled-components';
import Scoring from '../components/Evaluator/Scoring';
import ApplicantResponse from '../components/Evaluator/ApplicantResponse';
import Page from '../components/page';
import { getHackathons } from '../utility/firebase';

const Container = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const hacker = {
  "status": {
      "attending": false,
      "applicationStatus": "scored",
      "responded": false
  },
  "submission": {
      "submitted": false,
      "lastUpdated": {
          "seconds": 1638039653,
          "nanoseconds": 448000000
      }
  },
  "_id": "XTbdm2vhBjTTEFGJJ6cb5bCj0Wy2",
  "vaccineInfo": {
      "willBeDoubleVaxed": true
  },
  "score": {
      "lastUpdatedBy": "kevin@nwplus.io",
      "totalScore": 25,
      "lastUpdated": {
          "seconds": 1639729780,
          "nanoseconds": 777000000
      },
      "scores": {
          "ResponseOneScore": 6,
          "ResumeScore": 6,
          "ResponseTwoScore": 6,
          "LinkScore": 7
      },
      "comment": "Comment for Michelle"
  },
  "termsAndConditions": {
      "shareWithSponsors": false,
      "MLHPrivacyPolicy": true,
      "shareWithnwPlus": true,
      "MLHCodeOfConduct": true
  },
  "submittedProject": "",
  "skills": {
      "longAnswers2": "All the time kek",
      "longAnswers1": "Good thimgs",
      "resume": "hello.pdf",
      "linkedin": "",
      "hackathonsAttended": 1,
      "github": "https://google.com",
      "portfolio": "https://yahoo.ca"
  },
  "basicInfo": {
      "educationLevel": "undergraduate",
      "lastName": "Kim",
      "isOfLegalAge": true,
      "graduation": 2024,
      "middleName": "",
      "email": "michelle@nwplus.io",
      "phoneNumber": "+1 111-111-1111",
      "firstName": "Michelle",
      "contributionRole": "designer",
      "gender": "female",
      "ethnicity": {
          "hispanic": false,
          "middleEastern": false,
          "nativeHawaiian": false,
          "other": false,
          "caucasian": false,
          "preferNot": false,
          "asian": true,
          "black": true,
          "northAmerica": false
      },
      "school": "The University of British Columbia (UBC)",
      "major": "Computer Science"
  },
  "questionnaire": {
      "eventsAttended": {
          "option2": true,
          "option6": true,
          "option4": true,
          "option3": true,
          "option1": true
      },
      "otherEngagementSource": "",
      "engagementSource": "Word of mouth"
  },
  "projectsAssigned": [],
  "team": ""
}

export default function Eval({ hackathons }) {
  return (
    <Page hackathons={hackathons} currentPath="eval">
      <Container>
        <LeftContainer>
          <div>Applicant List</div>
          <div>Rubric</div>
        </LeftContainer>
        <div>
          <ApplicantResponse hacker={hacker} />
        </div>
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

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Title4 } from '../Typography';
import ResponseInput from '../../components/Assessment/responseInput';
import { COLOR, } from '../../constants';
import { getResumeFile } from '../../utility/firebase';

const Container = styled.div`
  border-radius: 5px;
  border: none;
  padding: 20px;
  max-width: 46%;
  text-align: left;
  height: 85vh;
`;

const NO_RESPONSE = "No Response";

export default function ApplicantResponse({hacker}) {
  const [resumeURL, setResumeURL] = useState(null)
  useEffect(() => {
    getResumeFile(hacker._id)
      .then(async (url) => {
        setResumeURL(url)
      });
  })

  return (
    <Container>
      <Title4 color={COLOR.MIDNIGHT_PURPLE}>Applicant Response</Title4>
      <ResponseInput
          label="How many hackathons have you attended?"
          response={`${hacker.skills.hackathonsAttended}`}
      />

      <ResponseInput
        url
        urlLabel={hacker.skills?.github ? "View GitHub" : NO_RESPONSE}
        label="Github"
        response={hacker.skills?.github}
      />

      <ResponseInput
        url
        urlLabel={hacker.skills?.portfolio ? "View Portfolio" : NO_RESPONSE}
        label="Personal site"
        response={hacker.skills?.portfolio}
      />

      <ResponseInput
        url
        urlLabel={hacker.skills?.linkedin ? "View LinkedIn" : NO_RESPONSE}
        label="LinkedIn"
        response={hacker.skills?.linkedin}
      />

      <ResponseInput
        url={resumeURL}
        urlLabel={resumeURL ? "View Resume" : NO_RESPONSE}
        label="Resume"
        response={resumeURL}/>

      <ResponseInput
          label="What should technology be used for?"
          response={`${hacker.skills.longAnswers1}`}
      />

      <ResponseInput
        label="How would you like to challenge yourself during this hackathon? OR Describe a time where you went above and beyond of your role to demonstrate leadership in a project."
        response={`${hacker.skills.longAnswers2}`}
      />

    </Container>
  );
}

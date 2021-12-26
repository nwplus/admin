import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Title5 } from '../Typography';
import ResponseInput from '../Assessment/responseInput';
import { COLOR, ASSESSMENT_COLOR } from '../../constants';
import { getResumeFile } from '../../utility/firebase';

const Container = styled.div`
  ${(p) => !p.shouldDisplay && 'display: none'};
  border-radius: 5px;
  border: none;
  padding: 0 20px 20px;
  height: 100%;
  text-align: left;
  overflow-y: auto;

  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;

  ::-webkit-scrollbar {
    width: 10px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-style: solid;
    border-color: transparent;
    background-clip: padding-box;
    border-radius: 10px;
    box-shadow: inset 0 0 6px 6px ${ASSESSMENT_COLOR.UNSCORED_GRAY};
  }
`;

const NO_RESPONSE = 'No Response';

export default function ApplicantResponse({ shouldDisplay, hacker }) {
  const [resumeURL, setResumeURL] = useState(null);
  useEffect(() => {
    if (hacker) {
      getResumeFile(hacker._id).then(async (url) => {
        setResumeURL(url);
      });
    }
  }, [hacker]);

  return (
    <Container shouldDisplay={shouldDisplay}>
      <Title5 color={COLOR.MIDNIGHT_PURPLE}>Applicant Response</Title5>
      <ResponseInput
        label="Full Name"
        response={`${hacker?.basicInfo?.firstName} ${hacker?.basicInfo?.lastName}`}
      />

      <ResponseInput label="Email" response={hacker?.basicInfo?.email} />

      <ResponseInput
        label="Role"
        response={hacker?.basicInfo?.contributionRole}
      />

      <ResponseInput
        label="19 or over?"
        response={hacker?.basicInfo?.isOfLegalAge ? 'yes' : 'no'}
      />

      <ResponseInput
        label="School"
        response={`Studying ${hacker?.basicInfo?.school}`}
      />

      <ResponseInput label="Major" response={hacker?.basicInfo?.major} />

      <ResponseInput
        label="Visiting From"
        response={hacker?.basicInfo?.location}
      />

      <ResponseInput
        label="How many hackathons have you attended?"
        response={`${hacker?.skills?.hackathonsAttended}`}
      />

      <ResponseInput
        url
        urlLabel={hacker?.skills?.github ? 'View GitHub' : NO_RESPONSE}
        label="Github"
        response={hacker?.skills?.github}
      />

      <ResponseInput
        url
        urlLabel={hacker?.skills?.portfolio ? 'View Portfolio' : NO_RESPONSE}
        label="Personal site"
        response={hacker?.skills?.portfolio}
      />

      <ResponseInput
        url
        urlLabel={hacker?.skills?.linkedin ? 'View LinkedIn' : NO_RESPONSE}
        label="LinkedIn"
        response={hacker?.skills?.linkedin}
      />

      <ResponseInput
        url={resumeURL}
        urlLabel={resumeURL ? 'View Resume' : NO_RESPONSE}
        label="Resume"
        response={resumeURL}
      />

      <ResponseInput
        label="What should technology be used for?"
        response={`${hacker?.skills?.longAnswers1}`}
      />

      <ResponseInput
        label="How would you like to challenge yourself during this hackathon? OR Describe a time where you went above and beyond of your role to demonstrate leadership in a project."
        response={`${hacker?.skills?.longAnswers2}`}
      />
    </Container>
  );
}

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

const CONTRIBUTION_ROLE_OPTIONS = Object.freeze({
  beginner: 'Beginner',
  designer: 'Designer',
  developer: 'Developer',
  pm: 'Product/project manager',
  other: 'Other',
});

export default function ApplicantResponse({ shouldDisplay, hacker }) {
  const [resumeURL, setResumeURL] = useState(null);
  const [contributionRole, setContributionRole] = useState('');

  const fetchContributionRole = (contributionMap) => {
    const getContribution = (obj) => Object.keys(obj).filter((key) => obj[key]);
    const contribution = getContribution(contributionMap).map(
      (e) => CONTRIBUTION_ROLE_OPTIONS[e]
    );
    const contributionValues = [];
    // eslint-disable-next-line no-plusplus
    for (let k = 0; k < contribution.length; k++) {
      contributionValues.push(contribution[k]);

      if (k < contribution.length - 1) {
        contributionValues.push(', ');
      }
    }

    setContributionRole(contributionValues);
  };

  useEffect(() => {
    if (hacker) {
      getResumeFile(hacker._id).then(async (url) => {
        setResumeURL(url);
      });
      fetchContributionRole(hacker?.skills.contributionRole);
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
        label="Identify as underrepresented?"
        response={hacker?.basicInfo?.identifyAsUnderrepresented}
      />

      <ResponseInput label="Role" response={contributionRole} />

      <ResponseInput
        label="19 or over?"
        response={
          hacker?.basicInfo?.isOfLegalAge ||
          Number(hacker?.basicInfo?.ageByHackathon) >= 19 ||
          Number(hacker?.basicInfo?.otherAgeByHackathon) >= 19
            ? 'yes'
            : 'no'
        }
      />

      <ResponseInput label="School" response={`${hacker?.basicInfo?.school}`} />

      <ResponseInput label="Major" response={hacker?.basicInfo?.major} />

      <ResponseInput
        label="First time hacker?"
        response={hacker?.skills?.firstTimeHacker ? 'No' : 'Yes'}
      />

      <ResponseInput url label="Github" response={hacker?.skills?.github} />

      <ResponseInput
        url
        label="Personal site"
        response={hacker?.skills?.portfolio}
      />

      <ResponseInput url label="LinkedIn" response={hacker?.skills?.linkedin} />

      <ResponseInput url={resumeURL} label="Resume" response={resumeURL} />

      <ResponseInput
        label="Why do you want to attend cmd-f 2023?"
        response={`${hacker?.skills?.longAnswers1}`}
      />

      <ResponseInput
        label="How would you make tech a more welcoming space for underrepresented demographics?"
        response={`${hacker?.skills?.longAnswers2}`}
      />

      <ResponseInput
        label="In the past, have there been reasons deterring you from attending hackathons or other tech events? (optional)"
        response={`${hacker?.skills?.longAnswers3}`}
      />

      <ResponseInput
        label="Is there anything you want to let us know to ensure that we can help you feel comfortable throughout the event? (optional)"
        response={`${hacker?.skills?.longAnswers4}`}
      />
    </Container>
  );
}

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

export default function ApplicantResponse({hacker}) {

  function ResumeLink() {
    const [file, setFile] = useState(null);
    const [noResume, setNoResume] = useState(false);
    useEffect(() => {
      getResumeFile(hacker._id)
        .then(async (url) => {
          const data = await fetch(url);
          setFile(await data.blob());
          const fileURL = URL.createObjectURL(file);
          setFile(fileURL);
        })
        .catch(() => setNoResume(true));
    }, []);

    return !file && noResume === false ? (
      <>Loading</>
    ) : noResume ? (
      <div>No resume</div>
    ) : (
      <a href={file} target="_blank" rel="noopener noreferrer">
        View Resume
      </a>
    );
  }

  const temp = ResumeLink();
  console.log(temp.props.children)

  return (
    <Container>
      <Title4 color={COLOR.MIDNIGHT_PURPLE}>Applicant Response</Title4>
      <ResponseInput
          label="How many hackathons have you attended?"
          response={`${hacker.skills.hackathonsAttended}`}
      />

      <ResponseInput
        url
        label="Github"
        response={hacker.skills?.github}
      />

      <ResponseInput
        url
        label="Personal site"
        response={hacker.skills?.portfolio}
      />

      <ResponseInput url={temp.props.children !== "No resume"} label="Resume" response={temp}/>

      <ResponseInput
          label="What are you interested in building at nwHacks? Tell us about an idea you have, and why it gets you excited."
          response={`${hacker.skills.longAnswers1}`}
      />

      <ResponseInput
        label="What can you teach others at nwHacks? (It can be a specific skill, technology, or an area of domain knowledge)"
        response={`${hacker.skills.longAnswers2}`}
      />

    </Container>
  );
}

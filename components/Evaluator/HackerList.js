import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HackerEntry from './HackerEntry';
import Input from '../input';
import { COLOR } from '../../constants';

const Title = styled.span`
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MIDNIGHT_PURPLE};
  font-weight: bold;
`;

export default function HackerList({
  applicants,
  selectedApplicant,
  setSelectedApplicant = () => {},
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  useEffect(() => {
    setFilteredApplicants(applicants);
  }, []);

  return (
    <>
      <Title>Applicant List</Title>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredApplicants.map((applicant, i) => (
        <HackerEntry
          index={applicant.index || i}
          id={applicant.id || 'tbd'}
          firstName={applicant.basicInfo.firstName}
          lastName={applicant.basicInfo.lastName}
          score={applicant.score}
          selectHacker={() => setSelectedApplicant(applicant)}
          isSelected={
            selectedApplicant && selectedApplicant._id === applicant._id
          }
        />
      ))}
    </>
  );
}

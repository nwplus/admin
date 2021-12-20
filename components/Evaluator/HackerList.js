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
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  // debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 20);

    return () => {
      // teardown
      clearTimeout(handler);
    };
  }, [search]);

  // filter applicants based off of search term
  useEffect(
    () =>
      setFiltered(
        applicants.filter((applicant) => {
          const [first, last] = [
            applicant.basicInfo.firstName.toLowerCase(),
            applicant.basicInfo.lastName.toLowerCase(),
          ];
          return (
            first.includes(debouncedSearch) || last.includes(debouncedSearch)
          );
        })
      ),
    [debouncedSearch, applicants]
  );

  return (
    <>
      <Title>Applicant List</Title>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      {filtered.map((applicant, i) => (
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

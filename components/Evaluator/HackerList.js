import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HackerEntry from './HackerEntry';
import Input from '../input';
import { COLOR, ASSESSMENT_COLOR } from '../../constants';
import { Title4 } from '../Typography';

const Container = styled.div`
  height: 50vh;
`;

const ListContainer = styled.div`
  height: 65%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 13px;
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
          const [name, email] = [
            `${applicant.basicInfo.firstName.toLowerCase()} ${applicant.basicInfo.lastName.toLowerCase()}`,
            applicant.basicInfo.email.toLowerCase(),
          ];
          return (
            name.includes(debouncedSearch) || email.includes(debouncedSearch)
          );
        })
      ),
    [debouncedSearch, applicants]
  );

  return (
    <Container>
      <Title4 color={COLOR.MIDNIGHT_PURPLE}>Applicant List</Title4>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <ListContainer>
        {filtered.map((applicant, i) => (
          <HackerEntry
            key={applicant._id}
            index={applicant.index || i}
            id={applicant.id || 'tbd'}
            firstName={applicant.basicInfo.firstName}
            lastName={applicant.basicInfo.lastName}
            score={applicant.score}
            selectHacker={() => setSelectedApplicant(applicant)}
            hasCompleted={
              applicant.score && Object.keys(applicant.score.scores).length >= 4
            }
            isSelected={
              selectedApplicant && selectedApplicant._id === applicant._id
            }
          />
        ))}
      </ListContainer>
    </Container>
  );
}

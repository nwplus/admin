import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HackerEntry from './HackerEntry';
import Input from '../input';
import { COLOR, ASSESSMENT_COLOR } from '../../constants';
import { Title5 } from '../Typography';

const Container = styled.div`
  height: 60%;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const HeadContainer = styled.div`
  padding: 0 1rem;
`;

const ListContainer = styled.div`
  flex-grow: 1;
  height: 65%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;

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
      <HeadContainer>
        <Title5 color={COLOR.MIDNIGHT_PURPLE}>Applicant List</Title5>
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </HeadContainer>
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
              applicant.score && Object.keys(applicant.score.scores).length >= 3
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

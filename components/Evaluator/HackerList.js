import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HackerEntry from './HackerEntry';
import Icon from '../Icon';
import Input from '../input';
import { COLOR, ASSESSMENT_COLOR } from '../../constants';
import { Title5 } from '../Typography';
import ExportModal from '../Assessment/ExportModal';

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledIcon = styled(Icon)`
  pointer-events: all;
  &:hover {
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 1.5rem 0 1rem 0;
  width: 100%;
`;

const StyledInput = styled(Input)`
  margin: 0;
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
  // State for search and filter icons
  const [searchActive, setSearchActive] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

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

  // filter applicants based off of search term and/or filter state
  useEffect(() => {
    const filteredBySearch = applicants.filter((applicant) => {
      if (debouncedSearch === '') {
        return true;
      }
      const [name, email] = [
        `${applicant.basicInfo.firstName.toLowerCase()} ${applicant.basicInfo.lastName.toLowerCase()}`,
        applicant.basicInfo.email.toLowerCase(),
      ];
      return name.includes(debouncedSearch) || email.includes(debouncedSearch);
    });

    // If filterActive is true, we filter out those that are already completed
    // If filterActive is false, we don't filter any applications
    const filteredByComplete = filteredBySearch.filter((applicant) => {
      if (!filterActive) {
        return true;
      }
      return !applicant.score || Object.keys(applicant.score.scores).length < 3;
    });

    setFiltered(filteredByComplete);
  }, [debouncedSearch, filterActive, applicants]);

  const closeSearch = () => {
    setSearchActive(false);
    setSearch('');
  };

  return (
    <Container>
      <HeadContainer>
        {searchActive ? (
          <SearchContainer>
            <StyledInput
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <StyledIcon icon="close" onClick={closeSearch} />
          </SearchContainer>
        ) : (
          <>
            <Title5 color={COLOR.MIDNIGHT_PURPLE}>Applicant List</Title5>
            <ButtonContainer>
              <StyledIcon icon="search" onClick={() => setSearchActive(true)} />
              <StyledIcon
                icon="filter"
                color={!filterActive && COLOR.GREY_500}
                onClick={() => setFilterActive(!filterActive)}
              />
              <StyledIcon
                icon="file-arrow-down"
                onClick={() => setShowExportModal(true)}
              />
            </ButtonContainer>
          </>
        )}
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
              applicant.score &&
              applicant.score.scores &&
              Object.keys(applicant.score.scores).length >= 3
            }
            isSelected={
              selectedApplicant && selectedApplicant._id === applicant._id
            }
          />
        ))}
      </ListContainer>

      {showExportModal && <ExportModal setShowing={setShowExportModal} />}
    </Container>
  );
}

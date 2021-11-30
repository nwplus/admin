import React, { useEffect, useState } from 'react';
import Page from '../components/page';
import Table from '../components/Assessment/Table';
import ToolBar from '../components/Assessment/toolbar';
import ToggleButton from '../components/toggleButton';
import { APPLICATION_STATUS, SORT } from '../constants';
import { getAllApplicants, getHackathons } from '../utility/firebase';
import styled from 'styled-components';

const ToggleBarContainer = styled.div`
    display: flex; 
    flex-direction: row;
    background-color: #433860;
`;

const sort = (arr, type) => {
  switch (type) {
    case SORT.LAST_NAME:
      return arr.sort((a, b) => {
        return a.basicInfo.lastName
          ?.toLocaleLowerCase()
          .localeCompare(b.basicInfo.lastName?.toLocaleLowerCase());
      });
    case SORT.FIRST_NAME:
      return arr.sort((a, b) => {
        return a.basicInfo.firstName
          ?.toLocaleLowerCase()
          .localeCompare(b.basicInfo.firstName?.toLocaleLowerCase());
      });
    case SORT.STATUS:
      // eslint-disable-next-line no-case-declarations
      const priority = Reflect.ownKeys(APPLICATION_STATUS);
      return arr.sort((a, b) => {
        return (
          priority.indexOf(a.status?.applicationStatus) -
          priority.indexOf(b.status?.applicationStatus)
        );
      });
    case SORT.SCORE:
      return arr.sort(
        (a, b) => (a.score?.totalScore ?? 0) - (b.score?.totalScore ?? 0)
      );
    default:
    case SORT.TIMESTAMP:
      return arr.sort((a, b) => {
        return a.submission?.lastUpdated - b.submission?.lastUpdated;
      });
  }
};

export default function Assessment({ hackathons }) {
  const [hackers, setHackers] = useState([]);

  // displayedHackers is what is displayed to users with search/filter/sort
  const [displayedHackers, setDisplayedHackers] = useState([]);

  const [selectedHacker, setSelectedHacker] = useState({});

  const [sortType, setSortType] = useState(SORT.TIMESTAMP);

  const [reverse, setReverse] = useState(false);

  const [search, setSearch] = useState('');

  // renders assignment if true, scoring if false
  const [isAdminView, setIsAdminView] = useState(false);

  // view all applicants in applicant list if true, assigned only if false
  const [isViewAllApplicants, setIsViewAllApplicants] = useState(false);

  useEffect(() => {
    getAllApplicants('nwHacks2021', setHackers);
  }, []);

  useEffect(() => {
    const escFunction = ({ keyCode }) => {
      if (keyCode === 27) {
        setSelectedHacker({});
      }
    };
    document.addEventListener('keyup', escFunction, false);
    return () => {
      document.removeEventListener('keyup', escFunction, false);
    };
  });

  useEffect(() => {
    let newHackers = sort(hackers, sortType);
    if (reverse) {
      newHackers = newHackers.reverse();
    }
    if (search !== '') {
      newHackers = newHackers.filter((hacker) => {
        const name = `${hacker.basicInfo.firstName?.toLocaleLowerCase()} ${hacker.basicInfo.lastName?.toLocaleLowerCase()}`;
        return (
          name.includes(search.toLocaleLowerCase()) ||
          hacker.basicInfo.email
            ?.toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        );
      });
    }
    setDisplayedHackers([...newHackers]);
  }, [hackers, sortType, search, reverse]);

  useEffect(() => {
    if (!selectedHacker) return;
    const hackerId = selectedHacker._id;
    const newHacker = hackers.find((h) => h._id === hackerId);
    if (newHacker) setSelectedHacker(newHacker);
  }, [hackers, selectedHacker]);

  return (
    <div>
      {hackers && (
        <>
          <Page hackathons={hackathons} currentPath="assessment">
            <ToggleBarContainer>
              <ToggleButton leftText="Admin" rightText="Personal" isLeftSelected={isAdminView} setIsLeftSelected={setIsAdminView} />
              <ToggleButton leftText="View All" rightText="Assigned Only" isLeftSelected={isViewAllApplicants} setIsLeftSelected={setIsViewAllApplicants} />
            </ToggleBarContainer>
            {isViewAllApplicants ? <span>view all applicants place holder <br /> </span> : <span>view assigned only place holder <br /> </span>}
            {/* conditionally render the assignment and scoring pages here based on isAdminView */}
            {isAdminView ? <span>Assignment page placeholder</span> : <span>Scoring page placeholder</span>}
            <ToolBar
                  search={setSearch}
                  reverse={setReverse}
                  sort={setSortType}
                  reversed={reverse}
                />
                <Table
                  displayedHackers={displayedHackers}
                  selectedHacker={selectedHacker}
                  setSelectedHacker={setSelectedHacker}
                />                
          </Page>
        </>
      )}
    </div>
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

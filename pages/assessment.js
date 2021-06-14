import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import Page from '../components/page';
import Table from '../components/Assessment/Table';
import ToolBar from '../components/Assessment/toolbar';
import { APPLICATION_STATUS, SORT } from '../constants';
import { getAllApplicants, getHackathons } from '../utility/firebase';

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

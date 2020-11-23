import React, { useEffect, useState } from 'react';
import Page from '../../components/page';
import {
  getActiveHackathon,
  getHackathons,
  getLivesiteQuicklinks,
} from '../../utility/firebase';
import { LIVESITE_NAVBAR } from '../../constants';

export default ({ hackathons }) => {
  const [activeHackathon, setActiveHackathon] = useState('');
  const [quicklinks, setQuicklinks] = useState([]);

  useEffect(() => {
    (async () => {
      setActiveHackathon(await getActiveHackathon);
    })();
  });

  useEffect(() => {
    if (activeHackathon) {
      (async () => {
        await getLivesiteQuicklinks(activeHackathon, (data) => {
          setQuicklinks(data);
        });
      })();
    }
  }, [activeHackathon, setQuicklinks]);
  console.log(quicklinks)
  return (
    <Page
      currentPath="Livesite"
      hackathons={hackathons}
      navbarItems={LIVESITE_NAVBAR}
    >
      {Object.values(quicklinks).map((quicklink) => {
        return <p>{quicklink.label}</p>;
      })}
    </Page>
  );
};

export const getStaticProps = async () => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
    },
  };
};

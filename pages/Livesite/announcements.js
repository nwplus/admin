import React, { useState, useEffect } from 'react';
import Page from '../../components/page';
import {
  getActiveHackathon,
  getHackathons,
  subscribeToLivesiteAnnouncements,
} from '../../utility/firebase';
import { LIVESITE_NAVBAR } from '../../constants';

export default ({ hackathons }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [activeHackathon, setActiveHackathon] = useState('');

  const getAsyncData = async () => {
    setActiveHackathon(await getActiveHackathon);
  };

  useEffect(() => {
    getAsyncData();
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (activeHackathon) {
      return subscribeToLivesiteAnnouncements(activeHackathon, (data) => {
        setAnnouncements(data);
      });
    }
  }, [activeHackathon, setAnnouncements]);

  return (
    <Page
      currentPath="Livesite"
      hackathons={hackathons}
      navbarItems={LIVESITE_NAVBAR}
    >
      {announcements.map((announcement) => (
        <p key={announcement.timestamp}>{announcement.content}</p>
      ))}
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

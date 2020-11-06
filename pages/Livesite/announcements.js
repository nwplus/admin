/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import AnnouncementsCard from '../../components/announcementsCard';
import Modal from '../../components/modal';
import TextBox from '../../components/textbox';
import Page from '../../components/page';
import {
  getActiveHackathon,
  getHackathons,
  updateAnnouncement,
  deleteAnnouncement,
  subscribeToLivesiteAnnouncements,
} from '../../utility/firebase';
import { EDIT, NEW, LIVESITE_NAVBAR } from '../../constants';
import { useAuth } from '../../utility/auth';

const StyledTextBox = styled(TextBox)`
  margin-bottom: 12px;
`;

const Markdown = ({ content }) => (
  <ReactMarkdown
    linkTarget="_blank"
    allowedTypes={[
      'text',
      'paragraph',
      'strong',
      'emphasis',
      'link',
      'break',
      'list',
      'listItem',
    ]}
  >
    {content}
  </ReactMarkdown>
);

const announcementDateFormat = (timestamp) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(timestamp).toLocaleDateString('en-US', options);
};

export default ({ hackathons }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [activeHackathon, setActiveHackathon] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState('');
  const [currentAnnouncement, setCurrentAnnouncement] = useState({});
  const { email: user } = useAuth().user;

  useEffect(() => {
    (async () => {
      setActiveHackathon(await getActiveHackathon);
      setIsLoading(false);
    })();
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (activeHackathon) {
      return subscribeToLivesiteAnnouncements(activeHackathon, (data) => {
        setAnnouncements(data);
      });
    }
  }, [activeHackathon, setAnnouncements]);

  const handleNew = () => {
    setCurrentAnnouncement({ editor: user });
    setActiveModal(NEW);
  };

  const handleDelete = (key) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure? This cannot be undone')) {
      deleteAnnouncement(activeHackathon, key);
    }
  };

  const handleEdit = (key) => {
    setCurrentAnnouncement({ ...announcements[key], editor: user, id: key });
    setActiveModal(EDIT);
  };

  const handleCloseModal = () => {
    if (currentAnnouncement.content) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure? You will lose all progress')) {
        setActiveModal('');
      }
    } else {
      setActiveModal('');
    }
  };

  const handleSave = () => {
    updateAnnouncement(activeHackathon, currentAnnouncement);
    setActiveModal('');
  };

  const changeCurrentAnnouncement = (content) => {
    setCurrentAnnouncement({ ...currentAnnouncement, content });
  };

  return (
    <Page
      currentPath="Livesite"
      hackathons={hackathons}
      navbarItems={LIVESITE_NAVBAR}
    >
      <AnnouncementsCard
        isLoading={isLoading}
        announcements={announcements}
        handleNew={handleNew}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <Modal
        isOpen={activeModal === EDIT}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        modalAction={EDIT}
      >
        <div>
          <strong>Announcement Content</strong>
          <StyledTextBox
            defaultValue={currentAnnouncement.content}
            modalAction={EDIT}
            onChange={(event) => changeCurrentAnnouncement(event.target.value)}
          />
          <strong>Preview:</strong>
          <Markdown content={currentAnnouncement.content} />
          <p>
            {moment(currentAnnouncement.timestamp).fromNow()} @{' '}
            {announcementDateFormat(currentAnnouncement.timestamp)}
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === NEW}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        modalAction={NEW}
      >
        <div>
          <strong>Announcement Content</strong>
          <StyledTextBox
            defaultValue={currentAnnouncement.content}
            modalAction={NEW}
            onChange={(event) => changeCurrentAnnouncement(event.target.value)}
          />
          <strong>Preview:</strong>
          <Markdown content={currentAnnouncement.content} />
          <p>just now @ {announcementDateFormat(Date.now())}</p>
        </div>
      </Modal>
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

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';
import ReactMarkdown from 'react-markdown';
import AnnouncementsCard from '../../components/announcementsCard';
import Modal from '../../components/modal';
import TextBox from '../../components/textbox';
import Page from '../../components/page';
import {
  formatDate,
  getActiveHackathon,
  getHackathons,
  subscribeToLivesiteAnnouncements,
} from '../../utility/firebase';
import { EDIT, LIVESITE_NAVBAR } from '../../constants';

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

export default ({ hackathons }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [activeHackathon, setActiveHackathon] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editWindow, showEditWindow] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState({});

  const getAsyncData = async () => {
    setActiveHackathon(await getActiveHackathon);
    setIsLoading(false);
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

  const handleNew = () => {
    // TODO
  };

  const handleView = () => {
    // TODO
  };

  const handleDelete = () => {
    // TODO
  };

  const handleEdit = (key) => {
    setCurrentAnnouncement(announcements[key]);
    showEditWindow(true);
  };

  const handleCloseModal = () => {
    showEditWindow(false);
  };

  const handleSave = () => {
    showEditWindow(false);
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
        handleView={handleView}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      <Modal
        isOpen={editWindow}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        modalAction={EDIT}
        lastModified={`${formatDate(123)} by ${'user'}`}
      >
        <div>
          <strong>Announcement Content</strong>
          <TextBox
            defaultValue={currentAnnouncement.content}
            modalAction={EDIT}
            onChange={(event) => changeCurrentAnnouncement(event.target.value)}
          />
          <br />
          <br />
          <strong>Preview:</strong>
          <Markdown content={currentAnnouncement.content} />
        </div>
      </Modal>
      {Object.values(announcements).map((announcement) => {
        const timeAgo = format(announcement.timestamp);
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        };
        const date = new Date(announcement.timestamp).toLocaleDateString(
          'en-US',
          options
        );
        return (
          <>
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
              source={announcement.content}
            />
            <p>
              {timeAgo} @ {date}
            </p>
          </>
        );
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

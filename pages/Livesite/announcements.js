import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';
import ReactMarkdown from 'react-markdown';
import AnnouncementsCard from '../../components/announcementsCard';
import Modal, { ModalContent, ModalField } from '../../components/modal';
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
  const [isLoading, setIsLoading] = useState(true);

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

  const handleEdit = () => {
    // TODO
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

      {/* <Modal
        isOpen={showEditWindow}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        modalAction={modalAction}
        lastModified={`${formatDate(newobj.lastmod.seconds)} by ${user}`}
      >
        <ModalContent page={SPONSORSHIP}>
          <ModalField
            label="Sponsor Name"
            value={newobj.name}
            modalAction={modalAction}
            onChange={(event) => handleChange('name', event.target.value)}
          />

          <ModalField
            label="Link"
            value={newobj.link}
            modalAction={modalAction}
            onChange={(event) => handleChange('link', event.target.value)}
          />
        </ModalContent>
      </Modal> */}
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

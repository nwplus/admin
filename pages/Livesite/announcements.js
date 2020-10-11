import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';
import ReactMarkdown from 'react-markdown';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer,
  CardContainer,
  TableContainer,
} from '../../components/card';
import Modal, { ModalContent, ModalField } from '../../components/modal';
import Button from '../../components/button';
import Page from '../../components/page';
import {
  getActiveHackathon,
  getHackathons,
  subscribeToLivesiteAnnouncements,
} from '../../utility/firebase';
import {
  VIEW,
  NEW,
  EDIT,
  DELETE,
  COLOR,
  LIVESITE_NAVBAR,
} from '../../constants';

const Text = styled.p`
  padding-right: 12px;
  flex: 1;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${COLOR.BODY_TEXT};
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

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

  return (
    <Page
      currentPath="Livesite"
      hackathons={hackathons}
      navbarItems={LIVESITE_NAVBAR}
    >
      <Card>
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
          <CardButtonContainer>
            <Button type={NEW} onClick={handleNew}>
              New Announcement
            </Button>
          </CardButtonContainer>
        </CardHeader>

        <CardContent>
          <TableContainer>
            {isLoading && (
              <CardContainer padding="10px 28px"> Loading... </CardContainer>
            )}
            {!isLoading && (
              <CardContainer padding="10px 0px 10px 20px">
                <Text style={{ flex: '3 3 0' }}>
                  <strong>Announcement</strong>
                </Text>
                <Text>
                  <strong>Time</strong>
                </Text>
                <Text>
                  <strong>Actions</strong>
                </Text>
              </CardContainer>
            )}
            <div>
              {announcements.map((announcement) => (
                <CardContainer
                  key={announcement.timestamp}
                  padding="10px 0px 10px 20px"
                >
                  <Text style={{ flex: '3 3 0' }}>{announcement.content}</Text>
                  <Text>{format(announcement.timestamp)}</Text>
                  <Actions>
                    <Button
                      type={VIEW}
                      color={COLOR.TRANSPARENT}
                      onClick={() => handleView(key)}
                    />
                    <Button
                      type={EDIT}
                      color={COLOR.TRANSPARENT}
                      onClick={() => handleEdit(key)}
                    />
                    <Button
                      type={DELETE}
                      color={COLOR.TRANSPARENT}
                      onClick={() => handleDelete(key)}
                    />
                  </Actions>
                </CardContainer>
              ))}
            </div>
          </TableContainer>
        </CardContent>
      </Card>

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
      {announcements.map((announcement) => {
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

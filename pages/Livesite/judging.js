import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Page from '../../components/page';
import Input from '../../components/input';
import TextBox from '../../components/textbox';
import Card, {
  CardHeader,
  CardButtonContainer,
  CardTitle,
  CardContent,
} from '../../components/card';
import Modal from '../../components/modal';
import Button from '../../components/button';
import {
  createProject,
  getHackathons,
  getActiveHackathon,
} from '../../utility/firebase';
import { EDIT, NEW, LIVESITE_NAVBAR } from '../../constants';

const Label = styled.p`
  font-weight: bold;
  margin: 10px 0;
`;

export default ({ hackathons }) => {
  const [activeHackathon, setActiveHackathon] = useState('');
  const [activeModal, setActiveModal] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      setActiveHackathon(await getActiveHackathon);
    })();
  });

  const handleNew = () => {
    setData({
      description: '',
      devpostUrl: '',
      youtubeUrl: '',
      sponsorPrizes: '',
      teamMembers: '',
      teamMembersEmails: '',
      title: '',
    });
    setActiveModal(NEW);
  };

  const handleCloseModal = () => {
    // eslint-disable-next-line
    if (confirm('Are you sure? You will lose all progress')) {
      setActiveModal('');
    }
  };

  const handleSave = async () => {
    if (!Object.values(data).every((field) => !!field)) {
      // eslint-disable-next-line no-alert
      alert('All fields required');
    } else {
      const project = {
        acknowledged: true,
        countAssigned: 0,
        ...data,
      };
      project.sponsorPrizes = project.sponsorPrizes.split(',');
      project.teamMembers = project.teamMembers.split(',');
      project.teamMembersEmails = project.teamMembersEmails.split(',');
      // eslint-disable-next-line
      const confirmation = confirm(JSON.stringify(project, null, 4));
      if (confirmation) {
        await createProject(activeHackathon, project);
        setActiveModal('');
      }
    }
  };

  const handleChange = (field, e) => {
    setData({
      ...data,
      [field]: e.target.value,
    });
  };

  return (
    <Page
      currentPath="Livesite"
      hackathons={hackathons}
      navbarItems={LIVESITE_NAVBAR}
    >
      <Card>
        <CardHeader>
          <CardTitle>Livesite Judging</CardTitle>
          <p>Use this area to manually create a new project</p>
          <CardButtonContainer>
            <Button type={NEW} onClick={handleNew}>
              New Project
            </Button>
          </CardButtonContainer>
        </CardHeader>
        <CardContent>
          To view currently added projects go to{' '}
          <a href="https://portal.nwplus.io/judging/admin">portal admin</a>
        </CardContent>
      </Card>
      <Modal
        isOpen={activeModal === EDIT || activeModal === NEW}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        modalAction={activeModal}
      >
        <Label>Title</Label>
        <Input value={data.name} onChange={(e) => handleChange('title', e)} />
        <Label>Description</Label>
        <TextBox
          value={data.name}
          onChange={(e) => handleChange('description', e)}
        />
        <Label>Sponsor Prizes (Comma separated)</Label>
        <Input
          value={data.name}
          onChange={(e) => handleChange('sponsorPrizes', e)}
        />
        <Label>Devpost Url</Label>
        <Input
          value={data.name}
          onChange={(e) => handleChange('devpostUrl', e)}
        />
        <Label>Youtube Url</Label>
        <Input
          value={data.name}
          onChange={(e) => handleChange('youtubeUrl', e)}
        />
        <Label>Team Members (Comma separated)</Label>
        <Input
          value={data.name}
          onChange={(e) => handleChange('teamMembers', e)}
        />
        <Label>Team Emails (Comma separated)</Label>
        <Input
          value={data.name}
          onChange={(e) => handleChange('teamMembersEmails', e)}
        />
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

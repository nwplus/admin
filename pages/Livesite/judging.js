import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Page from '../../components/page';
import Input from '../../components/input';
import TextBox from '../../components/textbox';
import Modal from '../../components/modal';
import {
  createProject,
  getHackathons,
  getActiveHackathon,
  subscribeToProjects,
  updateProject,
  deleteProject
} from '../../utility/firebase';
import { EDIT, NEW, LIVESITE_NAVBAR } from '../../constants';
import ProjectsCard from '../../components/projectsCard';

const Label = styled.p`
  font-weight: bold;
  margin: 10px 0;
`;

export default ({ hackathons }) => {
  const [activeHackathon, setActiveHackathon] = useState('');
  const [projects, setProjects] = useState({});
  const [activeModal, setActiveModal] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      setActiveHackathon(await getActiveHackathon);
    })();
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (activeHackathon) {
      return subscribeToProjects(activeHackathon, (p) => {
        setProjects(p);
      });
    }
  }, [activeHackathon, setProjects]);

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
    if (data.id) {
      updateProject(activeHackathon, data);
      setActiveModal('');
      return;
    }
    if (!Object.values(data).every((field) => !!field)) {
      // eslint-disable-next-line no-alert
      alert('All fields required');
    } else {
      const project = {
        acknowledged: true,
        countAssigned: 0,
        ...data,
      };
      project.sponsorPrizes = project.sponsorPrizes.split(', ');
      project.teamMembers = project.teamMembers.split(', ');
      project.teamMembersEmails = project.teamMembersEmails.split(', ');
      // eslint-disable-next-line
      const confirmation = confirm(JSON.stringify(project, null, 4));
      if (confirmation) {
        await createProject(activeHackathon, project);
        setActiveModal('');
      }
    }
  };

  const handleDelete = (key) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure? This cannot be undone')) {
      deleteProject(activeHackathon, key);
    }
  };

  const handleEdit = (key) => {
    setData({ ...projects[key], id: key });
    setActiveModal(EDIT);
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
      <ProjectsCard
        handleEdit={handleEdit}
        handleNew={handleNew}
        handleSave={handleSave}
        handleDelete={handleDelete}
        projects={projects}
      />
      <Modal
        isOpen={activeModal === EDIT || activeModal === NEW}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        modalAction={activeModal}
      >
        <Label>Title</Label>
        <Input value={data.title} onChange={(e) => handleChange('title', e)} />
        <Label>Description</Label>
        <TextBox
          defaultValue={data.description}
          onChange={(e) => handleChange('description', e)}
        />
        <Label>Sponsor Prizes (Comma separated)</Label>
        <Input
          value={data.sponsorPrizes}
          onChange={(e) => handleChange('sponsorPrizes', e)}
        />
        <Label>Devpost Url</Label>
        <Input
          value={data.devpostUrl}
          onChange={(e) => handleChange('devpostUrl', e)}
        />
        <Label>Youtube Url</Label>
        <Input
          value={data.youtubeUrl}
          onChange={(e) => handleChange('youtubeUrl', e)}
        />
        <Label>Team Members (Comma separated)</Label>
        <Input
          value={data.teamMembers}
          onChange={(e) => handleChange('teamMembers', e)}
        />
        <Label>Team Emails (Comma separated)</Label>
        <Input
          value={data.teamMembersEmails}
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

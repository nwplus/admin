import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Page from '../../components/page';
import Input from '../../components/input';
import Card, {
  CardHeader,
  CardButtonContainer,
  CardTitle,
  CardContent,
  CardContentButtonContainer,
  CancelButton,
} from '../../components/card';
import Modal from '../../components/modal';
import FeatureFlag from '../../components/FeatureFlag';
// import { UploadContainer } from '../../components/modal';
import Button from '../../components/button';
import {
  formatDate,
  getTimestamp,
  getHackathons,
  subscribeToLivesiteData,
  updateLivesiteData,
  uploadLivesiteLogoToStorage,
} from '../../utility/firebase';
import { useAuth } from '../../utility/auth';
import { EDIT, NEW, LIVESITE_NAVBAR } from '../../constants';

const Label = styled.p`
  font-weight: bold;
  margin: 10px 0;
`;

const Group = styled.div`
  margin: 32px 0;
  &:nth-child(1) {
    margin-top: 0;
  }
`;

export default ({ hackathons }) => {
  const [livesiteData, setLivesiteData] = useState({});
  const [activeModal, setActiveModal] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    const unsubscribe = subscribeToLivesiteData(setLivesiteData);
    return unsubscribe;
  }, []);

  const handleDelete = async (key) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure? This cannot be undone')) {
    //   await deleteQuicklink(activeHackathon, key);
    }
  };

  const handleEdit = (key) => {
    // setCurrentQuicklink({ ...quicklinks[key], editor: user, id: key });
    setActiveModal(EDIT);
  };

  const handleCloseModal = () => {
    if (data.content) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure? You will lose all progress')) {
        setActiveModal('');
      }
    } else {
      setActiveModal('');
    }
  };

  const handleSave = async () => {
    // await updateQuicklink(activeHackathon, currentQuicklink);
    setActiveModal('');
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
            <Button type={NEW} onClick={() => setActiveModal(NEW)}>
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
        hi There
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

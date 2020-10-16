import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Page from '../../components/page';
import Card, {
  CardHeader,
  CardButtonContainer,
  CardTitle,
  CardContent,
  CardContentButtonContainer,
  CancelButton,
} from '../../components/card';
import { UploadContainer } from '../../components/modal';
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
import { LIVESITE_NAVBAR, EDIT } from '../../constants';

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
  const inputFile = React.createRef();
  const [livesiteData, setLivesiteData] = useState({});
  const [isEditing, setisEditing] = useState(false);
  const [imgFile, setImgFile] = useState();
  const [fileUpload] = useState({});
  const { email: user } = useAuth().user;

  // MODAL SUBMIT BUTTON CLICKED (NEW + EDIT)
  const handleSave = async () => {
    // 1. uploads to firebase
    // newobj.imgURL is a file object
    if (imgFile) {
      const url = await uploadLivesiteLogoToStorage(imgFile);
      setLivesiteData({
        ...livesiteData,
        lastEdited: getTimestamp(),
        lastEditedBy: user,
        imgUrl: url,
      });
      updateLivesiteData({
        ...livesiteData,
        lastEdited: getTimestamp(),
        lastEditedBy: user,
        imgUrl: url,
      });
    } else {
      await updateLivesiteData({
        ...livesiteData,
        lastEdited: getTimestamp(),
        lastEditedBy: user,
      });
    }
    setisEditing(false);
  };

  const selectImageFile = (e) => {
    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
      fileUpload.imgName = e.target.files[0].name;
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeToLivesiteData(setLivesiteData);
    return unsubscribe;
  }, []);

  const HackathonChooser = () => (
    <select
      value={livesiteData.activeHackathon}
      onChange={(event) =>
        setLivesiteData({
          ...livesiteData,
          activeHackathon: event.target.value,
        })
      }
    >
      {hackathons.map((hackathon) => {
        return (
          <option key={hackathon} value={hackathon}>
            {hackathon}
          </option>
        );
      })}
    </select>
  );

  const DatePicker = ({ field }) => {
    const handleDateChange = (event) => {
      // State: Contains UTC ISO string of the date
      const momentDate = moment(event.target.value);
      setLivesiteData({ ...livesiteData, [field]: momentDate.toISOString() });
    };

    // View: Converts ISO UTC string to local date in format 2017-06-01T08:30
    const domStringDate = moment
      .utc(livesiteData[field])
      .local()
      .format('YYYY-MM-DDTHH:mm');
    return (
      <input
        type="datetime-local"
        value={domStringDate}
        onChange={(e) => handleDateChange(e)}
      />
    );
  };

  const LogoUpload = () => (
    <>
      <input
        type="file"
        id="file"
        ref={inputFile}
        accept="image/*"
        onChange={selectImageFile}
        style={{ display: 'none' }}
      />
      <UploadContainer
        type="text"
        value={fileUpload.imgName}
        onClick={() => inputFile.current.click()}
      />
    </>
  );

  const LocalDate = ({ date }) => {
    if (date) {
      return new Date(
        date.slice(0, -1).replace('T', ' ').replace('-', '/')
      ).toLocaleString();
    }
    return null;
  };

  return (
    <Page
      currentPath="Livesite"
      hackathons={hackathons}
      navbarItems={LIVESITE_NAVBAR}
    >
      <Card>
        <CardHeader>
          <CardTitle>Livesite Settings</CardTitle>
          <p>
            {`Last edited by ${livesiteData.lastEditedBy} at ${formatDate(
              livesiteData.lastEdited?.seconds
            )}`}
          </p>
          <CardButtonContainer>
            <Button type={EDIT} onClick={() => setisEditing(true)} />
          </CardButtonContainer>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <>
              <Group>
                <Label>Active Hackathon</Label>
                <HackathonChooser />
              </Group>
              <Group>
                <Label>{livesiteData.activeHackathon} Start Time</Label>
                <DatePicker field="hackathonStart" />
              </Group>
              <Group>
                <Label>{livesiteData.activeHackathon} End Time</Label>
                <DatePicker field="hackathonEnd" />
              </Group>
              <Group>
                <Label>Hacking Period Start Time</Label>
                <DatePicker field="hackingStart" />
              </Group>
              <Group>
                <Label>Hacking Period End Time</Label>
                <DatePicker field="hackingEnd" />
              </Group>
              <Group>
                <Label>Livesite Logo</Label>
                <LogoUpload />
              </Group>
              <CardContentButtonContainer>
                <CancelButton onClick={() => setisEditing(false)} />
                <Button onClick={() => handleSave()}>Save</Button>
              </CardContentButtonContainer>
            </>
          ) : (
            <>
              <Group>
                <Label>Active Hackathon</Label>
                {livesiteData.activeHackathon}
              </Group>
              <Group>
                <Label>{livesiteData.activeHackathon} Start Time</Label>
                <LocalDate date={livesiteData.hackathonStart} />
              </Group>
              <Group>
                <Label>{livesiteData.activeHackathon} End Time</Label>
                <LocalDate date={livesiteData.hackathonEnd} />
              </Group>
              <Group>
                <Label>Hacking Period Start Time</Label>
                <LocalDate date={livesiteData.hackingStart} />
              </Group>
              <Group>
                <Label>Hacking Period End Time</Label>
                <LocalDate date={livesiteData.hackingEnd} />
              </Group>
              <Group>
                <Label>Livesite Logo</Label>
                <img src={livesiteData.imgUrl} alt="logo" />
              </Group>
            </>
          )}
        </CardContent>
      </Card>
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

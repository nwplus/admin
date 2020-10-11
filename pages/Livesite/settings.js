import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
  getLivesiteData,
  updateLivesiteData,
  uploadLivesiteLogoToStorage,
} from '../../utility/firebase';
import { useAuth } from '../../utility/auth';
import { LIVESITE_NAVBAR, EDIT } from '../../constants';

const Label = styled.p`
  font-weight: bold;
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

  const getAsyncData = async () => {
    setLivesiteData(await getLivesiteData());
  };

  useEffect(() => {
    getAsyncData();
  }, []);
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
              livesiteData.lastEdited
            )}`}
          </p>
          <CardButtonContainer>
            <Button type={EDIT} onClick={() => setisEditing(true)} />
          </CardButtonContainer>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <>
              <Label>Active Hackathon</Label>
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
              <Label>Livesite Logo</Label>
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
              <CardContentButtonContainer>
                <CancelButton onClick={() => setisEditing(false)} />
                <Button onClick={() => handleSave()}>Save</Button>
              </CardContentButtonContainer>
            </>
          ) : (
            <>
              <Label>Active Hackathon</Label>
              {livesiteData.activeHackathon}
              <Label>Livesite Logo</Label>
              <img src={livesiteData.imgUrl} alt="logo" />
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

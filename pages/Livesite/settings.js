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
import { ModalField, UploadContainer } from '../../components/modal';
import Button from '../../components/button';
import {
  formatDate,
  getHackathons,
  getLivesiteData,
  updateLivesiteData,
  uploadLivesiteLogoToStorage,
} from '../../utility/firebase';
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

  console.log(livesiteData);

  // MODAL SUBMIT BUTTON CLICKED (NEW + EDIT)
  const handleSave = async () => {
    setisEditing(false);
    // 1. uploads to firebase
    // newobj.imgURL is a file object
    if (imgFile) {
      const url = await uploadLivesiteLogoToStorage(imgFile);
      setLivesiteData({
        ...livesiteData,
        imgUrl: url,
      });
      updateLivesiteData({
        ...livesiteData,
        imgUrl: url,
      });
    } else {
      updateLivesiteData(livesiteData);
    }
  };

  const selectImageFile = (e) => {
    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
      fileUpload.imgName = e.target.files[0].name;
    }
  };

  const asyncGetLivesiteData = async () => {
    const data = await getLivesiteData();
    setLivesiteData(data);
  };

  useEffect(() => {
    asyncGetLivesiteData();
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
          <p>{`Last edited by ${"asd"} at ${formatDate(123)}`}</p>
          <CardButtonContainer>
            <Button type={EDIT} onClick={() => setisEditing(true)} />
          </CardButtonContainer>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <>
              <ModalField
                label="Active Hackathon ID"
                modalAction={EDIT}
                value={livesiteData.activeHackathon}
                onChange={(event) =>
                  setLivesiteData({
                    ...livesiteData,
                    activeHackathon: event.target.value,
                  })
                }
              />
              <input
                type="file"
                id="file"
                ref={inputFile}
                accept="image/*"
                onChange={selectImageFile}
                style={{ display: 'none' }}
              />
              <Label>Livesite Logo</Label>
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
              <Label>Active Hackathon ID</Label>
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

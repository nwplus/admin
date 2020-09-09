import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer,
  CardDiv,
  TableDiv,
} from '../components/card';
import Button from '../components/button';
import { EDIT, NEW, VIEW, DELETE, COLOR, SPONSORSHIP } from '../constants';
import fireDb from '../utility/firebase';
import Modal, {
  Label,
  ModalContent,
  ModalField,
  LogoImage,
  UploadContainer,
} from '../components/modal';

// TODO: move font family higher, reduce need to redefine

const Text = styled.text`
  padding-right: 80px;
  flex: 1;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Actions = styled.div`
  padding-right: 80px;
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

export default function SponsorshipPage(props) {
  const inputFile = React.createRef();

  const [sponsors, setSponsors] = useState({});

  const [newobj, setnewobj] = useState({
    name: '',
    link: '',
    imgURL: '',
    lastmod: '',
    tier: '',
  });
  const [imgObject, setimgObject] = useState({});
  const [imgFile, setimgFile] = useState({});
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [modalAction, setmodalAction] = useState({});

  const loadFirebase = async () => {
    const data = await fireDb.getSponsors(props.name);
    setSponsors(data);
  };

  useEffect(() => {
    loadFirebase();
  }, []);

  const handleEdit = async (id) => {
    setnewobj({
      name: sponsors[id].name,
      link: sponsors[id].link,
      imgURL: sponsors[id].imgURL,
      lastmod: sponsors[id].lastmod,
      tier: sponsors[id].tier,
    });

    const img = await fireDb.getImageFilebyName(
      props.name,
      sponsors[id].imgURL
    );
    setShowEditWindow(true);
    setmodalAction(EDIT);
    setimgObject(img);
  };

  const handleView = async (id) => {
    setnewobj({
      name: sponsors[id].name,
      link: sponsors[id].link,
      imgURL: sponsors[id].imgURL,
      lastmod: sponsors[id].lastmod,
      tier: sponsors[id].tier,
    });
    // TODO
    const img = await fireDb.getImageFilebyName(
      props.name,
      sponsors[id].imgURL
    );
    setimgObject(img);
    setShowEditWindow(true);
    setmodalAction(VIEW);
  };

  const handleNew = () => {
    setnewobj({
      name: '',
      link: '',
      imgURL: '',
      lastmod: '',
      tier: '',
    });
    setShowEditWindow(true);
    setimgFile({});
    setimgObject({});
    setmodalAction(NEW);
  };

  const handleDelete = (id) => {
    fireDb.deleteSponsor(props.name, id);
    fireDb.deleteSponsorImagefromStorage(props.name, sponsors[id].imgURL);
    setSponsors(
      Object.values(sponsors).filter((sponsor) => sponsor.name !== id)
    );
  };

  const handleChange = (property, value) => {
    const d = new Date();
    setnewobj({
      ...newobj,
      [property]: value,
      lastmod: d.toLocaleString(),
    });
  };

  const handleCloseModal = () => {
    setShowEditWindow(false);
  };

  // MODAL SUBMIT BUTTON CLICKED (NEW + EDIT)
  const handleSave = (event) => {
    event.preventDefault(); // prevents page reload

    // 1. uploads to firebase
    // newobj.imgURL is a file object
    fireDb.setSponsor(props.name, newobj);
    fireDb.uploadSponsorImageToStorage(props.name, imgFile);

    // 2. renders on CMS
    setSponsors((oldSponsors) => ({
      [`${newobj.name}`]: newobj,
      ...oldSponsors,
    }));

    // 3. refreshes form
    setnewobj({
      name: '',
      link: '',
      imgURL: '',
      lastmod: '',
      tier: '',
    });

    setShowEditWindow(false);
    setimgFile({});
    setimgObject({});
  };

  // clicks the invisible <input type='file />
  const fileClick = () => {
    inputFile.current.click();
  };

  const selectImageFile = (e) => {
    if (e.target.files[0]) {
      setnewobj({
        ...newobj,
        imgURL: e.target.files[0].name,
      });
      setimgObject(URL.createObjectURL(e.target.files[0]));
      setimgFile(e.target.files[0]);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> Sponsors: {props.name} </CardTitle>
          <CardButtonContainer>
            <Button type={NEW} onClick={handleNew}>
              New Sponsor
            </Button>
          </CardButtonContainer>
        </CardHeader>

        <CardContent>
          <TableDiv>
            <CardDiv padding="22px 28px">
              <Text>Sponsor Name</Text>
              <Text>Link</Text>
              <Text>Logo Image File</Text>
              <Text>Tier</Text>
              <Text>Last Modified</Text>
              <Text>Actions</Text>
            </CardDiv>

            <div>
              {Object.values(sponsors).map((item) => (
                <CardDiv key={item.name} padding="10px 28px">
                  <Text>{item.name}</Text>
                  <Text>{item.link}</Text>
                  <Text>{item.imgURL}</Text>
                  <Text>{item.tier}</Text>
                  <Text>{item.lastmod}</Text>
                  <Actions>
                    <Button
                      type={DELETE}
                      color={COLOR.TRANSPARENT}
                      onClick={() => handleDelete(item.name)}
                    />
                    <Button
                      type={VIEW}
                      color={COLOR.TRANSPARENT}
                      onClick={() => handleView(item.name)}
                    />
                    <Button
                      type={EDIT}
                      color={COLOR.TRANSPARENT}
                      onClick={() => handleEdit(item.name)}
                    />
                  </Actions>
                </CardDiv>
              ))}
            </div>
          </TableDiv>
        </CardContent>
      </Card>

      <Modal
        isOpen={showEditWindow}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        modalAction={modalAction}
        lastModified={newobj.lastmod}
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

          <LogoImage>
            <img src={imgObject} width="100%" alt={newobj.imgURL} />
          </LogoImage>

          <div>

          <Label>Tier</Label>

          <select
            value={newobj.tier}
            onChange={(event) => handleChange('tier', event.target.value)}
          >
            <option default value="Inkind">
              {' '}
              In-kind{' '}
            </option>
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum/Title Sponsor">
              Platinum / Title Sponsor
            </option>
          </select>
          
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
            value={newobj.imgURL}
            onClick={fileClick}
          />
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

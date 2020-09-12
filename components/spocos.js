import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer,
  CardContainer,
  TableContainer,
} from './card';
import Button from './button';
import { EDIT, NEW, VIEW, DELETE, COLOR, SPONSORSHIP } from '../constants';
import {
  getSponsors,
  deleteSponsorImagefromStorage,
  deleteSponsor,
  updateSponsor,
  uploadSponsorImageToStorage,
} from '../utility/firebase';
import { useAuth } from '../utility/auth';
import Modal, {
  Label,
  ModalContent,
  ModalField,
  LogoImage,
  UploadContainer,
} from './modal';

// TODO: move font family higher, reduce need to redefine

const Text = styled.p`
  padding-right: 40px;
  flex: 1;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${COLOR.BODY_TEXT}
`;
const Actions = styled.div`
  padding-right: 20px;
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

export default function SponsorshipPage({name}) {
  const inputFile = React.createRef();

  const [sponsors, setSponsors] = useState({});

  const [newobj, setnewobj] = useState({
    name: '',
    link: '',
    imgURL: '',
    imgName: '',
    lastmod: '',
    lastmodBy: '',
    tier: '',
  });
  const [imgObject, setimgObject] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [showItems, setShowItems]= useState(false);
  const [imgFile, setimgFile] = useState(null);
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [modalAction, setmodalAction] = useState({});
  const { email: user } = useAuth().user;

  const loadFirebase = async () => {
    const data = await getSponsors(name);
    setSponsors(data);
    if (Object.keys(data).length >= 1) {
      setShowItems(true);
    }
    console.log(data);
  };

  useEffect(() => {
    const initializeFirebase = async () => {
      await loadFirebase();
      setLoading(false);
    };

    initializeFirebase();
  }, []);

  const handleEdit = async (id) => {
    setnewobj({
      name: sponsors[id].name,
      link: sponsors[id].link,
      imgURL: sponsors[id].imgURL,
      imgName: sponsors[id].imgName,
      lastmod: sponsors[id].lastmod,
      lastmodBy: sponsors[id].lastmodBy,
      tier: sponsors[id].tier,
      id,
    });

    const img = sponsors[id].imgURL;
    setShowEditWindow(true);
    setmodalAction(EDIT);
    setimgObject(img);
  };

  const handleView = async (id) => {
    setnewobj({
      name: sponsors[id].name,
      link: sponsors[id].link,
      imgURL: sponsors[id].imgURL,
      imgName: sponsors[id].imgName,
      lastmod: sponsors[id].lastmod,
      lastmodBy: sponsors[id].lastmodBy,
      tier: sponsors[id].tier,
      id,
    });
    // TODO
    const img = sponsors[id].imgURL;
    setimgObject(img);
    setShowEditWindow(true);
    setmodalAction(VIEW);
  };

  const handleNew = () => {
    setnewobj({
      name: '',
      link: '',
      imgURL: '',
      imgName: '',
      lastmod: '',
      lastmodBy: '',
      tier: 'Inkind',
      id: '',
    });
    setShowEditWindow(true);
    setimgFile(null);
    setimgObject({});
    setmodalAction(NEW);
  };

  const handleDelete = async (id) => {
    if (sponsors[id].imgURL) {
      await deleteSponsorImagefromStorage(name, sponsors[id].imgName);
    }
    await deleteSponsor(name, id);
    setSponsors((oldSponsors) => {
      delete oldSponsors[id];
      return { ...oldSponsors };
    });
  };

  const handleChange = (property, value) => {
    const d = new Date();
    setnewobj({
      ...newobj,
      [property]: value,
      lastmod: d.toLocaleString(),
      lastmodBy: user,
    });
  };

  const handleCloseModal = () => {
    setShowEditWindow(false);
    setimgFile(null);
    setimgObject({});
  };

  // MODAL SUBMIT BUTTON CLICKED (NEW + EDIT)
  const handleSave = async (event) => {
    event.preventDefault(); // prevents page reload

    setShowEditWindow(false); // hides edit to prevent clicking submit twice

    // 1. uploads to firebase
    // newobj.imgURL is a file object
    if (imgFile) {
      const url = await uploadSponsorImageToStorage(name, imgFile);
      newobj.imgURL = url;
      newobj.imgName = imgFile.name;
    }
    const id = await updateSponsor(name, newobj);
    // 2. renders on CMS
    setSponsors((oldSponsors) => {
      return {
        ...oldSponsors,
        [id]: newobj,
      };
    });

    // 3. refreshes form
    setnewobj({
      name: '',
      link: '',
      imgURL: '',
      imgName: '',
      lastmod: '',
      lastmodBy: '',
      tier: 'Inkind',
    });

    setimgFile(null);
    setimgObject({});
    setShowItems(true);
  };

  // clicks the invisible <input type='file />
  const fileClick = () => {
    inputFile.current.click();
  };

  const selectImageFile = (e) => {
    if (e.target.files[0]) {
      setimgObject(URL.createObjectURL(e.target.files[0]));
      setimgFile(e.target.files[0]);
      newobj.imgName = e.target.files[0].name;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> Sponsors: {name} </CardTitle>
          <CardButtonContainer>
            <Button type={NEW} onClick={handleNew}>
              New Sponsor
            </Button>
          </CardButtonContainer>
        </CardHeader>

        <CardContent>
          <TableContainer >
            {isLoading && <CardContainer padding="10px 28px"> Loading... </CardContainer>}
            {!isLoading && showItems && <CardContainer padding="22px 28px">
              <Text>Sponsor Name</Text>
              <Text>Link</Text>
              <Text>Logo Image File</Text>
              <Text>Tier</Text>
              <Text>Last Modified</Text>
              <Actions>Actions</Actions>
            </CardContainer>}
            {!isLoading && !showItems && <CardContainer padding='22px 28px'>
              No sponsorships for {name} :(
            </CardContainer>}
           
            <div>
              {Object.entries(sponsors).map(([key, item]) => (
                <CardContainer key={key} padding="10px 28px">
                  <Text>{item.name}</Text>
                  <Text>{item.link}</Text>
                  <Text>{item.imgName}</Text>
                  <Text>{item.tier}</Text>
                  <Text>
                    {item.lastmod} by {item.lastmodBy}
                  </Text>
                  <Actions>
                    <Button
                      type={DELETE}
                      color={COLOR.TRANSPARENT}
                      onClick={() => handleDelete(key)}
                    />
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
                  </Actions>
                </CardContainer>
              ))}
            </div>
          </TableContainer>
        </CardContent> 
      </Card>

      <Modal
        isOpen={showEditWindow}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        modalAction={modalAction}
        lastModified={`${newobj.lastmod} by ${newobj.lastmodBy}`}
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
              disabled={modalAction === VIEW}
              onChange={(event) => handleChange('tier', event.target.value)}
            >
              <option default value="Inkind">
                In-kind
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
              disabled={modalAction === VIEW}
              style={{ display: 'none' }}
            />

            <UploadContainer
              type="text"
              value={newobj.imgName}
              onClick={fileClick}
              disabled={modalAction === VIEW}
            />
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

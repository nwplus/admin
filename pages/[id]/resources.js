import { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import Page from '../../components/page';
import Button from '../../components/button';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer,
} from '../../components/card';
import Checkbox from '../../components/checkbox';
import {
  TableWrapper,
  TableContent,
  TableRow,
  TableHeader,
  TableData,
  ActionsButtonContainer,
} from '../../components/table';
import Modal, {
  Label,
  ModalContent,
  ModalField,
  LogoImage,
  UploadContainer,
} from '../../components/modal';
import { getHackathonPaths, getHackathons } from '../../utility/firebase';
import { EDIT, NEW, DELETE, COLOR, HACKATHON_NAVBAR } from '../../constants';

const resourceCards = [
  {
    id: 'docid',
    title: 'title',
    imageUrl: 'https://imageUrl.com',
    resourceUrl: 'https://resourceUrl.com',
    event: 'event',
    year: 1970,
    isOurPick: true,
    type: 'Github',
  },
  {
    id: 'docid2',
    title: 'title2',
    imageUrl: 'imageUrl2',
    resourceUrl: 'resourceUrl2',
    event: 'event2',
    year: 1970,
    isOurPick: true,
    type: 'Articles',
  },
];

export default function Resources({ id, hackathons }) {
  const [resourceToEdit, setResourceToEdit] = useState(false);
  const [resources, setResources] = useState(resourceCards);

  const addNewResourceCard = () => {
    return;
  };

  const handleEdit = (r) => {
    setResourceToEdit(r);
  };

  const handleDelete = () => {
    return;
  };

  const finishUpdate = (id) => {
    setResources(id);
    return;
  };

  return (
    <Page
      currentPath={id}
      hackathons={hackathons}
      navbarItems={HACKATHON_NAVBAR}
    >
      {id === 'www' ? (
        <Card>
          <CardHeader>
            <CardTitle> Resources </CardTitle>
            <CardButtonContainer>
              <Button type={NEW} onClick={addNewResourceCard}>
                New resource card
              </Button>
            </CardButtonContainer>
          </CardHeader>
          <CardContent>
            <TableWrapper>
              <TableContent>
                <CustomTableHeader />
                <tbody>
                  {resources.map((r) => (
                    <ResourceRow
                      key={r.id}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      {...r}
                    />
                  ))}
                </tbody>
              </TableContent>
            </TableWrapper>
            <EditModal
              resourceToEdit={resourceToEdit}
              setResourceToEdit={setResourceToEdit}
              finishUpdate={finishUpdate}
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Not applicable for this website</CardTitle>
          </CardHeader>
        </Card>
      )}
    </Page>
  );
}

const EditModal = ({ resourceToEdit, setResourceToEdit, finishUpdate }) => {
  const [resource, setResource] = useState(resourceToEdit);
  const [imgObject, setImgObject] = useState({});
  const inputFile = createRef();

  const handleUpdate = () => {
    finishUpdate(resource);
  };

  const handleInput = (property, value) => {
    setResource({
      ...resource,
      [property]: value,
    });
  };

  // clicks the invisible <input type='file />
  const fileClick = () => {
    inputFile.current.click();
  };

  const selectImageFile = (e) => {
    if (e.target.files[0]) {
      setImgObject({
        object: URL.createObjectURL(e.target.files[0]),
        imgURL: e.target.files[0],
        imgName: e.target.files[0].name,
      });
    }
  };

  useEffect(() => {
    setResource(resourceToEdit);
  }, [resourceToEdit]);

  return (
    <Modal
      isOpen={Object.keys(resourceToEdit).length > 0}
      handleClose={() => setResourceToEdit({})}
      handleSave={() => handleUpdate()}
      modalAction={EDIT}
    >
      <ModalContent columns={1}>
        <ModalField
          label="Title"
          value={resource.title}
          modalAction={EDIT}
          onChange={(e) => {
            handleInput('title', e.target.value);
          }}
        />
      </ModalContent>

      <ModalContent columns={1}>
        <ModalField
          label="Resource Url"
          value={resource.resourceUrl}
          modalAction={EDIT}
          onChange={(e) => {
            handleInput('resourceUrl', e.target.value);
          }}
        />
      </ModalContent>

      <ModalContent columns={3}>
        <ModalField
          label="Event"
          value={resource.event}
          modalAction={EDIT}
          onChange={(e) => {
            handleInput('event', e.target.value);
          }}
        />
        <ModalField
          label="Year"
          value={resource.year}
          modalAction={EDIT}
          onChange={(e) => {
            handleInput('year', e.target.value);
          }}
        />
        <ModalField
          label="Type"
          value={resource.type}
          modalAction={EDIT}
          onChange={(e) => {
            handleInput('type', e.target.value);
          }}
        />
      </ModalContent>

      <ModalContent columns={1}>
        <Checkbox
          label="Our Pick?"
          id="our-pick-checkbox"
          checked={resource.isOurPick}
          onClick={() => {
            handleInput('isOurPick', !resource.isOurPick);
          }}
        />
      </ModalContent>
      <ModalContent columns={1}>
        <input
          type="file"
          id="file"
          ref={inputFile}
          accept="image/*"
          onChange={selectImageFile}
          style={{ display: 'none' }}
        />
        <LogoImage>
          <img
            src={imgObject.object}
            width="100%"
            height="100%"
            alt={imgObject.imgURL}
          />
        </LogoImage>
        <UploadContainer
          type="text"
          value={imgObject.imgName}
          onClick={fileClick}
          disabled
        />
      </ModalContent>
    </Modal>
  );
};

const CustomTableHeader = () => (
  <thead>
    <TableRow>
      <TableHeader>Title</TableHeader>
      <TableHeader>Image Url</TableHeader>
      <TableHeader>Resource Url</TableHeader>
      <TableHeader narrow>Event</TableHeader>
      <TableHeader narrow>Type</TableHeader>
      <TableHeader narrow>Year</TableHeader>
      <TableHeader narrow>Our pick?</TableHeader>
      <TableHeader>Actions</TableHeader>
    </TableRow>
  </thead>
);

const ResourceRow = ({ handleEdit, handleDelete, ...props }) => {
  return (
    <TableRow>
      <TableData>{props.title}</TableData>
      <TableData>{props.imageUrl}</TableData>
      <TableData>{props.resourceUrl}</TableData>
      <TableData>{props.event}</TableData>
      <TableData>{props.type}</TableData>
      <TableData>{props.year}</TableData>
      <TableData>{props.isOurPick.toString()}</TableData>
      <TableData actions>
        <ActionsButtonContainer>
          <Button
            type={EDIT}
            color={COLOR.TRANSPARENT}
            onClick={() => handleEdit(props)}
          />
        </ActionsButtonContainer>
        <ActionsButtonContainer>
          <Button
            type={DELETE}
            color={COLOR.TRANSPARENT}
            onClick={() => handleDelete(props.resourceUrl)}
          />
        </ActionsButtonContainer>
      </TableData>
    </TableRow>
  );
};

export const getStaticPaths = async () => {
  return getHackathonPaths();
};

export const getStaticProps = async ({ params }) => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
      id: params.id,
    },
  };
};

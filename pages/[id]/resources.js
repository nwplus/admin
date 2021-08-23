import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Page from '../../components/page';
import Button from '../../components/button';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer,
} from '../../components/card';
import {
  TableWrapper,
  TableContent,
  TableRow,
  TableHeader,
  TableData,
  ActionsButtonContainer,
} from '../../components/table';
import Modal, { Label, ModalContent, ModalField } from '../../components/modal';
import { getHackathonPaths, getHackathons } from '../../utility/firebase';
import { EDIT, NEW, DELETE, COLOR, HACKATHON_NAVBAR } from '../../constants';

const resourceCards = [
  {
    title: 'title',
    imageUrl: 'https://imageUrl.com',
    resourceUrl: 'https://resourceUrl.com',
    event: 'event',
    year: 1970,
    isOurPick: true,
    tags: ['tag1'],
  },
  {
    title: 'title2',
    imageUrl: 'imageUrl2',
    resourceUrl: 'resourceUrl2',
    event: 'event2',
    year: 1970,
    isOurPick: true,
    tags: ['tag2', 'tag3'],
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
                      key={r.resourceUrl}
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

const EditModal = ({ resourceToEdit, setResourceToEdit }) => {
  const handleUpdate = () => {
    return;
  };

  const handleInput = (property, value, event, setState) => {
    setState({
      ...event,
      [property]: value,
    });
  };

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
          value={resourceToEdit.title}
          modalAction={EDIT}
          onChange={(e) => {
            handleInput(
              'title',
              e.target.value,
              resourceToEdit,
              setResourceToEdit
            );
          }}
        />
      </ModalContent>
      <ModalContent columns={2}>
        <ModalField
          label="Resource Url"
          value={resourceToEdit.resourceUrl}
          modalAction={EDIT}
          onChange={(e) => {
            handleInput(
              'resourceUrl',
              e.target.value,
              resourceToEdit,
              setResourceToEdit
            );
          }}
        />
        <ModalField
          label="Image Url"
          value={resourceToEdit.imageUrl}
          modalAction={EDIT}
          onChange={(e) => {
            handleInput(
              'imageUrl',
              e.target.value,
              resourceToEdit,
              setResourceToEdit
            );
          }}
        />
      </ModalContent>
      <ModalContent columns={3}>
      <ModalField
          label="Event"
          value={resourceToEdit.event}
          modalAction={EDIT}
          onChange={(e) => {
            handleInput(
              'event',
              e.target.value,
              resourceToEdit,
              setResourceToEdit
            );
          }}
        />
        <ModalField
          label="Year"
          value={resourceToEdit.year}
          modalAction={EDIT}
          onChange={(e) => {
            handleInput(
              'year',
              e.target.value,
              resourceToEdit,
              setResourceToEdit
            );
          }}
        />
        <ModalField
          label="Our Pick?"
          value={resourceToEdit.isOurPick}
          modalAction={EDIT}
          onChange={(e) => {
            handleInput(
              'isOurPick',
              e.target.value,
              resourceToEdit,
              setResourceToEdit
            );
          }}
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
      <TableHeader>Event</TableHeader>
      <TableHeader narrow>Year</TableHeader>
      <TableHeader narrow>Our pick?</TableHeader>
      <TableHeader>Tags</TableHeader>
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
      <TableData>{props.year}</TableData>
      <TableData>{props.isOurPick.toString()}</TableData>
      <TableData>{props.tags.toString()}</TableData>
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

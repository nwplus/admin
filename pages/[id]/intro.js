import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Page from '../../components/page';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer,
  CardContentButtonContainer,
  CancelButton,
} from '../../components/card';
import { COLOR, EDIT, HACKATHON_NAVBAR } from '../../constants';
import Button from '../../components/button';
import TextBox from '../../components/textbox';
import {
  updateHackathonField,
  getHackathonSnapShot,
  getHackathonPaths,
  getHackathons,
  getTimestamp,
  formatDate,
} from '../../utility/firebase';
import { useAuth } from '../../utility/auth';

const HeaderText = styled.h2`
  margin: 0;
  border: none;
  overflow: hidden;
  background-color: ${COLOR.BACKGROUND};
  outline: none;
  padding-bottom: 13px;
  color: ${COLOR.TEXT};
  font-weight: 600;
`;

const ContentText = styled.p`
  border: none;
  overflow: hidden;
  background-color: ${COLOR.BACKGROUND};
  outline: none;
  color: ${COLOR.TEXT};
`;

const Label = styled.p`
  background-color: ${COLOR.BACKGROUND};
`;

const Container = styled.div`
  margin-bottom: 40px;
`;

export default ({ id, hackathons }) => {
  const [isEditingObj, setIsEditingObj] = useState({});
  const [websiteData, setWebsiteData] = useState({});
  const [editingData, setEditingData] = useState({});
  const { email: currUserName } = useAuth().user;
  // TODO need functionality to display data based on what event is currently being viewed

  // TODO need to substitute the value at .doc(ID) with current website
  const getHackathonData = async (doc) => {
    const data = doc.data().WebsiteData;
    setWebsiteData(data);

    let editingDataObj = {};
    let isEditing = {};
    if (data)
      Object.keys(data).forEach((type) => {
        isEditing = {
          ...isEditingObj,
          [type]: false,
        };
        editingDataObj = {
          ...editingDataObj,
          [type]: {
            header: data[type].header,
            content: data[type].content,
          },
        };
      });
    setIsEditingObj(isEditing);
    setEditingData(editingDataObj);
  };

  useEffect(() => {
    const unsubscribe = getHackathonSnapShot(id, getHackathonData);
    return () => unsubscribe();
  }, [window.location.pathname]);

  const handleEdit = (type) => {
    setIsEditingObj({
      ...isEditingObj,
      [type]: !isEditingObj[type],
    });
  };

  const handleCancel = (type) => {
    setIsEditingObj({
      ...isEditingObj,
      [type]: false,
    });
  };

  /**
   * @param {string} type every section in the intro has a type, which is the key in the map of WebsiteData
   * reads the value of the header/content associated with the given type and updates the object in Firebase
   */
  const handleSave = async (type) => {
    const time = getTimestamp();
    const { header, content } = editingData[type];
    const updateObj = {
      WebsiteData: {
        ...websiteData,
        [type]: {
          editor: currUserName,
          title: websiteData[type].title,
          header,
          content,
          time,
        },
      },
    };
    try {
      updateHackathonField(id, updateObj);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      // eslint-disable-next-line no-alert
      alert('An error occured while trying to update the text section');
    } finally {
      setIsEditingObj({
        ...isEditingObj,
        [type]: false,
      });
    }
  };

  const handleEditChange = (event, type, isHeader) => {
    const newVal = event.target.value;
    const updatedVal = isHeader
      ? { header: newVal, content: editingData[type].content }
      : { header: editingData[type].header, content: newVal };
    setEditingData({
      ...editingData,
      [type]: updatedVal,
    });
  };

  return (
    <Page
      currentPath={id}
      hackathons={hackathons}
      navbarItems={HACKATHON_NAVBAR}
    >
      {/* map over every text section in a hackathon's WebsiteData and adds the section name to isEditingObj state */}
      {websiteData ? (
        Object.keys(websiteData).map((type) => {
          return (
            <Card key={`card${type}`}>
              <Container>
                <CardHeader>
                  <CardTitle>{websiteData[type].title}</CardTitle>
                  <p>
                    {`Last edited by ${
                      websiteData[type].editor
                    } at ${formatDate(websiteData[type].time.seconds)}`}
                  </p>
                  <CardButtonContainer>
                    <Button type={EDIT} onClick={() => handleEdit(type)} />
                  </CardButtonContainer>
                </CardHeader>
                <CardContent>
                  {isEditingObj[type] ? (
                    <>
                      <Label>Header</Label>
                      <TextBox
                        defaultValue={editingData[type].header}
                        onChange={(event) => {
                          handleEditChange(event, type, true);
                        }}
                      />
                      <Label>Body</Label>
                      <TextBox
                        defaultValue={editingData[type].content}
                        resize
                        onChange={(event) => {
                          handleEditChange(event, type, false);
                        }}
                      />
                      <CardContentButtonContainer>
                        <CancelButton onClick={() => handleCancel(type)} />
                        <Button onClick={() => handleSave(type)}>Save</Button>
                      </CardContentButtonContainer>
                    </>
                  ) : (
                    <>
                      <HeaderText>{websiteData[type].header}</HeaderText>
                      <ContentText>{websiteData[type].content}</ContentText>
                    </>
                  )}
                </CardContent>
              </Container>
            </Card>
          );
        })
      ) : (
        <span>No intro options for this page</span>
      )}
    </Page>
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

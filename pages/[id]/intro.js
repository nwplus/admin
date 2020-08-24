import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Page from '../../components/page';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer
} from '../../components/card';
import { COLOR, EDIT } from '../../constants';
import Button from '../../components/button';
import TextBox from '../../components/textbox';
import {
  updateHackathonField,
  getHackathon,
  getHackathonPaths,
  getHackathons
} from '../../utility/firebase';

const HeaderText = styled.p`
  border: none;
  overflow: hidden;
  background-color: ${COLOR.BACKGROUND};
  outline: none;
  font-size: 24px;
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

const StyledCancel = styled.button`
  font-size: 16px;
  cursor: pointer;
  border-bottom: 2px solid ${COLOR.BLACK};
  margin-left: 675px;
  margin-right: 40px;
  border: none;
  outline: none;
  background-color: ${COLOR.BACKGROUND};
`;

const StyledHeader = styled.p`
  padding-bottom: 13px;
  padding-top: 17px;
  margin: 0px;
  background-color: ${COLOR.BACKGROUND};
`;

export default ({ id, hackathons }) => {
  const [isEditingObj, setIsEditingObj] = useState({});
  const [websiteData, setWebsiteData] = useState({});
  const [editingData, setEditingData] = useState({});
  const currUserName = 'SOME_HARD_CODED_USER';
  // TODO need functionality to display data based on what event is currently being viewed

  // TODO need to substitute the value at .doc(ID) with current website
  const getHackathonData = async () => {
    const doc = await getHackathon(id);
    const data = doc.data().WebsiteData;
    setWebsiteData(data);

    let editingDataObj = {};
    let isEditing = {};
    Object.keys(data).forEach(type => {
      isEditing = {
        ...isEditingObj,
        [type]: false
      };
      editingDataObj = {
        ...editingDataObj,
        [type]: {
          header: data[type].header,
          content: data[type].content
        }
      };
    });
    setIsEditingObj(isEditing);
    setEditingData(editingDataObj);
  };

  useEffect(() => {
    getHackathonData();
  }, []);

  const handleEdit = type => {
    setIsEditingObj({
      ...isEditingObj,
      [type]: !isEditingObj[type]
    });
  };

  const handleCancel = type => {
    setIsEditingObj({
      ...isEditingObj,
      [type]: false
    });
  };

  /**
   * @param {string} type every section in the intro has a type, which is the key in the map of WebsiteData
   * reads the value of the header/content associated with the given type and updates the object in Firebase
   */
  const handleSave = async type => {
    const time = new Date().getTime();
    const { header, content } = editingData[type];
    const updateObj = {
      WebsiteData: {
        ...websiteData,
        [type]: {
          editor: currUserName,
          title: websiteData[type].title,
          header,
          content,
          time
        }
      }
    };
    // TODO need to substitute the value at .doc(ID) with current website
    try {
      await updateHackathonField(id, updateObj);
      setWebsiteData({
        ...websiteData,
        [type]: {
          ...websiteData[type],
          header,
          content,
          time,
          editor: currUserName
        }
      });
    } catch (error) {
      console.error(error);
      alert('An error occured while trying to update the text section');
    } finally {
      setIsEditingObj({
        ...isEditingObj,
        [type]: false
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
      [type]: updatedVal
    });
  };

  // map over every text section in a hackathon's WebsiteData and adds the section name to isEditingObj state
  return (
    <Page currentPath={id} hackathons={hackathons}>
      <Card>
        <CardHeader>Intro</CardHeader>
        <CardContent>
          {Object.keys(websiteData).map(type => {
            return (
              <Card key={`card${type}`}>
                <CardHeader>
                  <CardTitle>{websiteData[type].title}</CardTitle>
                  <p>
                    {`Last edited by ${websiteData[type].editor} at ${new Date(
                      websiteData[type].time
                    ).toLocaleString()}`}
                  </p>
                  <CardButtonContainer>
                    <Button type={EDIT} onClick={() => handleEdit(type)} />
                  </CardButtonContainer>
                </CardHeader>
                <CardContent>
                  {isEditingObj[type] ? (
                    <div style={{ padding: '0px 40px 37px 40px' }}>
                      <StyledHeader>Header</StyledHeader>
                      <TextBox
                        defaultValue={editingData[type].header}
                        onChange={event => handleEditChange(event, type, true)}
                      />
                      <StyledHeader>Body</StyledHeader>
                      <TextBox
                        defaultValue={editingData[type].content}
                        resize
                        onChange={event => handleEditChange(event, type, false)}
                      />
                      <div
                        style={{
                          marginTop: '27px',
                          display: 'flex',
                          float: 'right'
                        }}
                      >
                        <StyledCancel onClick={() => handleCancel(type)}>
                          <p
                            style={{
                              borderBottom: `2px solid ${COLOR.BLACK}`,
                              margin: '0px'
                            }}
                          >
                            Cancel
                          </p>
                        </StyledCancel>
                        <Button onClick={() => handleSave(type)}>Save</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <HeaderText>{websiteData[type].header}</HeaderText>
                      <ContentText>{websiteData[type].content}</ContentText>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>
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
      id: params.id
    }
  };
};
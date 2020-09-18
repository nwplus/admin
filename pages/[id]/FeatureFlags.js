import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Page from '../../components/page';
import Card, {
  CardHeader,
  CardButtonContainer,
  CardTitle,
  CardContent,
} from '../../components/card';
import Button from '../../components/button';
import { COLOR, EDIT } from '../../constants';
import {
  getTimestamp,
  subscribeToFlags,
  formatDate,
  updateFlags,
  getHackathonPaths,
  getHackathons,
} from '../../utility/firebase';
import { useAuth } from '../../utility/auth';

const CancelText = styled.p`
  border-bottom: 2px solid ${COLOR.BLACK};
  margin: 0px;
`;

const CancelButton = styled.button`
  font-size: 16px;
  cursor: pointer;
  border-bottom: 2px solid ${COLOR.BLACK};
  margin-left: 675px;
  margin-right: 40px;
  border: none;
  outline: none;
  background-color: ${COLOR.BACKGROUND};
`;

const FeatureFlagsContainer = styled.div`
  display: flex;
  width: 40%;
  border: 2px solid lightgray;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
  background-color: #ededed;
`;

const FeatureFlagToggle = styled.input`
  width: 18px;
  height: 18px;
  margin-top: 10px;
`;

const FeatureFlagName = styled.p`
  font-weight: bold;
  font-size: 12px;
  margin: 15px;
`;

const FeatureFlagToggleContainer = styled.div`
  display: flex;
`;

export default function FeatureFlags({ id, hackathons }) {
  const [editing, setEditing] = useState(false);
  const [flags, setFlags] = useState({});
  const [editedFlags, setEditedFlags] = useState({});
  const { email: user } = useAuth().user;
  useEffect(() => {
    return subscribeToFlags(id, setFlags);
  }, [window.location.href]);

  useEffect(() => {
    if (!editing) {
      setEditedFlags({});
    }
  }, [editing]);

  const saveFlags = async () => {
    const updateObj = editedFlags;
    updateObj.lastEdited = getTimestamp();
    updateObj.lastEditedBy = user;
    await updateFlags(id, updateObj);
    setEditing(false);
  };

  const EditFlagsComponent = () => (
    <>
      {Object.entries(editedFlags).map(([key, value]) => {
        if (key === 'lastEdited' || key === 'lastEditedBy') {
          return null;
        }
        return (
          <FeatureFlagsContainer key={key}>
            <FeatureFlagName>{key}:</FeatureFlagName>
            <FeatureFlagToggleContainer>
              <FeatureFlagName>
                {value ? 'Activated' : 'Deactivated'}
              </FeatureFlagName>
              <FeatureFlagToggle
                type="checkbox"
                onChange={() => {
                  setEditedFlags({
                    ...editedFlags,
                    [key]: !value,
                  });
                }}
                checked={value}
              />
            </FeatureFlagToggleContainer>
          </FeatureFlagsContainer>
        );
      })}
      <CancelButton onClick={() => setEditing(false)}>
        <CancelText>Cancel</CancelText>
      </CancelButton>
      <Button onClick={() => saveFlags()}>Save</Button>
    </>
  );

  const ViewFlagsComponent = () => (
    <>
      {Object.entries(flags).map(([key, value]) => {
        if (key === 'lastEdited' || key === 'lastEditedBy') {
          return null;
        }
        return (
          <FeatureFlagsContainer key={key}>
            <FeatureFlagName>{key}:</FeatureFlagName>
            <FeatureFlagToggleContainer>
              <FeatureFlagName>
                {value ? 'Activated' : 'Deactivated'}
              </FeatureFlagName>

              <FeatureFlagToggle type="checkbox" disabled checked={value} />
            </FeatureFlagToggleContainer>
          </FeatureFlagsContainer>
        );
      })}
    </>
  );

  if (!flags) {
    return (
      <Page currentPath={id} hackathons={hackathons}>
        <Card>
          <CardHeader>
            <CardTitle>No Features Flags for {id}</CardTitle>
          </CardHeader>
        </Card>
      </Page>
    );
  }

  return (
    <Page currentPath={id} hackathons={hackathons}>
      <Card>
        <CardHeader>
          <CardTitle>Feature Flags for {id}</CardTitle>
          <p>{`Last edited by ${flags.lastEditedBy} at ${formatDate(
            flags.lastEdited?.seconds
          )}`}</p>
          <CardButtonContainer>
            <Button
              type={EDIT}
              onClick={() => {
                if (editing) {
                  setEditing(false);
                } else {
                  setEditedFlags(flags);
                  setEditing(true);
                }
              }}
            />
          </CardButtonContainer>
        </CardHeader>
        <CardContent>
          {editing ? <EditFlagsComponent /> : <ViewFlagsComponent />}
        </CardContent>
      </Card>
    </Page>
  );
}

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

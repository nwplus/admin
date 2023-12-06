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
import Input from '../../components/input';
import FeatureFlag from '../../components/FeatureFlag';
import { COLOR, EDIT, HACKATHON_NAVBAR } from '../../constants';
import {
  getTimestamp,
  subscribeToFlags,
  formatDate,
  updateFlags,
  subscribeToCtaLink,
  updateCtaLink,
  getHackathonPaths,
  getHackathons,
} from '../../utility/firebase';
import { useAuth } from '../../utility/auth';

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

const InlineButton = styled.span`
  display: inline;
  float: right;
  margin: 0 16px;
  padding-bottom: 32px;
`;

const InlineButtonContainer = styled.div`
  display: inline-block;
  float: right;
  margin-top: -40px;
`;
export default function FeatureFlags({ id, hackathons }) {
  const [editing, setEditing] = useState(false);
  const [flags, setFlags] = useState({});
  const [editedFlags, setEditedFlags] = useState({});
  // const [hiringSettings, setHiringSettings] = useState({});
  // const [editedHiringSettings, setEditedHiringSettings] = useState({});
  const [ctaLink, setCtaLink] = useState('');
  const { email: user } = useAuth().user;

  useEffect(() => {
    return subscribeToFlags(id, setFlags);
  }, [window.location.href]);

  useEffect(() => {
    return subscribeToCtaLink(setCtaLink);
  }, [window.location.href]);

  useEffect(() => {
    if (!editing) {
      setEditedFlags({});
    }
  }, [editing]);

  const saveInfo = async () => {
    await saveFlags()
    await saveCtaLink()
    setEditing(false);
  }

  const saveFlags = async () => {
    const updateObj = editedFlags;
    updateObj.lastEdited = getTimestamp();
    updateObj.lastEditedBy = user;
    await updateFlags(id, updateObj);
  };

  const saveCtaLink = async () => {
    await updateCtaLink(ctaLink)
  };

  const EditFlagsComponent = () => (
    <>
      <Label>CTA link</Label>
      <Input
        value={ctaLink}
        onChange={(e) => setCtaLink(e.target.value)}
      />
      {Object.entries(editedFlags).map(([key, value]) => {
        if (key === 'lastEdited' || key === 'lastEditedBy') {
          return null;
        }
        return (
          <FeatureFlag
            title={key}
            value={value}
            onChange={() => {
              setEditedFlags({
                ...editedFlags,
                [key]: !value,
              });
            }}
          />
        );
      })}
      <InlineButtonContainer>
        <InlineButton>
          <Button onClick={() => saveInfo()}>Save</Button>
        </InlineButton>
        <InlineButton>
          <Button
            onClick={() => setEditing(false)}
            color="linear-gradient(180deg, #FF4E4E 0%, #FFEBEB 289.71%)"
            contentColor={COLOR.WHITE}
          >
            Cancel
          </Button>
        </InlineButton>
      </InlineButtonContainer>
    </>
  );

  const ViewFlagsComponent = () => (
    <>
      <Group>
        <Label>CTA link</Label>
        {ctaLink}
      </Group>
      {Object.entries(flags).map(([key, value]) => {
        if (key === 'lastEdited' || key === 'lastEditedBy') {
          return null;
        }
        return <FeatureFlag disabled title={key} value={value} />;
      })}
    </>
  );

  if (!flags) {
    return (
      <Page
        currentPath={id}
        hackathons={hackathons}
        navbarItems={HACKATHON_NAVBAR}
      >
        <Card>
          <CardHeader>
            <CardTitle>No Feature Flags for {id}</CardTitle>
          </CardHeader>
        </Card>
      </Page>
    );
  }

  return (
    <Page
      currentPath={id}
      hackathons={hackathons}
      navbarItems={HACKATHON_NAVBAR}
    >
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

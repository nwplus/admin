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
  subscribeToHiringSettings,
  updateHiringSettings,
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
`;

const InlineButtonContainer = styled.div`
  display: inline-block;
  float: right;
  margin-top: 40px;
`;

export default function FeatureFlags({ id, hackathons }) {
  const [editing, setEditing] = useState(false);
  const [flags, setFlags] = useState({});
  const [editedFlags, setEditedFlags] = useState({});
  const [hiringSettings, setHiringSettings] = useState({});
  const [editedHiringSettings, setEditedHiringSettings] = useState({});
  const [ctaLink, setCtaLink] = useState('');
  const { email: user } = useAuth().user;

  useEffect(() => {
    return subscribeToFlags(id, setFlags);
  }, [window.location.href]);

  useEffect(() => {
    return subscribeToHiringSettings(setHiringSettings);
  }, [window.location.href]);

  useEffect(() => {
    return subscribeToCtaLink(setCtaLink);
  }, [window.location.href]);

  useEffect(() => {
    if (!editing) {
      setEditedFlags({});
      setEditedHiringSettings({});
    }
  }, [editing]);

  const saveInfo = async () => {
    await saveFlags()
    await saveHiringSettings()
    await saveCtaLink()
    setEditing(false);
  }

  const saveFlags = async () => {
    const updateObj = editedFlags;
    updateObj.lastEdited = getTimestamp();
    updateObj.lastEditedBy = user;
    await updateFlags(id, updateObj);
  };

  const saveHiringSettings = async () => {
    const updateObj = editedHiringSettings;
    updateObj.lastEdited = getTimestamp();
    updateObj.lastEditedBy = user;
    await updateHiringSettings(updateObj);
  };

  const saveCtaLink = async () => {
    await updateCtaLink(ctaLink)
  };

  const stringFromKey = (key) => {
    const isUpperCase = (i) => {
        return key[i] === key[i].toUpperCase()
    }
    let keyString = '';
    for (let i = 0; i < key.length; i++) {
        if (i == 0) {
            keyString += key[i].toUpperCase();
            continue;
        }
        if (isUpperCase(i) && !isUpperCase(i + 1)) {
            keyString += ' ';
            keyString += key[i].toLowerCase();
        } else {
            keyString += key[i];
        }
    }
    return keyString;
}
  const EditFlagsComponent = () => (
    <>
    <div style={{display: 'flex', flexDirection: 'column'}}>
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
      {Object.entries(editedHiringSettings).map(([key, value]) => {
        if (key === 'lastEdited' || key === 'lastEditedBy') {
          return null;
        }
        return (
          <div>
            <Label>{stringFromKey(key)}</Label>
            <Input
              value={value}
              onChange={(e) => {setEditedHiringSettings({...editedHiringSettings, key: e.target.value})}}
            />
          </div>
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
    </div>
      
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
      {/* hiring, errors: wrong key, extra key, missing key?.. */}
      {Object.entries(hiringSettings).map(([key, value]) => {
        if (key === 'lastEdited' || key === 'lastEditedBy') {
          return null;
        }
        return <Group>
          <Label>{stringFromKey(key)}</Label>
          {value}
        </Group>
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
                  setEditedHiringSettings(hiringSettings);
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

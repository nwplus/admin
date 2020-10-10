import React, { useEffect, useState } from 'react';
import Page from '../../components/page';
import Card, {
  CardHeader,
  CardButtonContainer,
  CardTitle,
  CardContent,
  CardContentButtonContainer,
  CancelButton,
} from '../../components/card';
import { ModalField } from '../../components/modal';
import Button from '../../components/button';
import {
  formatDate,
  getHackathons,
  getLivesiteData,
} from '../../utility/firebase';
import { LIVESITE_NAVBAR, EDIT } from '../../constants';

export default ({ hackathons }) => {
  const [livesiteData, setLivesiteData] = useState({});
  const [isEditing, setisEditing] = useState(false);

  useEffect(async () => {
    const data = await getLivesiteData();
    setLivesiteData(data);
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
                label="Hackathon ID"
                modalAction={EDIT}
                onChange={(event) =>
                  setLivesiteData({
                    ...livesiteData,
                    hackathonID: event.target.value,
                  })
                }
              />
              <CardContentButtonContainer>
                <CancelButton onClick={() => setisEditing(false)} />
                <Button onClick={() => setisEditing(false)}>Save</Button>
              </CardContentButtonContainer>
            </>
          ) : (
              <> {livesiteData.activeHackathon} </>
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

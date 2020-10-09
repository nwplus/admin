import React from 'react';
import Page from '../../components/page';
import Card, {
  CardHeader,
  CardButtonContainer,
  CardTitle,
  CardContent,
} from '../../components/card';
import { ModalField, ModalButton } from '../../components/modal';
import Button from '../../components/button';
import { formatDate, getHackathons } from '../../utility/firebase';
import { LIVESITE_NAVBAR, VIEW, EDIT } from '../../constants';

export default ({ hackathons }) => (
  <Page
    currentPath="Livesite"
    hackathons={hackathons}
    navbarItems={LIVESITE_NAVBAR}
  >
    <Card>
      <CardHeader>
        <CardTitle>Livesite Settings</CardTitle>
        <p>{`Last edited by ${"asd"} at ${formatDate(
          123
        )}`}</p>
        <CardButtonContainer>
          <Button
            type={EDIT}
            onClick={() => {
              console.log('hey')
            }}
          />
        </CardButtonContainer>
      </CardHeader>
      <CardContent>
        <ModalField
          label="Question"
          modalAction={EDIT}
          onChange={(event) => {
            console.log("hi")
          }}
        >
          GHuuuuhashd
        </ModalField>
        <ModalButton
          type={EDIT}
          handleSave={() => console.log('save')}
        />
      </CardContent>
    </Card>
  </Page>
);

export const getStaticProps = async () => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
    },
  };
};

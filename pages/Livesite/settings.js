import React from 'react';
import styled from 'styled-components';
import Page from '../../components/page';
import Card, {
  CardHeader,
  CardButtonContainer,
  CardTitle,
  CardContent,
} from '../../components/card';
import { ModalField } from '../../components/modal';
import Button from '../../components/button';
import { formatDate, getHackathons } from '../../utility/firebase';
import { LIVESITE_NAVBAR, COLOR, EDIT } from '../../constants';

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

const CancelText = styled.p`
  border-bottom: 2px solid ${COLOR.BLACK};
  margin: 0px;
`;

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
        <CancelButton onClick={() => console.log("cancel")}>
          <CancelText>Cancel</CancelText>
        </CancelButton>
        <Button onClick={() => console.log("save")}>Save</Button>
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

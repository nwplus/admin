import React from 'react';
import firebase from 'firebase';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer,
} from '../components/card';
import { EDIT } from '../constants';
import Button from '../components/button';
import SponsorshipPage from '../components/spocos';

export default function Landing() {
  return (
    <>
      <div>Login Page</div>

      <Card>
        <CardHeader>
          <CardTitle>Hi</CardTitle>
          <p>Some extra text</p>
          <CardButtonContainer>
            <Button type={EDIT}>Hi there</Button>

            <Button onClick={() => firebase.auth().signOut()}>Sign out</Button>
          </CardButtonContainer>
        </CardHeader>
        <CardContent>Example usage of card component</CardContent>
      </Card>
    </>
  );
}

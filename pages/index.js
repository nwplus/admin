import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer,
} from '../components/card';
import { EDIT } from '../constants';
import Button from '../components/button';
import SponsorshipPage from './sponsorship';

export default function Home() {
  return (
    <>
      <div>Login Page</div>

      <Card>
        <CardHeader>
          <CardTitle>Hi</CardTitle>
          <p>Some extra text</p>
          <CardButtonContainer>
            <Button type={EDIT} isText={true}> Hi there</Button>
          </CardButtonContainer>
        </CardHeader>
        <CardContent>Example usage of card component</CardContent>
      </Card>
      <SponsorshipPage name='LHD'/>
    </>
  );
}

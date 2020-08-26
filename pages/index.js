import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer
} from '../components/card';
import { EDIT } from '../constants';
import Button from '../components/button';

export default function Home() {
  return (
    <>
      <div>Login Page</div>

      <Card>
        <CardHeader>
          <CardTitle>Hi</CardTitle>
          <p>Some extra text</p>
          <CardButtonContainer>
            <Button type={EDIT}>Hi there</Button>
          </CardButtonContainer>
        </CardHeader>
        <CardContent>Example usage of card component</CardContent>
      </Card>
    </>
  );
}

import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer } from '../components/card'
import { EDIT } from '../constants'
import Button from '../components/button'
import firebase from 'firebase'

export default () => {
  return (
    <React.Fragment>
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
    </React.Fragment>

  )
}

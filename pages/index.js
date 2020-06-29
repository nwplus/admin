import Head from 'next/head'
import Card, { CardHeader, CardTitle, CardContent, ButtonContainer } from '../components/card'
import { EDIT, NEW } from '../constants'
import Button from '../components/button'

export default function Home() {
  return (
    <React.Fragment>
      <div>Login Page</div>

      <Card>
        <CardHeader>
          <CardTitle>Hi</CardTitle>
          <ButtonContainer>
            <Button>Hi there</Button>
          </ButtonContainer>
        </CardHeader>
        <CardContent>Example usage of card component</CardContent>
      </Card>
    </React.Fragment>
  )
}

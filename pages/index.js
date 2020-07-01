import Head from 'next/head'
import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer } from '../components/card'
import { EDIT, NEW } from '../constants'
import Button from '../components/button'
import SponsorshipPage from './sponsorship'

export default function Home() {
  return (
    <React.Fragment>
      <div>Login Page</div>

      <Card>
        <CardHeader>
          <CardTitle>Hello</CardTitle>
          <p>Some extra text</p>
          <CardButtonContainer>
            <Button type={EDIT}>Hi there</Button>
          </CardButtonContainer>
        </CardHeader>
        <CardContent>Example usage of card component</CardContent>
      </Card>
      <SponsorshipPage />

    </React.Fragment>

  )
}

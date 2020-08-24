import Head from 'next/head'
import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer } from '../components/card'
import { EDIT, NEW } from '../constants'
import Button from '../components/button'
import fireDb from '../utility/firebase'
import { useRouter } from 'next/router'

export default () => {
  const clickclick = async () => {
    console.log(await fireDb.getTest())
  }
  const router = useRouter()
  return (
    <React.Fragment>
      <div>Login Page</div>

      <Card>
        <CardHeader>
          <CardTitle>Hi</CardTitle>
          <p>Some extra text</p>
          <CardButtonContainer>
            <Button type={EDIT} onClick={clickclick}>Hi there</Button>
            
        <Button onClick={() => router.push('/testing')}>goto</Button>
          </CardButtonContainer>
        </CardHeader>
        <CardContent>Example usage of card component</CardContent>
      </Card>
    </React.Fragment>

  )
}

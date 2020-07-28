import Head from 'next/head'
import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer, CardDiv, TableDiv } from '../components/card'
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
        <CardContent>
          <h4>Example usage of card component</h4>
          <TableDiv>
            <CardDiv> Example of table within card component </CardDiv>  
            <CardDiv> I'll add buttons in the next merge </CardDiv>  
            <CardDiv> Note that card divs should be wrapped within table divs (which are wrapped in CardContent) </CardDiv>  
          </TableDiv>  
          
        </CardContent>
      </Card>

      <SponsorshipPage name="LHD"/> 

      

     

    </React.Fragment>

  )
}

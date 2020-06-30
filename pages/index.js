import Head from 'next/head'
import Card from '../components/card'
import SponsorshipPage from './sponsorship'



export default function Home() {
  return (
    <React.Fragment>
      <div>Login Page</div>
      <Card>Example usage of card component</Card>
      <SponsorshipPage />


    </React.Fragment>
  )
}

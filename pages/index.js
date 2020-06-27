import Head from 'next/head'
import Card from '../components/card'
import { EDIT, NEW } from '../constants'

export default function Home() {
  return (
    <React.Fragment>
      <div>Login Page</div>
      <Card
        title='hi'
        subtitle='modified xxx'
        author='Ian M'
        ctaType={EDIT}
        onClick={() => alert('click')}
      >Example usage of card component</Card>

      <Card
        title='Card two'
        subtitle='modified xxx'
        author='Ian M'
        buttonText='New Sponsor'
        ctaType={NEW}
        onClick={() => alert('click')}
      >Example usage of card component</Card>
    </React.Fragment>
  )
}

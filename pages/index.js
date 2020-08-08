import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer
} from '../components/card';
import { EDIT } from '../constants';
import Button from '../components/button';
import styled from 'styled-components';
import { COLOR } from '../constants';
import SponsorshipPage from './sponsorship';



const LogInDiv = styled.div`
    position: absolute;
    top: 179px;
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    color: ${ COLOR.BLACK };
    left: 50%;
    margin-left: -42.625px;
`

const UserNameDiv = styled.div`
    position: absolute;
    top: 285px;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    color: ${ COLOR.BLACK };
    text-align: left;
`

const PasswordDiv = styled.div`
    position: absolute;
    top: 400px;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    text-align: left;
    color: ${ COLOR.BLACK };
`

const ForgotPasswordDiv = styled.div`
    position: absolute;
    margin-top: 488px;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    left: 50%;
    color: ${ COLOR.BLACK };
`

const ButtonWrapper = styled.div`
    position: absolute;
    top: 588px;
    margin: auto;
`

const Wrapper = styled.div`
    width: 365px;
    margin: auto;
`

const UserNameInput = styled.input`
    position: absolute;
    top: 326px;
    width: 365px;
    height: 40px;
    background: ${ COLOR.WHITE };
    border: 1px solid #606060;
    box-sizing: border-box;
    border-radius: 2px;
    font-size: 16px;
    line-height: 20px;
`

const PasswordInput = styled.input`
    position: absolute;
    top: 441px;
    width: 365px;
    height: 40px;
    background: ${ COLOR.WHITE };
    border: 1px solid #606060;
    box-sizing: border-box;
    border-radius: 2px;
    font-size: 16px;
    line-height: 20px;
`


export default function Home() {

  const googleSignIn = async (e) => {
    e.preventDefault();
    if (!firebase.apps.length) {
      console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
      const config = {
        apiKey: "AIzaSyBppAYPBZ6WxWdErM3smh6t9BEJPUM_NHU",
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        measurementId: 'G-SV1NEW90HT',
        appId: '1:98283589440:web:c15c6169d0098fb15d34a5',
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
      }
      firebase.initializeApp(config)
    }
    
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      'hd': 'nwplus.io'
    })
    await firebase.auth().signInWithPopup(provider).then((result) => {
      const token = result.credential.accessToken;
    }).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      alert(errorCode);

      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    })
  }

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

      <SponsorshipPage name='LHD'/>

      

    </>
  );
}

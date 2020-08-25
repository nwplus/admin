import firebase from 'firebase'
import styled from 'styled-components'
import { useState } from 'react'
import Button from '../components/button'
import { useRouter } from 'next/router'
import { COLOR } from '../constants'

const Container = styled.div`
    display: flex;
    justify-content: center;
`
const NameHeader = styled.h1`
    position: absolute:
    top: 100px;
`
const ButtonWrapper = styled.div`
    position: absolute;
    top: 200px;
`
const ErrorDiv = styled.div`
    position: absolute;
    top: 300px;
    color: ${COLOR.RED}
`

export default function Home() {
  const router = useRouter()
  const [ showError, setShowError ] = useState(false)
  const setAdmin = firebase.functions().httpsCallable('setAdmin')

  const checkAddAdminClaim = async user => {
    const token = await user.getIdTokenResult();
    if (!token.claims.hasOwnProperty('admin')) {
      await setAdmin()
      await firebase.auth().currentUser.getIdToken(true)
    }
  }

  const googleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      'hd': 'nwplus.io',
      'prompt': 'consent'
    })

    try {
      await firebase.auth().signInWithPopup(provider)
      const user = firebase.auth().currentUser
      if (user && /.+@nwplus\.io$/.test(user.email)) {
        router.push('/landing')
        checkAddAdminClaim(user)
      } else {
        await firebase.auth().signOut()
        setShowError(true)
      }
    } catch (error) {
      console.log(error.message)
      alert(error.message)
    }
}
  return (
    <>
      <Container>
        <NameHeader>nwPlus CMS</NameHeader>
        <ButtonWrapper>
            <Button onClick={googleSignIn}>Login</Button>
          </ButtonWrapper>
          {showError ? <ErrorDiv>Unauthorized user! Please log in again.</ErrorDiv> : null}
      </Container>
    </>
  )
}

import firebase from 'firebase'
import styled from 'styled-components'
import { useState } from 'react'
import Button from '../components/button'
import { useRouter } from 'next/router'
import { COLOR } from '../constants'
import { checkAdminClaim } from '../utility/auth'

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
const AuthorizeDiv = styled.div`
    position: absolute;
    top: 300px;
`

export default function Home() {
  const router = useRouter()
  const [ showError, setShowError ] = useState(false)
  const [ isAddingClaim, setIsAddingClaim ] = useState(false)
  const setAdmin = firebase.functions().httpsCallable('setAdmin')

  const googleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      'hd': 'nwplus.io',
      'prompt': 'consent'
    })

    try {
      await firebase.auth().signInWithPopup(provider)
      setShowError(false)
      setIsAddingClaim(true)
      const user = await firebase.auth().currentUser
      const isAdmin = await checkAdminClaim(user)
      if (isAdmin) {
        await router.push('/landing')
      } else {
        const res = await setAdmin()
        if (res.data.isAdmin) {
          await user.getIdToken(true)
          await router.push('/landing')
        } else {
          await firebase.auth().signOut()
          setIsAddingClaim(false)
          setShowError(true)
        }
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
          {isAddingClaim ? <AuthorizeDiv>Authorizing user...</AuthorizeDiv> : null}
      </Container>
    </>
  )
}

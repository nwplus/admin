import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'
import background from '../public/backgroundImage.png'
import nwPlusLogo from '../public/nwPlusLogo.png'
import signIn from '../public/signIn.png'
import { checkAdminClaim, useAuth } from '../utility/auth'

const BackgroundContainer = styled.div`
  background-image: url(${background});
  background-size: cover;
  height: 100vh;
  width: 100vw;
`

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 337px;
  background-color: ${COLOR.WHITE};
`

const LogoImage = styled.img`
  align-self: center;
  margin-top: 80px;
`

const LogInDiv = styled.div`
  font-size: 28px;
  margin-top: 48px;
`

const SignInImage = styled.img`
  align-self: center;
  margin-top: 34px;
  cursor: pointer;
`

const StatusDiv = styled.div`
  margin-top: 20px;
  font-size: 26px;
  text-align: center;
  ${props => props.error && `color: ${COLOR.RED}`}
`

export default function Home() {
  const { setUser } = useAuth()
  const router = useRouter()
  const [showError, setShowError] = useState(false)
  const [isAddingClaim, setIsAddingClaim] = useState(false)
  const setAdmin = firebase.functions().httpsCallable('setAdmin')

  const googleSignIn = async () => {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      hd: 'nwplus.io',
      prompt: 'consent',
    })

    try {
      await firebase.auth().signInWithPopup(provider)
      setShowError(false)
      setIsAddingClaim(true)
      const user = await firebase.auth().currentUser
      const isAdmin = await checkAdminClaim(user)
      if (isAdmin) {
        router.push('/landing')
      } else {
        const res = await setAdmin()
        if (res.data.isAdmin) {
          await user.getIdToken(true)
          setUser(user)
          router.push('/landing')
        } else {
          await firebase.auth().signOut()
          router.push('/')
          setIsAddingClaim(false)
          setShowError(true)
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.message)
    }
  }
  return (
    <>
      <BackgroundContainer>
        <LeftContainer>
          <LogoImage src={nwPlusLogo} />
          <LogInDiv>Log into your account</LogInDiv>
          <SignInImage src={signIn} onClick={googleSignIn} />
          {showError && (
            <StatusDiv error>
              <p>Unauthorized user!</p>
              <p>Please log in again with a valid account.</p>
            </StatusDiv>
          )}
          {isAddingClaim && <StatusDiv>Authorizing user...</StatusDiv>}
        </LeftContainer>
      </BackgroundContainer>
    </>
  )
}

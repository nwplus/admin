import firebase from 'firebase'
import styled from 'styled-components'
import { useState } from 'react'
import { COLOR } from '../constants'
import Button from '../components/button'
import fireDb from '../utility/firebase'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../utility/auth'



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
  const router = useRouter()
  const { pushToLanding, user, googleSignIn } = useAuth()

  if (pushToLanding) router.push('/landing')
    
  return (
    <>
      <Wrapper>
        <LogInDiv>Log in</LogInDiv>
        <UserNameDiv>User Name</UserNameDiv>
        <UserNameInput/>
        <PasswordDiv>Password</PasswordDiv>
        <PasswordInput/>
        <ForgotPasswordDiv>Forgot password?</ForgotPasswordDiv>
        <ButtonWrapper>
          <Button onClick={googleSignIn}>Loggggggin</Button>
        </ButtonWrapper>
      </Wrapper>
    </>
  )
}

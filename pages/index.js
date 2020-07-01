import Head from 'next/head'
import styled from 'styled-components'
import { useState } from 'react'
import { COLOR } from '../constants'
import { Helmet } from 'react-helmet'
import { GlobalStyle } from '../components/globalStyles'
import Button from '../components/button'

const LogInDiv = styled.div`
    position: absolute;
    width: 85px;
    height: 40px;
    left: 842px;
    top: 179px;
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    text-align: center;
    color: ${ COLOR.BLACK };
`

const UserNameDiv = styled.div`
    position: absolute;
    width: 119px;
    height: 30px;
    left: 702px;
    top: 285px;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    color: ${ COLOR.BLACK };
    text-align: center;
`

const PasswordDiv = styled.div`
    position: absolute;
    width: 102px;
    height: 30px;
    left: 702px;
    top: 400px;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    color: ${ COLOR.BLACK };
`

const ForgotPasswordDiv = styled.div`
    position: absolute;
    width: 129px;
    height: 20px;
    left: 939px;
    top: 488px;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: ${ COLOR.BLACK };
`

const ButtonWrapper = styled.div`
    margin-left: 835px;
    margin-top: 588px;
`

const Wrapper = styled.div`

`

const UserNameInput = styled.input`
    position: absolute;
    width: 365px;
    height: 40px;
    left: 702px;
    top: 326px;
    background: ${ COLOR.WHITE };
    border: 1px solid #606060;
    box-sizing: border-box;
    border-radius: 2px;
    font-size: 16px;
    line-height: 20px;
`

const PasswordInput = styled.input`
    position: absolute;
    width: 365px;
    height: 40px;
    left: 702px;
    top: 441px;
    background: ${ COLOR.WHITE };
    border: 1px solid #606060;
    box-sizing: border-box;
    border-radius: 2px;
    font-size: 16px;
    line-height: 20px;
`


export default function Home() {
  return (
    <React.Fragment>
      <Helmet>
      <link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/hk-grotesk" type="text/css"/>
      </Helmet>
      <GlobalStyle/>
      <LogInDiv>Log iin</LogInDiv>
      <UserNameDiv>User Name</UserNameDiv>
      <UserNameInput/>
      <PasswordDiv>Password</PasswordDiv>
      <PasswordInput/>
      <ForgotPasswordDiv>Forgot password?</ForgotPasswordDiv>
      <ButtonWrapper>
        <Button>Login</Button>
      </ButtonWrapper>
      
    </React.Fragment>
  )
}

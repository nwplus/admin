import Head from 'next/head'
import styled from 'styled-components'
import { useState } from 'react'
import { COLOR } from '../constants'
import { Helmet } from 'react-helmet'
import { GlobalStyle } from '../components/globalStyles'

const StyledLogIn = styled.div`
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


export default function Home() {
  return (
    <React.Fragment>
      <Helmet>
      <link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/hk-grotesk" type="text/css"/>
      </Helmet>
      <GlobalStyle/>
      <StyledLogIn>Log in</StyledLogIn>
    </React.Fragment>
  )
}

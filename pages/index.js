import Head from 'next/head'
import styled from 'styled-components'
import { useState } from 'react'
import { COLOR } from '../constants'

const StyledLogIn = styled.div`
    position: absolute;
    width: 85px;
    height: 40px;
    left: 842px;
    top: 179px;
    font-family: HK Grotesk;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    text-align: center;
    color: ${ COLOR.BLACK };
`


export default function Home() {
  return (
    <React.Fragment>
      <StyledLogIn>Log innnn</StyledLogIn>
    </React.Fragment>
  )
}

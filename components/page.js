import React from 'react'
import styled from 'styled-components'
import Sidebar from './sidebar'

const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
`

const Content = styled.div`
  padding: 60px;
`

export default ({children}) => (
  <Container>
    <Sidebar />
    <Content>{children}</Content>
  </Container>
)
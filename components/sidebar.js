import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'

const SidebarContainer = styled.div`
    background-color: ${COLOR.PRIMARY};
    height: 100vw;
    width: 300px;
`
export default () => (
    <SidebarContainer>Sidebar</SidebarContainer>
)
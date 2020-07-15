import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'

const SidebarContainer = styled.div`
    background-color: ${COLOR.PRIMARY};
    color: ${COLOR.WHITE};
    width: 260px;
    padding: 60px;
`
const Header = styled.h1`
    font-weight: bold;
    font-size: 32px;
`
export default () => (
    <SidebarContainer>
        <Header>nwPlus CMS</Header>
    </SidebarContainer>
)
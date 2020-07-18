import React from 'react'
import styled from 'styled-components'
import { db } from '../utility/firebase'
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
export default ({ hackathons }) => (
    <SidebarContainer>
        <Header>nwPlus CMS</Header>
        {hackathons.map(id => <p>{id}</p>)}
    </SidebarContainer>
)
import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'

const SidebarContainer = styled.div`
    background-color: ${COLOR.PRIMARY};
    color: ${COLOR.WHITE};
    box-sizing: border-box;
    width: 300px;
    padding: 30px;
`

const Header = styled.h1`
    font-weight: bold;
    font-size: 32px;
`

const Link = styled.a`
    display: block;
    color: ${COLOR.DARK_COPY};
    text-decoration: none;
    padding: 10px 0 10px 50px;
    margin: 0 -30px;
    &:hover{
        color: ${COLOR.WHITE};
    }
    ${p => p.selected && 'background-color: #1b1821'}
`

export default ({ hackathons }) => {
    const currentPath = (typeof location === 'undefined') ? '' : location.pathname
    return (
        <SidebarContainer>
            <Header>nwPlus CMS</Header>
            <p>Websites</p>
            {
                // client-side-only code
                (typeof window !== 'undefined') &&
                hackathons.map(id => {
                    return (
                        <Link
                        key={id}
                        href={`/${id}`}
                        selected={currentPath.includes(id)}
                    >
                        {id}
                    </Link>
                    )
                })
            }
        </SidebarContainer>
    )
}
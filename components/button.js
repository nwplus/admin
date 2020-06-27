import React from 'react'
import styled from 'styled-components'
import EditIcon from './icons/edit'
import NewIcon from './icons/new'
import { EDIT, NEW } from '../constants'

const StyledButton = styled.button`
    border: none;
    margin-left: auto;
    padding: 12px;
    color: #fff;
    cursor: pointer;
    background-color: #2D2937;
    display: flex;
    align-items: center;
`

const StyledEditIcon = styled(EditIcon)`
    ${props => props.hasText && 'margin-right: 10px;'}
`

const StyledNewIcon = styled(NewIcon)`
    ${props => props.hasText && 'margin-right: 10px;'}
`

const Button = ({children, type, onClick}) => (
    <StyledButton onClick={onClick}>
        {(type === EDIT) && <StyledEditIcon hasText={children} />}
        {(type === NEW) && <StyledNewIcon hasText={children} />}
        {children}
    </StyledButton>
)

export default Button

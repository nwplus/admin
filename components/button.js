import React from 'react'
import styled from 'styled-components'
import EditIcon from './icons/edit'
import NewIcon from './icons/new'
import { EDIT, NEW } from '../constants'

const StyledButton = styled.button`
    border: none;
    ${props => props.isText ? 'padding: 6px 24px;' : 'padding: 10px;'}
    color: #fff;
    cursor: pointer;
    background-color: #2D2937;
    display: flex;
    align-items: center;
    font-size: 16px;
    border-radius: 3px;
`

const StyledEditIcon = styled(EditIcon)`
    ${props => props.hasText && 'margin-right: 8px;'}
`

const StyledNewIcon = styled(NewIcon)`
    ${props => props.hasText && 'margin-right: 8px;'}
`

const Button = ({children, type, onClick}) => (
    <StyledButton isText={children && !type} onClick={onClick}>
        {(type === EDIT) && <StyledEditIcon hasText={children} />}
        {(type === NEW) && <StyledNewIcon hasText={children} />}
        {children}
    </StyledButton>
)

export default Button

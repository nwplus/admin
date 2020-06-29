import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
    background-color: #F8F8F8;
`

export const CardHeader = styled.div`
    background-color: #EDEDED;
    padding: 24px 40px;
    display: flex;
    align-items: center;
`

export const CardTitle = styled.h1`
    font-size: 24px;
    margin: 0;
`

export const CardButtonContainer = styled.div`
    margin-left: auto;
`

export const CardContent = styled.div`
    padding: 40px;
`

export default ({children}) => (
    <Card>
        {children}
    </Card>
)
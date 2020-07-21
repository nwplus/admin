import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'

const Card = styled.div`
    background-color: ${COLOR.BACKGROUND};
`

export const CardHeader = styled.div`
    background-color: ${COLOR.GREY};
    padding: 24px 40px;
    display: flex;
    align-items: center;
`

export const CardTitle = styled.h1`
    font-size: 24px;
    margin: 0;
    margin-right: 16px;
`

export const CardButtonContainer = styled.div`
    margin-left: auto;
`

export const CardContent = styled.div`
    padding: 40px;
`

export const CardDiv = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    padding: 26px 28px;
    border-bottom: 2px solid #EDEDED;
`
export const TableDiv = styled.div`
    border: 1px solid #000000;
    border-radius: 3px;
    padding: 1px 1px;
    background-color: #FFFFFF;
`


export default ({children}) => (
    <Card>
        {children}
    </Card>
)
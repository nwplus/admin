import Card from '../components/card'
import styled from 'styled-components'
import { useState } from 'react'


const HeaderDiv = styled.div`
    border: none;
    height: 50px;
    line-height: 50px;
    padding: 0px 43px;
   
    
    overflow: hidden;
    background-color: #EDEDED;
    outline: none;
    font-size: 24px;
    color: #5A5A5A;
    font-weight: 600
`
const BodyDiv = styled.div`
    background-color: #F8F8F8;
    padding: 34px 43px 50px;
`

const TableDiv = styled.div`
    border: 1px solid #000000;
    border-radius: 3px;
    padding: 1px 1px;
`

const HeaderCard = styled.div`
    padding: 26px 28px;
    font-weight: bold;
    font-family: Apercu Pro;
    font-size: 16px;
    border-bottom: 2px solid #EDEDED;

`


const CardDiv = styled.div`
  
    padding: 26px 28px;
    border-bottom: 2px solid #EDEDED;

`
// map CardDiv to a function
// async firebase api first 

export default function SponsorshipPage() {
    return(
        <React.Fragment>
            <HeaderDiv>
                Sponsors
            </HeaderDiv>
            <BodyDiv>
                
                <TableDiv>
                    <HeaderCard>
                        Sponsor Name, 
                        Link, 
                        Something

                    </HeaderCard>
                    <CardDiv> 
                        Card
                    </CardDiv>
                    <CardDiv>
                        Card 2
                    </CardDiv>

                </TableDiv>
            </BodyDiv>
        </React.Fragment>
    )
}
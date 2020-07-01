import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer } from '../components/card'
import styled from 'styled-components'
import Button from '../components/button'
import { useState } from 'react'
import { EDIT, NEW } from '../constants'


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

// map CardDiv to a function
// async firebase api first 

export default function SponsorshipPage() {
    
    const [editWindow, setEditWindow] = useState(false)
    
    const handleEdit = (e) => {
        e.preventDefault();
        //TODO: pop-up window 
        setEditWindow(true)
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setEditWindow(false);
    }

    const handleSave = (e) => {
        // TODO: update firebase with edits
        e.preventDefault();
        setEditWindow();
    }

    return(
        <React.Fragment>
            <CardHeader style={{backgroundColor: "#EDEDED"}}> 
                <CardTitle>Sponsors</CardTitle>
                <CardButtonContainer>
                    <Button onClick={handleEdit} type={NEW}>New Sponsor</Button>
                </CardButtonContainer>
            </CardHeader>
            <BodyDiv>
                <TableDiv>
                    <HeaderCard>
                        Sponsor Name, 
                        Link, 
                        Something

                    </HeaderCard>
                    <CardContent>
                        Hello
                    </CardContent>
                    <Card link='Google.com'>
                        <CardContent>
                            pls help
                        </CardContent>
                     
                    </Card>
                </TableDiv>
            </BodyDiv>
        </React.Fragment>
    )
}
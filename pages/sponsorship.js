import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer } from '../components/card'
import styled from 'styled-components'
import Button from '../components/button'
import React, { useState } from 'react'
import Modal from 'react-modal'
import { EDIT, NEW } from '../constants'

const sponsortest = [
    {"name": "Tencent",
    "link":"www.microsoft.com",
    "image": "path to photo",
    "lastmod": "today lol"
     },
    {"name": "Apple",
    "link":"www.apple.com",
    "image": "yeeters",
    "lastmod": "today lol"
    },  
    {"name": "Balenciaga",
    "link":"www.ssense.com",
    "image": "koko",
    "lastmod": "lol"
}]

const TableDiv = styled.div`
    border: 1px solid #000000;
    border-radius: 3px;
    padding: 1px 1px;
    background-color: #FFFFFF;
`

const HeaderCard = styled.div`
    padding: 26px 28px;
    font-weight: bold;
    font-family: Apercu Pro;
    font-size: 16px;
    border-bottom: 2px solid #EDEDED;

`
const Text = styled.text`
    padding-right: 110px;
`



const CardDiv = styled.div`
    padding: 26px 28px;
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
            <Card>
                <CardHeader style={{backgroundColor: "#EDEDED"}}> 
                    <CardTitle>Sponsors</CardTitle>
                    <CardButtonContainer>
                        <Button onClick={handleEdit} type={NEW}>New Sponsor</Button>
                    </CardButtonContainer>
                </CardHeader>

                <CardContent style={{backgroundColor: "F8F8F8"}}>
                <TableDiv>
                    <HeaderCard>
                        <Text>
                            Sponsor Name 
                        </Text>
                        <Text>
                            Link
                        </Text>
                        <Text>
                            Logo Image File
                        </Text>
                        <Text>
                            Actions
                        </Text>
                        
                        

                    </HeaderCard>
                    <div>
                        {sponsortest.map((items, index)=> 
                            <CardDiv>
                                {items.name} {items.image} {items.link} {items.lastmod} 
                            </CardDiv>
                        )}
                    </div>
                </TableDiv>
                </CardContent>
            </Card> 

            <Modal isOpen={editWindow} onRequestClose={()=>setEditWindow(false)} style={{ overlay: {
      position: 'fixed',
      top: 0}}}>
                <div>
                   Edit item
                   <p>Sponsor Name</p>
                   <input type="text" >
                   </input>
                </div>
              
                <button onClick={()=>setEditWindow(false)} > 
                [x]
                </button>
            </Modal>
        </React.Fragment>
    )
}
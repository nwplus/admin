import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer } from '../components/card'
import styled from 'styled-components'
import Button from '../components/button'
import React, { useState } from 'react'
import Modal from 'react-modal'
import { EDIT, NEW } from '../constants'


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


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

class SponsorshipPage extends React.Component {
    
    constructor(){
        super();
        this.state = {
            sponsortest: [
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
            }], 
            showEditWindow: false
        }
       
        
    }

    
    handleEdit = (e) => {
        e.preventDefault();
        //TODO: pop-up window 
        this.setState({showEditWindow: true})
    };

    handleNew = (e) => {
        e.preventDefault();
        //TODO: pop-up window 
        this.setState({showEditWindow: true})
    };

    handleCancel = () => {
        
        this.setState({showEditWindow:false});
        alert("wtf")
    }

    handleSave = (e) => {
        // TODO: update firebase with edits
        e.preventDefault();
        // setEditWindow(false);
    }

  


    
    render() {
        return(
            <React.Fragment>
                <Card>
                    <CardHeader style={{backgroundColor: "#EDEDED"}}> 
                        <CardTitle>Sponsors</CardTitle>
                        <CardButtonContainer>
                            <Button type={NEW} onClick={this.handleNew}>New Sponsor</Button>
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
                            {this.state.sponsortest.map((items, index)=> 
                                <CardDiv>
                                    {items.name} {items.image} {items.link} {items.lastmod} 
                                </CardDiv>
                            )}
                        </div>
                    </TableDiv>
                    </CardContent>
                </Card> 

                <Modal isOpen={this.state.showEditWindow} 
                    onRequestClose={()=>this.setState({showEditWindow: false})} 
                    style={customStyles}>
                            <div>
                            Edit item
                                <p>Sponsor Name</p>
                                <input type="text" >
                                </input>
                            </div>

                            <button onClick={()=>this.setState({showEditWindow: false})} > 
                            [x]
                            </button>
                </Modal>

            </React.Fragment>
        )
    }
      
}


export default SponsorshipPage;
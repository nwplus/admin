import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer, CardDiv, TableDiv } from '../components/card'
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


// TODO: move font family higher, reduce need to redefine
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
            showEditWindow: false,
            "name": "",
            "link": "",
            "image": "",
            "lastmod": ""
            
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
    
    handleChange = e => {
       
    }

    handleCancel = () => { 
        this.setState({showEditWindow:false});
    }

    handleSave = (event) => {
        var newObj = {[event.target.name]: event.target.value};
        alert(newObj.name);
        
        this.setState({sponsortest: [newObj, ...sponsortest]});
        console.log(this.state.sponsortest)
        

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
                                <CardDiv key={index}>
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
                        <form onSubmit={this.handleSave}>
                            <div>
                                <h3> Edit item </h3>
                                <p>Sponsor Name</p>
                                <input type="text" name='name' />
                                <p>Link</p>
                                <input type ='text' name='link'/>
                                <br></br>
                                <button > Submit! </button>
                            </div>
                        </form>
                        
                        <button onClick={()=>this.setState({showEditWindow: false})} > 
                            [x]
                        </button>
                </Modal>

            </React.Fragment>
        )
    }
      
}


export default SponsorshipPage;
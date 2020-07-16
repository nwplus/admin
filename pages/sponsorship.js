import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer, CardDiv, TableDiv } from '../components/card'
import styled from 'styled-components'
import Button from '../components/button'
import React, { useState } from 'react'
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
            newobj: {
                "name": "",
                "link": "",
                "image": "",
                "lastmod": ""
            }
                
        }
       
        
    }

    
    handleEdit = (e) => {
        //TODO: pop-up window 
        this.setState({showEditWindow: true})
    };

    handleNew = (e) => {
        //TODO: pop-up window 
        this.setState({showEditWindow: true})
    };
    

    // allows a form with "saved state" so if users close the modal, it allows
    handleChange = (event) => {
        this.setState({ newobj: {
            ... this.state.newobj,
            [event.target.name]: event.target.value} });
        console.log(this.state.newobj);
       
    }   

    handleCancel = () => { 
        this.setState({showEditWindow:false});
    }

    // sends and adds it to the list
    handleSave = (event) => {
        // prevents refreshing of the page
        event.preventDefault(); 
        this.setState({
            sponsortest: [...this.state.sponsortest, this.state.newobj],
            newobj: {"name":"", 
                    "link": "",
                    "image": "",
                    "lastmod": ""
            }   
        });

    
        // this.setState({ newobj: {[event.target.name]: event.target.value} })

        // var newObj = {[event.target.name]: event.target.value};
        // alert(newObj.name);
        
        // this.setState({sponsortest: [newObj, ...sponsortest]});
        console.log(this.state.newobj);
        

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
        
                <form onSubmit={this.handleSave}>
                
                    <h3> Edit item </h3>
                    <p>Sponsor Name</p>
                    <input 
                      type="text" 
                      name='name'
                      value={this.state.newobj.name} 
                      onChange={this.handleChange}
                    />

                    <p>Link</p>
                    <input 
                      type='text' 
                      name='link' 
                      value={this.state.newobj.link}
                      onChange={this.handleChange}
                    />
                    

                    <p>Image File</p>
                    <input 
                      type='text' 
                      name='image' 
                      value={this.state.newobj.image}
                      onChange={this.handleChange}
                    />
                   
                    <button type='submit'> Submit! </button>
                
                </form>
                

            </React.Fragment>
        )
    }
      
}


export default SponsorshipPage;
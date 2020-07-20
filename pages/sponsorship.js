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
                "lastmod": "lol"},
                {"name": "Porsche",
                "link":"www.porsche.ca",
                "image": "a car",
                "lastmod": "july 19" },
                {"name": "Lexus LC500",
                "link":"www.autotrader.com",
                "image": "also a nice car",
                "lastmod": "2mr"}
            ], 
            newobj: {
                "name": "",
                "link": "",
                "image": "",
                "lastmod": ""
            },
            showEditWindow: false,
            itemStatus: {
                "newItem": true,
                "index": 0,     
            }
        }
    }

    
    handleEdit = (i) => {
        //TODO: pop-up window 
        this.setState({
            newobj: {
                "name": this.state.sponsortest[i].name,
                "link": this.state.sponsortest[i].link, 
                "image": this.state.sponsortest[i].image, 
                "lastmod": this.state.sponsortest[i].lastmod, 
            },
            showEditWindow: true,
            itemStatus: {
                "newItem": false,
                "index": i,
            }
        })
        console.log(this.state.newobj, this.state.itemStatus)
    };

    handleNew = (e) => {
        //TODO: pop-up window 
        this.setState({
            showEditWindow: true,
            itemStatus: {"newItem": true}
        })
        console.log(this.state.itemStatus);
    };

    handleDelete(i) {
        this.state.sponsortest.splice(i, 1);  // returns the removed item but also mutates the original
        this.setState({sponsortest: this.state.sponsortest})
    }
    

    // allows a form with "saved state" so if users close the modal, it allows
    handleChange = (event) => {
        this.setState({ newobj: {
            ... this.state.newobj,
            [event.target.name]: event.target.value} });
        console.log(this.state.newobj);
       
    }   

    handleCloseModal = () => { 
        this.setState({showEditWindow:false});
    }

    // saves newobj onto state based on this.state.itemStatus
    handleSave = (event) => {
        // prevents refreshing of the page
        event.preventDefault(); 
       
        if (this.state.itemStatus.newItem) { // if is a new item
            this.setState({ sponsortest: [this.state.newobj, ...this.state.sponsortest]})
          
        } else { // not a new item
            this.state.sponsortest.splice(this.state.itemStatus.index, 1, this.state.newobj);
        }
        this.setState({
            newobj: {"name":"", 
                    "link": "",
                    "image": "",
                    "lastmod": ""
            }   
        });      
        console.log(this.state);
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
                            {this.state.sponsortest.map((items, i)=> 
                                <CardDiv key={i}>
                                    {items.name} {items.image} {items.link} {items.lastmod} 
                                    <button onClick={() => this.handleDelete(i)}> delete </button>
                                    <button> view </button>
                                    <button onClick={() => this.handleEdit(i)}> edit </button>
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
                      required
                    />

                    <p>Link</p>
                    <input 
                      type='text' 
                      name='link' 
                      value={this.state.newobj.link}
                      onChange={this.handleChange}
                      required
                    />
                    

                    <p>Image File</p>
                    <input 
                      type='text' 
                      name='image' 
                      value={this.state.newobj.image}
                      onChange={this.handleChange}
                      required
                    />
                   
                    <button type='submit'> Submit! </button>
                    
                
                </form>
                

            </React.Fragment>
        )
    }
      
}


export default SponsorshipPage;

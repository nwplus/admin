import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer, CardDiv, TableDiv } from '../components/card'
import styled from 'styled-components'
import Button from '../components/button'
import React, { useState } from 'react'
import { EDIT, NEW } from '../constants'
import fireDb, { db } from "../utility/firebase"


// TODO: move font family higher, reduce need to redefine

const Text = styled.text`
    padding-right: 80px;
    flex: 1;
    white-space: nowrap;    
    overflow: hidden;         
    text-overflow: ellipsis;
`

class SponsorshipPage extends React.Component {

    constructor(){
        super();
        
        
        this.state = {
            sponsors: {
                "Apple": {
                    "name": "Apple",
                    "link": "www.apple.ca/canada",
                    "image": "a pinguo",
                    "lastmod": "anytime bb",
                    "tier": "Silver",
                },
                "Pokemon": {
                    "name": "Pokemon",
                    "link": "pikachu",
                    "image": "giratina",
                    "lastmod": "2005 lol",
                    "tier": "Gold",
                },
            },
            newobj: {
                "name": "",
                "link": "",
                "image": "",
                "lastmod": "",
                "tier": "",
            },
            showEditWindow: false,
            itemStatus: {
                "newItem": true,
                "index": 0,     
            }
        }
    }

    
    handleEdit = (id) => {
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

    testbutton = () => {
        fireDb.alexgetSponsors(this.props.name).then((result)=>{
            this.setState({sponsors: result});
            console.log("yo we already here" + result);
        })
        
    }

    handleNew = (e) => {
        //TODO: pop-up window 
        this.setState({
            showEditWindow: true,
            itemStatus: {"newItem": true}
        })
        
    };

    handleDelete(id) {
        // 1. deletes from Firebase
        fireDb.deleteSponsor(this.props.name, id)
        
        
        // 2. deletes from CMS
        delete this.state.sponsors[id];
        this.setState({sponsors: this.state.sponsors});

      
    };
    

    // allows a form with "saved state" so if users close the modal, it allows
    handleChange = (event) => {
        var d = new Date();

        this.setState({ 
            newobj: {
                ... this.state.newobj,
                [event.target.name]: event.target.value,
                "lastmod": d.toLocaleString(),
            } 
        });
        console.log(this.state.newobj);
       
    }   

    handleCloseModal = () => { 
        this.setState({showEditWindow:false});
    }

    // MODAL SUBMIT BUTTON CLICKED (NEW + EDIT)
    handleSave = (event) => {
        event.preventDefault(); // prevents page reload

        // 1. uploads to firebase
        // no duplicate sponsors allowed, so old name means setting sponsor.. 
        fireDb.setSponsor(this.props.name, this.state.newobj); 

        // 2. renders on CMS
        this.state.sponsors[this.state.newobj.name] = this.state.newobj;
        this.setState({ sponsors: this.state.sponsors });
        
        // 3. refreshes form 
        this.setState({
            newobj: {"name":"", 
                    "link": "",
                    "image": "",
                    "lastmod": "",
                    "tier": "",
            }   
        });   
    }
    
    render() {
        return(
            <React.Fragment>
                <Card>
                    <CardHeader style={{backgroundColor: "#EDEDED"}}> 
                        <CardTitle>Sponsors: {this.props.name} </CardTitle>
                        <button onClick={this.testbutton}> Freak my shit </button>
                        <CardButtonContainer>
                            <Button type={NEW} onClick={this.handleNew}>New Sponsor</Button>
                        </CardButtonContainer>
                    </CardHeader>

                    <CardContent style={{backgroundColor: "F8F8F8"}}>
                    <TableDiv>
                        <CardDiv>
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
                                Last Modified
                            </Text>
                            <Text>
                                Actions
                            </Text>
                        </CardDiv>
                          
                        <div>
                            {Object.values(this.state.sponsors).map((item)=> 
                                <CardDiv key={item.name}>
                                    <Text>
                                        {item.name}
                                    </Text>
                                    <Text>  
                                        {item.image}
                                    </Text>
                                    <Text>
                                        {item.link}
                                    </Text>
                                    <Text>
                                        {item.lastmod}
                                    </Text>
                                    <Text>
                                        <button onClick={() => this.handleDelete(item.name)}> delete </button>
                                        <button> view </button>
                                        <button onClick={() => this.handleEdit(item.name)}> edit </button>
                                    </Text>
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

                    <label>

                    Tier
                    <select value={this.state.newobj.tier} onChange={this.handleChange} name="tier">
                        <option value="inkind">In-kind</option>
                        <option value="bronze">Bronze</option>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                        <option value="platinum">Platinum / Title Sponsor </option>
                    </select>
                    </label>
                   
                    <button type='submit'> Submit! </button>
                
                </form>
            </React.Fragment>
        )
    }
      
}

export default SponsorshipPage;

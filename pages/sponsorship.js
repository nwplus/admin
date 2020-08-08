import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer, CardDiv, TableDiv } from '../components/card'
import styled from 'styled-components'
import Button from '../components/button'
import React, { useState } from 'react'
import { EDIT, NEW } from '../constants'
import fireDb, { db } from "../utility/firebase"
import Modal from '../components/modal'
import { GlobalStyle } from '../components/globalStyles';


// TODO: move font family higher, reduce need to redefine

const Text = styled.text`
    padding-right: 80px;
    flex: 1;
    white-space: nowrap;    
    overflow: hidden;         
    text-overflow: ellipsis;
`
const Actions = styled.div`
    padding-right: 80px;
    flex: 1;
`

class SponsorshipPage extends React.Component {

    constructor(){
        super();

        this.state = {
            sponsors: {},
            newobj: {
                "name": "",
                "link": "",
                "imgURL": "",
                "lastmod": "",
                "tier": "",
            },
            showEditWindow: false,
        }
    }

    componentDidMount(){
        this.loadFirebase();
    }

    
    handleEdit = (id) => {
        //TODO: pop-up window 
        this.setState({
            newobj: {
                "name": this.state.sponsors[id].name,
                "link": this.state.sponsors[id].link, 
                "imgURL": this.state.sponsors[id].imgURL, 
                "lastmod": this.state.sponsors[id].lastmod, 
                "tier": this.state.sponsors[id].tier,
            },
            showEditWindow: true,
        })
    };

    async loadFirebase() {
        const data = await fireDb.alexgetSponsors(this.props.name);
        this.setState({sponsors: data})
        console.log(this.state.sponsors)
        
    }

    
    handleNew = (e) => {
        //TODO: pop-up window 
        this.setState({ showEditWindow: true })
        
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
                    "umgURL": "",
                    "lastmod": "",
                    "tier": "",
            }, 
            showEditWindow: false,   
        });   
    }
    
    render() {
        return(
            <>
                <Card>
                    <CardHeader style={{backgroundColor: "#EDEDED"}}> 
                        <CardTitle> Sponsors: {this.props.name} </CardTitle>
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
                                        {item.link}
                                    </Text>
                                    <Text>
                                        {item.imgURL}
                                    </Text>
                                    <Text>
                                        {item.lastmod}
                                    </Text>
                                    <Actions>
                                        <button onClick={() => this.handleDelete(item.name)}> delete </button>
                                        <button> view </button>
                                        <button onClick={() => this.handleEdit(item.name)}> edit </button>
                                    </Actions>
                                </CardDiv>
                            )}
                        </div>
                    </TableDiv>
                    </CardContent>
                </Card> 
                
                <Modal show={this.state.showEditWindow}>
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
                        name='imgURL' 
                        value={this.state.newobj.imgURL}
                        onChange={this.handleChange}
                        required
                        />

                        <label>

                        <p>Tier</p>
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
                </Modal>
        
               
            </>
        )
    }
      
}

export default SponsorshipPage;

import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer, CardDiv, TableDiv } from '../components/card'
import styled from 'styled-components'
import Button from '../components/button'
import React, { useState, useRef } from 'react'
import { EDIT, NEW, VIEW, DELETE, COLOR, SPONSORSHIP} from '../constants'
import fireDb, { db } from "../utility/firebase"
import Modal, { ModalButton, ModalContent, ModalField, LogoImage, UploadContainer } from '../components/modal'


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
    display: flex;
    justify-content: flex-start;
`

class SponsorshipPage extends React.Component {

    
    inputFile = React.createRef();

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
            imgObject: {}, // for frontend rendering
            imgFile:{},    // for backend 
            showEditWindow: false,
            modalAction: NEW,
        }
    }

    componentDidMount(){
        this.loadFirebase();   
    }

    async loadFirebase() {
        const data = await fireDb.getSponsors(this.props.name);
        this.setState({sponsors: data})
        console.log(this.state.sponsors)
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
            // TODO: populate the 
            showEditWindow: true,
            modalAction: EDIT
        })
    };

    handleView = (id) => {
        this.setState({ 
            newobj: {
                "name": this.state.sponsors[id].name,
                "link": this.state.sponsors[id].link, 
                "imgURL": this.state.sponsors[id].imgURL, 
                "lastmod": this.state.sponsors[id].lastmod, 
                "tier": this.state.sponsors[id].tier,
            },
            showEditWindow: true,
            modalAction: VIEW
         })
        
    }
    
    handleNew = (e) => {
        this.setState({
            newobj: {"name":"", 
                    "link": "",
                    "imgURL": "",
                    "lastmod": "",
                    "tier": "",
            }, 
            imgFile: {},
            imgObject: {},
            showEditWindow: true, 
            modalAction: NEW,  
        });          
    };


    handleDelete(id) {
        // 1. deletes from Firebase
        fireDb.deleteSponsor(this.props.name, id)
        fireDb.deleteSponsorImagefromStorage(this.props.name, this.state.sponsors[id].imgURL)
        // 2. deletes from CMS
        delete this.state.sponsors[id];
        this.setState({sponsors: this.state.sponsors});
    };
    
    
    handleChange = (property, value) => {
        var d = new Date();
        this.setState({ 
            newobj: {
                ... this.state.newobj,
                [property]: value,
                "lastmod": d.toLocaleString(),
            } 
        });
        console.log(this.state);
    }   

    handleCloseModal = () => { 
        this.setState({showEditWindow:false});
    }

    // MODAL SUBMIT BUTTON CLICKED (NEW + EDIT)
    handleSave = (event) => {
        event.preventDefault(); // prevents page reload

        // 1. uploads to firebase
        // newobj.imgURL is a file object
        fireDb.setSponsor(this.props.name, this.state.newobj); 
        fireDb.uploadSponsorImageToStorage(this.props.name, this.state.imgFile); 

        // 2. renders on CMS
        this.state.sponsors[this.state.newobj.name] = this.state.newobj;
        this.setState({ sponsors: this.state.sponsors });
        
        // 3. refreshes form 
        this.setState({
            newobj: {"name":"", 
                    "link": "",
                    "imgURL": "",
                    "lastmod": "",
                    "tier": "",
            }, 
            imgFile: {},
            imgObject: {},
            showEditWindow: false,   
        });   
    }

    // clicks the invisible <input type='file /> 
    fileClick = e => {
        this.inputFile.current.click();
    }

    selectImageFile = e => {
        if (e.target.files[0]) {
            this.setState({
                newobj: {
                    ...this.state.newobj,
                    imgURL: e.target.files[0].name, // send this to name
                },
                imgObject: URL.createObjectURL(e.target.files[0]), // allows rendering
                imgFile: e.target.files[0]
            })
        }
        console.log(this.state.newobj)
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
                                        <Button type={DELETE} color={COLOR.TRANSPARENT} onClick={() => this.handleDelete(item.name)} /> 
                                        <Button type={VIEW} color={COLOR.TRANSPARENT} onClick={()=> this.handleView(item.name)} />
                                        <Button type={EDIT} color={COLOR.TRANSPARENT} onClick={() => this.handleEdit(item.name)}/>
                                    </Actions>
                                </CardDiv>
                            )}
                        </div>
                    </TableDiv>
                    </CardContent>
                </Card> 


                {/* EDIT MODAL*/}
                <Modal
                    isOpen={this.state.showEditWindow}
                    handleClose={this.handleCloseModal}
                    handleSave={this.handleSave}
                    modalAction={this.state.modalAction}
                    lastModified={this.state.newobj.lastmod}
                >
                    <ModalContent page={SPONSORSHIP}>
                        <ModalField
                            label="Sponsor Name"
                            value={this.state.newobj.name}
                            modalAction={this.state.modalAction}
                            onChange={(event) => this.handleChange('name', event.target.value)}
                        />
                        <ModalField
                            label="Link"
                            value={this.state.newobj.link}
                            modalAction={this.state.modalAction}
                            onChange={(event) => this.handleChange('link', event.target.value)}
                        />
                        <LogoImage> {/* resize it to 200px */}
                            <img src={this.state.imgObject} width='100%'/>
                        </LogoImage>
                            {/* input is hidden, button clicked referenced by inputFile */}
                        <input type='file' id='file' ref={this.inputFile} accept="image/*" onChange={this.selectImageFile} style={{display: 'none'}} />
                        <UploadContainer
                            type='text'
                            value={this.state.newobj.imgURL}
                            onClick={this.fileClick}
                        />
                    </ModalContent>
                </Modal>            
            </>
            )
        }

          
    }
    
    export default SponsorshipPage;
    

            
           

                        {/*
                        
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
                    </form>
                    
                        */}
                    
             
        
                
                
    
               

import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer } from '../components/card'
import styled from 'styled-components'
import { useState } from 'react'
import { COLOR, EDIT } from '../constants'
import Button from '../components/button'
import TextBox from '../components/textbox'
import firebase from 'firebase/app'

const props = {
    nwHacks: {
        WebsiteData: {
            intro: {
                title: `Intro`,
                editor: `Derek Chen`,
                header: `This is nwHacks 2019`,
                time: `July 14, 2020 at 10:30:03 AM UTC-7`,
                content: `Come make things and break things, and then make them cooler. You'll never be short on inspiration when you're surrounded by 650 of the brightest minds in the Pacific Northwest. All you need to bring is an open mind and an insatiable desire to learn; we'll take care of the rest. After all, we're western Canada's largest hackathon - we make the west coast the best coast.`
            },
            otherSection: {
                editor: `Ian Mah`,
                title: `Other Text Section(s)`,
                time: `July 8, 2020 at 12:00:00 PM UTC-7`,
                header: `Why nwHacks?`,
                content: `Vancouver is breathtaking and so are you`
            }
        }
    }
}

const HeaderText = styled.p`
    border: none;
    overflow: hidden;
    background-color: ${COLOR.BACKGROUND};
    outline: none;
    font-size: 24px;
    padding-bottom: 13px;
    color: ${COLOR.TEXT};
    font-weight: 600;
`

const ContentText = styled.p`
    border: none;
    overflow: hidden;
    background-color: ${COLOR.BACKGROUND};
    outline: none;
    color: ${COLOR.TEXT};
`

const StyledCancel = styled.button`
    font-size: 16px;
    cursor: pointer;
    border-bottom: 2px solid ${COLOR.BLACK};
    margin-left: 675px;
    margin-right: 40px;
    border: none;
    outline: none;
    background-color: ${COLOR.BACKGROUND};
`

const StyledHeader = styled.p`
    padding-bottom: 13px;
    padding-top: 17px;
    margin: 0px;
    background-color: ${COLOR.BACKGROUND};
`

export default function IntroPage() {
    const [isEditingObj, setIsEditingObj] = useState({})
    // TODO need functionality to display data based on what event is currently being viewed

    const config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    }
    
    const handleEdit = (type) => {
        setIsEditingObj({
            ...isEditingObj,
            [type]: !isEditingObj[type]
        })
    };

    const handleCancel = (type) => {
        setIsEditingObj({
            ...isEditingObj,
            [type]: false
        })
    }

    const handleSave = (e) => {
        // TODO: update firebase with value of div
        e.preventDefault();
        setIsEditing(false)
    }

    function Content(props) {
        const { header, content, isEditing, cancel } = props
        return (
            <React.Fragment>
                {
                    isEditing ?
                        <div style={{padding: '0px 40px 37px 40px'}}>
                            <StyledHeader>Header</StyledHeader>
                            <TextBox defaultValue={header} />
                            <StyledHeader>Body</StyledHeader>
                            <TextBox defaultValue={content} resize={true}/>
                            <div style={{ marginTop: '27px', display: 'flex', float: 'right' }}>
                                <StyledCancel onClick={cancel}>
                                    <p style={{ borderBottom: `2px solid ${COLOR.BLACK}`, margin: '0px' }}>
                                        Cancel
                                    </p>
                                </StyledCancel>
                                <Button>Save</Button>
                            </div>
                        </div>
                        :
                        <React.Fragment>
                            <HeaderText>{header}</HeaderText>
                            <ContentText>{content}</ContentText>
                        </React.Fragment>
                }
            </React.Fragment>
        )
    }

    // map over every text section in a hackathon's WebsiteData and adds the section name to isEditingObj state 
    return (
        <React.Fragment>
        {Object.keys(props.nwHacks.WebsiteData).map((key) => {
            if (isEditingObj[key] === undefined) {
                setIsEditingObj({
                    ...isEditingObj,
                    [key]: false
                })
            }
            return (
            <Card>
                <CardHeader>
                    <CardTitle>{props.nwHacks.WebsiteData[key].title}</CardTitle>
                    <p>{`Last edited by ${props.nwHacks.WebsiteData[key].editor} at ${props.nwHacks.WebsiteData[key].time}`}</p>
                    <CardButtonContainer>
                        <Button type={EDIT} onClick={() => handleEdit(key)} />
                    </CardButtonContainer>
                </CardHeader>
                <CardContent>
                    <Content cancel={() => handleCancel(key)} isEditing={isEditingObj[key]} header={props.nwHacks.WebsiteData[key].header} content={props.nwHacks.WebsiteData[key].content} />
                </CardContent>
            </Card>
            )
        })}
        </React.Fragment>
    )
}
import Card from '../components/card'
import styled from 'styled-components'
import { useState } from 'react'

const props = {
    nwHacks: {
        subtitle: `Last modified [TIME STAMP FIREBASE] by [USER FROM FIREBASE]`,
        contentHeader: `This is nwHacks 2019`,
        content: `Come make things and break things, and then make them cooler. You'll never be short on inspiration when you're surrounded by 650 of the brightest minds in the Pacific Northwest. All you need to bring is an open mind and an insatiable desire to learn; we'll take care of the rest. After all, we're western Canada's largest hackathon - we make the west coast the best coast.`,
        otherSubtitle: `Last modified [TIME STAMP FIREBASE] by [USER FROM FIREBASE]`,
        otherContentHeader: `Why nwHacks?`,
        otherContent: `Vancouver is breathtaking and so are you`
    }
}

const HeaderDiv = styled.div`
    border: none;
    width: 847px;
    overflow: hidden;
    background-color: #F8F8F8;
    outline: none;
    font-size: 24px;
    padding-bottom: 13px;
    color: #5A5A5A;
    font-weight: 600
`

const EditingHeader = styled.div`
    border: 1px solid #606060;
    width: 847px;
    overflow: hidden;
    background-color: #FFFFFF;
    outline: none;
    padding: 10px 16px 10px 16px;
`

const ContentDiv = styled.div`
    border: none;
    width: 847px;
    overflow: hidden;
    background-color: #F8F8F8;
    outline: none;
    color: #5A5A5A;
`

const EditingDiv = styled.div`
    border: 1px solid #606060;
    width: 847px;
    overflow: hidden;
    background-color: #FFFFFF;
    outline: none;
    resize: vertical;
    padding: 10px 16px 10px 16px;
`

const StyledCancel = styled.button`
    font-size: 16px;
    cursor: pointer;
    border-bottom: 2px solid #000000;
    margin-left: 675px;
    margin-right: 40px;
    border: none;
    outline: none;
    background-color: #F8F8F8;
`

const StyledSave = styled.button`
    font-size: 16px;
    background-color: #2D2937;
    border-radius: 3px;
    width: 102px;
    height: 40px;
    color: #FFFFFF;
    cursor: pointer;
`

const StyledHeader = styled.p`
    padding-bottom: 13px;
    padding-top: 17px;
    margin: 0px;
    background-color: #F8F8F8;
`

export default function IntroPage() {
    const [isEditing, setIsEditing] = useState(false)
    // TODO need functionality to display data based on what event is currently being viewed

    const handleEdit = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing)
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setIsEditing(false)
    }

    const handleSave = (e) => {
        // TODO: update firebase with value of div
        e.preventDefault();
        setIsEditing(false)
    }


    function Content(props) {
        const { header, content } = props
        return (
            <React.Fragment>
                {
                    isEditing ?
                        <React.Fragment >
                            <StyledHeader>Header</StyledHeader>
                            <EditingHeader contentEditable>{header}</EditingHeader>
                            <StyledHeader>Body</StyledHeader>
                            <EditingDiv contentEditable>{content}</EditingDiv>
                            <div style={{ height: '27px', backgroundColor: '#F8F8F8' }} />
                            <div style={{ display: 'flex' }}>
                                <StyledCancel onClick={handleCancel}>
                                    <p style={{ borderBottom: '2px solid #000000', margin: '0px' }}>
                                        Cancel
                                    </p>
                                </StyledCancel>
                                <StyledSave>Save</StyledSave>
                            </div>
                        </React.Fragment >
                        :
                        < React.Fragment >
                            <HeaderDiv contentEditable={false}>{header}</HeaderDiv>
                            <ContentDiv contentEditable={false}>{content}</ContentDiv>
                        </React.Fragment >
                }
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <button onClick={handleEdit}>EDIT</button>
            <Content header={props.nwHacks.contentHeader} content={props.nwHacks.content} />
            <button onClick={handleEdit}>EDIT</button>
            <Content header={props.nwHacks.otherContentHeader} content={props.nwHacks.content} />

            <Card
                Header='Intro Text'
                Subtitle={props.nwHacks.subtitle}
                Content={<Content header={props.nwHacks.contentHeader} content={props.nwHacks.content} />}
            />
            <Card
                Header='Other Text Section(s)'
                Subtitle={props.nwHacks.otherSubtitle}
                Content={<Content header={props.nwHacks.otherContentHeader} content={props.nwHacks.otherContent} />}
            />

        </React.Fragment>
    )
}
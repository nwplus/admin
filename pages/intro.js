import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer } from '../components/card'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { COLOR, EDIT } from '../constants'
import Button from '../components/button'

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

const HeaderText = styled.textarea`
    border: none;
    width: 847px;
    overflow: hidden;
    background-color: ${COLOR.BACKGROUND};
    outline: none;
    font-size: 24px;
    padding-bottom: 13px;
    color: ${COLOR.TEXT};
    font-weight: 600;
    resize: none;
    height: 0px;
`

const EditingHeader = styled.textarea`
    border: 1px solid ${COLOR.EDIT_BORDER};
    width: 847px;
    overflow: hidden;
    background-color: ${COLOR.WHITE};
    outline: none;
    padding: 10px 16px 0px 16px; 
    height: 0px;
    resize: none;
`

const ContentText = styled.textarea`
    border: none;
    width: 847px;
    overflow: hidden;
    background-color: ${COLOR.BACKGROUND};
    outline: none;
    color: ${COLOR.TEXT};
    height: 0px;
    resize: none;
`

const EditingText = styled.textarea`
    border: 1px solid ${COLOR.EDIT_BORDER};
    width: 847px;
    overflow: hidden;
    background-color: ${COLOR.WHITE};
    outline: none;
    resize: vertical;
    padding: 10px 16px 10px 16px;
    height: 0px;
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

const StyledSave = styled.button`
    font-size: 16px;
    background-color: ${COLOR.PRIMARY};
    border-radius: 3px;
    width: 102px;
    height: 40px;
    color: ${COLOR.WHITE};
    cursor: pointer;
`

const StyledHeader = styled.p`
    padding-bottom: 13px;
    padding-top: 17px;
    margin: 0px;
    background-color: ${COLOR.BACKGROUND};
`

export default function IntroPage() {
    const [isEditingIntro, setIsEditingIntro] = useState(false)
    const [isEditingOthers, setIsEditingOthers] = useState(false)
    // TODO need functionality to display data based on what event is currently being viewed

    const handleEdit = (type, e) => {
        e.preventDefault();
        calculateTextAreaHeight()
        if (type == 'intro') {
            setIsEditingIntro(!isEditingIntro)
        } else {
            setIsEditingOthers(!isEditingOthers)
        }
    };

    const handleCancel = (type, e) => {
        e.preventDefault();
        if (type == 'intro') {
            setIsEditingIntro(false)
        } else {
            setIsEditingOthers(false)
        }
    }

    const handleSave = (e) => {
        // TODO: update firebase with value of div
        e.preventDefault();
        setIsEditing(false)
    }

    // sets the heights for all textareas based on their scroll height
    const calculateTextAreaHeight = () => {
        const textareas = document.getElementsByClassName('textarea');
        Array.prototype.forEach.call(textareas, function (textarea) {
            textarea.style.height = textarea.scrollHeight + 'px'
        })
    }

    useEffect(() => {
        calculateTextAreaHeight()
    })

    function Content(props) {
        const { header, content, isEditing, cancel } = props
        return (
            <React.Fragment>
                {
                    isEditing ?
                        <React.Fragment>
                            <StyledHeader>Header</StyledHeader>
                            <EditingHeader className='textarea' defaultValue={header} />
                            <StyledHeader>Body</StyledHeader>
                            <EditingText className='textarea' defaultValue={content} />
                            <div style={{ height: '27px', backgroundColor: `${COLOR.BACKGROUND}` }} />
                            <div style={{ display: 'flex' }}>
                                <StyledCancel onClick={cancel}>
                                    <p style={{ borderBottom: `2px solid ${COLOR.BLACK}`, margin: '0px' }}>
                                        Cancel
                                    </p>
                                </StyledCancel>
                                <StyledSave>Save</StyledSave>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <HeaderText className='textarea' disabled defaultValue={header} />
                            <ContentText className='textarea' disabled defaultValue={content} />
                        </React.Fragment>
                }
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div style={{ marginTop: '-40px', marginBottom: '40px' }}>
                <Card>
                    <CardHeader>
                        <CardTitle>Intro Text</CardTitle>
                        <p>{props.nwHacks.subtitle}</p>
                        <CardButtonContainer>
                            <Button type={EDIT} onClick={handleEdit.bind(null, 'intro')} />
                        </CardButtonContainer>
                    </CardHeader>
                    <CardContent>
                        <Content cancel={handleCancel.bind(null, 'intro')} isEditing={isEditingIntro} header={props.nwHacks.contentHeader} content={props.nwHacks.content} />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Other Text Section(s)</CardTitle>
                    <p>{props.nwHacks.otherSubtitle}</p>
                    <CardButtonContainer>
                        <Button type={EDIT} onClick={handleEdit.bind(null, 'others')} />
                    </CardButtonContainer>
                </CardHeader>
                <CardContent>
                    <Content cancel={handleCancel.bind(null, 'others')} isEditing={isEditingOthers} header={props.nwHacks.otherContentHeader} content={props.nwHacks.otherContent} />
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
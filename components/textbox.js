import { COLOR } from '../constants'
import { useEffect } from 'react'
import styled from 'styled-components'

const EditingText = styled.textarea`
    border: 1px solid ${COLOR.EDIT_BORDER};
    overflow: hidden;
    background-color: ${COLOR.WHITE};
    outline: none;
    padding: 10px 16px 0px 16px;
    height: 0px;
    width: 100%;
`

export default function TextBox(props) {
    useEffect(() => {
        calculateTextAreaHeight()
    })

    // sets the heights for all textareas based on their scroll height
    const calculateTextAreaHeight = () => {
        const textareas = document.getElementsByClassName('textarea');
        Array.prototype.forEach.call(textareas, function (textarea) {
            textarea.style.height = (textarea.scrollHeight - 5) + 'px'
        })
    }
 
    const styleObj = {
        resize: props.resize ? 'vertical' : 'none'
    }

    return (
        <EditingText style={styleObj} className='textarea' defaultValue={props.defaultValue}/>
    )
}
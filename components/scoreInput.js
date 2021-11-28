
// these are the blue buttons for the applicantScore sidebar
import React from 'react'
import styled from 'styled-components'
import Number from './numberIcon'

const Container = styled.div`
    padding-bottom: 12px;
`

const ScoreContainer = styled.div`
    display: flex;
    padding-top: 8px;
`

const CommentInput = styled.input`
    width: 100%;
    padding: 0.5em;
    margin: 0.5em;
    color: black;
    background: white;
    border: solid 2px black;
    border-radius: 3px;
    &:focus {
        outline: none;
    }
`

export default function ScoreInput({ label, score, handleClick, handleTextChange, maxScore }) {
  const arr = [...Array(maxScore.value + 1).keys()]

  const handleMultipier = (value, label) => {
    return handleClick(value * maxScore.weight, label)
  }

  return (
    <Container>
      <label>{label}</label>
      <ScoreContainer>
        {arr.map(num => {
          return (
            <Number
              label={label}
              number={num}
              active={score != null && score / maxScore.weight === num}
              key={num}
              handleClick={handleMultipier}
            />
          )
        })}
      </ScoreContainer>
      <CommentInput oninput={handleTextChange} handleplaceholder="Add your comment here" type="text" />
    </Container>
  )
}
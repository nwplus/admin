/* eslint-disable jsx-a11y/label-has-associated-control */

// these are the blue buttons for the applicantScore sidebar
import React from 'react'
import Number from './numberIcon'

export default function ScoreInput({ label, score, handleClick, maxScore }) {
  const arr = [...Array(maxScore.value + 1).keys()]

  const handleMultipier = value => {
    return handleClick(value * maxScore.weight, label)
  }

  return (
    <div style={{ paddingBottom: '12px' }}>
      <label>{label}</label>
      <div style={{ display: 'flex', paddingTop: '8px' }}>
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
      </div>
    </div>
  )
}

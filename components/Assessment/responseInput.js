import React, { useState } from 'react'
import styled from 'styled-components'
import OpenLinkIcon from '../../assets/openLinkIcon.svg'
import { ASSESSMENT_COLOR, COLOR } from '../../constants'
import { Button } from './Button'
import PopoutWindow from './PopoutWindow'

const Label = styled.label`
  color: ${ASSESSMENT_COLOR.LIGHT_GRAY};
`

const Container = styled.div`
  margin-top: 15px;
`

const URL = styled.a`
  color: ${COLOR.MIDNIGHT_PURPLE_LIGHT};
  text-decoration: none;
  font-weight: bold;
`

const URLContainer = styled.div`
  display: flex;
`

const OpenIcon = styled.a`
  margin-left: auto;
  cursor: pointer;
  margin-right: 10px;
`

const NO_RESPONSE = 'No Response'

export default function ResponseInput({ url, label, response, openable, responseTextColor }) {
  const [open, setOpen] = useState(false)

  const OpenButton = () => (
    <div style={{ textAlign: 'center' }}>
      <Button
        bColor={ASSESSMENT_COLOR.BLUE_TEXT}
        width="flex"
        onClick={() => {
          setOpen(!open)
        }}
      >
        {open ? 'Close window' : 'Open in new window'}
      </Button>
    </div>
  )

  const ResponseArea = ({ fontSize }) => (
    <div
      style={{
        border: 'none',
        padding: '12px 0px 8px 12px',
        backgroundColor: ASSESSMENT_COLOR.INPUT_GRAY,
        fontSize,
        resize: 'none',
        color: responseTextColor || 'black',
        verticalAlign: 'middle',
      }}
    >
      {!response ? (
        'No Response'
      ) : !url ? (
        response
      ) : (
        <URLContainer>
          <URL href={response} target="_blank" rel="noreferrer noopener">
            {response || NO_RESPONSE}
          </URL>
          <OpenIcon href={response} target="_blank" rel="noreferrer noopener">
            <img src={OpenLinkIcon} alt="Open Link Icon" />
          </OpenIcon>
        </URLContainer>
      )}
    </div>
  )

  return (
    <Container>
      <Label>
        {label}
        {openable && <OpenButton />}
      </Label>
      <ResponseArea responseTextColor={responseTextColor} />
      {open && (
        <PopoutWindow title={label} setWindowClosed={() => setOpen(false)}>
          <h5 style={{ fontSize: '20px' }}>{label}</h5>
          <ResponseArea fontSize="20px" />
        </PopoutWindow>
      )}
    </Container>
  )
}

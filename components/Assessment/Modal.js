import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const GreyDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  position: fixed;
  z-index: 99;
`

const ModalDiv = styled.div`
  width: 400px;
  height: 70%;
  overflow-y: auto;
  position: fixed;
  left: 50%;
  top: 25%;
  background-color: white;
  transform: translate(-50%, -25%);
  opacity: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function Modal({ children, setShowing, className }) {
  const backgroundRef = useRef()
  useEffect(() => {
    const escFunction = ({ keyCode }) => {
      if (keyCode === 27) {
        setShowing(false)
      }
    }
    document.addEventListener('keyup', escFunction, false)
    return () => {
      document.removeEventListener('keyup', escFunction, false)
    }
  })
  return (
    <GreyDiv
      ref={backgroundRef}
      onClick={e => {
        if (backgroundRef.current && backgroundRef.current === e.target) {
          setShowing(false)
        }
      }}
    >
      <ModalDiv className={className}>{children}</ModalDiv>
    </GreyDiv>
  )
}

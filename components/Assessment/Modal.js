import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const GreyDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
`;

const ModalDiv = styled.div`
  width: 400px;
  height: auto;
  position: absolute;
  left: 50%;
  top: 25%;
  background-color: white;
  transform: translate(-50%, -25%);
  opacity: 100%;
`;

export default function Modal({ children, setShowing }) {
  const backgroundRef = useRef();
  useEffect(() => {
    const escFunction = ({ keyCode }) => {
      if (keyCode === 27) {
        setShowing(false);
      }
    };
    document.addEventListener('keyup', escFunction, false);
    return () => {
      document.removeEventListener('keyup', escFunction, false);
    };
  });
  return (
    <GreyDiv
      ref={backgroundRef}
      onClick={(e) => {
        if (backgroundRef.current && backgroundRef.current === e.target) {
          setShowing(false);
        }
      }}
    >
      <ModalDiv>{children}</ModalDiv>
    </GreyDiv>
  );
}

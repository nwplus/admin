import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'

const BackDropScreen = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`
const Modal = styled.div`
  ${(props) =>
    props.show
      ? 'transform: translateY(0); opacity: 1'
      : 'transform: translateY(-100vh); opacity: 0'}
  position: absolute;
  padding: 40px;
  z-index: 500;
  background-color: ${COLOR.BACKGROUND};
  border-radius: 5px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 741px;
  transition: all 0.3s ease-out;
`

export const ModalTitle = styled.h4`
  font-family: Apercu Pro;
  font-size: 24px;
  line-height: 30px;
  color: ${COLOR.BLACK};
`

const BackDrop = (props) => (props.show ? <BackDropScreen /> : null)

export default ({ children, show, type }) => <Modal>{children}</Modal>

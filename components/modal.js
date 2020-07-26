import React from "react"
import styled from "styled-components"
import { COLOR } from "../constants"

const Modal = styled.div`
  position: absolute;
  z-index: 500;
  background-color: ${COLOR.BACKGROUND};
  border-radius: 5px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 741px;
`

export const ModalTitle = styled.div`
  left: 391px;
  top: 293px;
  font-family: Apercu Pro;
  font-size: 24px;
  line-height: 30px;
  color: ${COLOR.BLACK};
`

export default ({ children }) => <Modal>{children}</Modal>

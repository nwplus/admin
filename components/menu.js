import { useState } from 'react'
import styled from 'styled-components'

import Button from './button'
import { CLOSE, COLOR } from '../constants'

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
  float: right;
`

const MenuContent = styled.div`
  display: block;
  padding: 8px;
  padding-right: 28px;
  right: 0;

  position: absolute;
  background: white;
  box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.3);
  z-index: 99;
`

const CloseButton = styled.div`
  position: absolute;
  top: 8px;
  right: 4px;
`

const Menu = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MenuContainer>
      <Button onClick={() => setIsOpen(!isOpen)} color="transparent">
        {label}
      </Button>
      {isOpen && (
        <MenuContent>
          {children}
          <CloseButton>
            <Button
              type={CLOSE}
              color={COLOR.TRANSPARENT}
              contentColor={COLOR.DARK_GRAY}
              onClick={() => setIsOpen(false)}
            />
          </CloseButton>
        </MenuContent>
      )}
    </MenuContainer>
  )
}

export default Menu

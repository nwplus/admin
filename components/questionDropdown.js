import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import DropdownArrow from '../assets/arrowDropdown.svg'
import { COLOR } from '../constants'

const Container = styled.div`
  width: 100%;
`

const SelectContainer = styled.div`
  border-radius: ${p => (p.isOpen ? '5px 5px 0 0' : '5px')};
  cursor: pointer;
  position: relative;
  background-color: ${p => (p.locked ? COLOR.GREY_200 : COLOR.WHITE)};
`

const RowContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0em 0.75em;
  cursor: pointer:
  font-family: 'HK Grotesk';
  height: 30px;
  border-radius: 4px;
  font-size: 0.9em;
  border: 1px solid ${COLOR.GREY_500};
`

const OptionsContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 20;
  display: ${p => (p.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  border: solid 1px ${COLOR.GREY_500};
  background-color: ${COLOR.WHITE};
  border-top-style: none;
  cursor: pointer;
`

const StyledOption = styled.div`
  cursor: pointer;
  padding: 0.5em 0.75em;
  display: flex;
  align-items: center;
  font-size: 0.9em;

  &:hover {
    background-color: ${COLOR.MIDNIGHT_PURPLE_LIGHT};
    color: ${COLOR.WHITE};
  }
`

const QuestionDropdown = ({ onSelect, defaultValue, options, locked = null }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onChange = option => {
    onSelect(option)
    setIsOpen(false)
  }

  const dropdownRef = useRef(null)

  useEffect(() => {
    const clickOutside = e => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', clickOutside)
  }, [])

  return (
    <Container>
      <SelectContainer
        isOpen={isOpen}
        ref={dropdownRef}
        hasValue={!!defaultValue}
        onClick={() => setIsOpen(!isOpen)}
        locked={locked}
      >
        <RowContent>
          <div>{defaultValue === null ? 'Select a question type' : defaultValue}</div>
          {!locked && isOpen ? (
            <img src={DropdownArrow} alt="" style={{ transform: 'rotate(90deg)', transition: 'transform 0.3s ease' }} />
          ) : (
            <img src={DropdownArrow} alt="" style={{ transition: 'transform 0.3s ease' }} />
          )}
        </RowContent>
        {!locked && (
          <OptionsContainer isOpen={isOpen}>
            {options.map(o => (
              <StyledOption key={o} onClick={() => onChange(o)}>
                {o}
              </StyledOption>
            ))}
          </OptionsContainer>
        )}
      </SelectContainer>
    </Container>
  )
}

export default QuestionDropdown

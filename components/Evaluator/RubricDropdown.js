import styled from 'styled-components';
import DropdownArrow from '../../assets/arrowDropdown.svg';
import { useEffect, useRef, useState } from 'react';
import { COLOR } from '../../constants';

const Container = styled.div`
    width: 100%;
`

const SelectContainer = styled.div`
    border: solid 1px ${COLOR.EVAL_GREY};
    border-radius: ${p => p.isOpen ? '5px 5px 0 0' : '5px'};
    cursor: pointer;
    background-color: ${p => !p.hasValue && COLOR.LIGHT_GRAY};
    position: relative;
`
const RowContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 25px;
    padding: 10px;
    cursor: pointer:
`

const OptionsContainer = styled.div`
    position: absolute;
    width: 100%;
    z-index: 20;
    top: 46px;
    left: -1px;
    display: ${p => p.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    border: solid 1px ${COLOR.EVAL_GREY};
    background-color: ${COLOR.WHITE};
    border-top-style: none;
    cursor: pointer;
`

const StyledOptionCircle = styled.div`
    border: solid 1px ${COLOR.INACTIVE_DARK_GRAY};
    border-radius: 14.5px;
    width: 60%;
    text-align: center;
`

const StyledOption = styled.div`
    cursor: pointer;
    margin: 10px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover ${StyledOptionCircle} {
        background-color: ${COLOR.MIDNIGHT_PURPLE_MEDIUM};
        color: ${COLOR.WHITE};
    }
`

const rubricOptions = [
    { value: 'DEV', label: 'Developer' },
    { value: 'DESIGN', label: 'Design' },
    { value: 'GENERAL', label: 'General' },
    { value: 'LONG_ANSWER', label: 'Long answer' },
]

const RubricDropdown = ({ onSelect }) => {
    const [selectedValue, setSelectedValue] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const onChange = rubricOption => {
        setSelectedValue(rubricOption.label)
        onSelect(rubricOption.value)
        setIsOpen(false)
    }

    const dropdownRef = useRef(null)

    useEffect(() => {
        const clickOutside = e => { 
            if (dropdownRef.current && isOpen && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', clickOutside);
    }, [dropdownRef])

    return (
        <Container>
            <SelectContainer isOpen={isOpen} ref={dropdownRef} hasValue={!!selectedValue} onClick={() => setIsOpen(!isOpen)}>
                <RowContent>
                    <div>{selectedValue === null ? 'Select a rubric' : selectedValue}</div>
                    <img src={DropdownArrow} />
                </RowContent>
                <OptionsContainer isOpen={isOpen}>
                    { rubricOptions.map(r => <StyledOption onClick={() => onChange(r)}><StyledOptionCircle>{r.label}</StyledOptionCircle></StyledOption>) }
                </OptionsContainer>
            </SelectContainer>
        </Container>
    )
}

export default RubricDropdown
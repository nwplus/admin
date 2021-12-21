import styled from "styled-components";
import DropdownArrow from "../../assets/arrowDropdown.svg";
import { useState } from "react";
import { COLOR } from "../../constants";

const Container = styled.div`
    width: 100%;
`

const SelectContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: solid 1px ${COLOR.EVAL_GREY};
    border-radius: ${p => p.isOpen ? "5px 5px 0 0" : "5px"};
    height: 25px;
    padding: 10px;
    cursor: pointer;
    background-color: ${p => !p.hasValue && COLOR.LIGHT_GRAY};
`

const OptionsContainer = styled.div`
    position: absolute;
    width: 84.5%;
    z-index: 20;
    display: ${p => p.isOpen ? "flex" : "none"};
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
    { value: "DEV", label: "Developer" },
    { value: "DESIGN", label: "Design" },
    { value: "GENERAL", label: "General" },
    { value: "LONG_ANSWER", label: "Long answer" },
]

const RubricDropdown = ({ onSelect }) => {
    const [selectedValue, setSelectedValue] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const onChange = rubricOption => {
        setSelectedValue(rubricOption.label)
        onSelect(rubricOption.value)
        setIsOpen(false)
    }

    return (
        <Container>
            <SelectContainer isOpen={isOpen} hasValue={!!selectedValue} onClick={() => setIsOpen(!isOpen)}>
                <div>{selectedValue === null ? "Select a rubric" : selectedValue}</div>
                <img src={DropdownArrow} />
            </SelectContainer>
            <OptionsContainer isOpen={isOpen}>
                { rubricOptions.map(r => <StyledOption onClick={() => onChange(r)}><StyledOptionCircle>{r.label}</StyledOptionCircle></StyledOption>) }
            </OptionsContainer>
        </Container>
    )
}

export default RubricDropdown
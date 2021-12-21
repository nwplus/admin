import Select from "react-select";
import styled from "styled-components";
import DropdownArrow from "../../assets/arrowDropdown.svg";
import { components } from 'react-select'
import { COLOR } from "../../constants";

const StyledDropdown = styled(Select)`
    .rubricSelect__styledControl:hover,
    .RubricSelect__StyledControl--is-focused {
        border-style: none;
    }

    .RubricSelect__Menu {
        background-color: red;
        border-radius: 7px;
    }
`

const StyledControl = styled(components.Control)`
    background: ${p => !p.hasValue && 'red'};
`

const rubricOptions = [
    { value: "DEV", label: "Developer" },
    { value: "DESIGN", label: "Design" },
    { value: "GENERAL", label: "General/Beginner" },
    { value: "LONG_ANSWER", label: "Long answer" },
]

const Control = props => <StyledControl {...props}>{props.children}</StyledControl>


const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <img src={DropdownArrow} />
        </components.DropdownIndicator>
    )
}

const RubricSelect = ({ onChange }) =>
    <StyledDropdown
        components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
            Control,
        }}
        onChange={e => onChange(e)}
        options={rubricOptions}
        placeholder="Select a rubric"
        isSearchable={false}
    />

export default RubricSelect
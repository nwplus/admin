import styled, { css } from 'styled-components';
import { COLOR } from '../constants';
import NewTabIcon from './NewTabIcon';

const BorderRadius = css`
    border-radius: 4px;
`

const Padding = css`
    padding: 0em 0.75em;
    box-sizing: border-box;
`

const InheritedStyles = css`
    font-family: inherit;
    height: inherit;
    width: inherit;
    background-color: inherit;
`

const StyledTextField = styled.div`
    ${BorderRadius}
    font-family: 'HK Grotesk';
    height: 30px;
    width: 100%;
    background-color: ${p => p.darkMode ? COLOR.MIDNIGHT_PURPLE : COLOR.WHITE};
`

const StyledTextInput = styled.input`
    ${InheritedStyles}
    ${Padding}
    ${BorderRadius};
    border: 1px solid transparent;
    color: ${p => p.darkMode ? (p.isPrefilled ? COLOR.MIDNIGHT_PURPLE_LIGHT : COLOR.WHITE) : p.isPrefilled && COLOR.UNSELECTED_GRAY};

    &:focus {
        ${BorderRadius}
        outline: none;
        border: 1px solid;
        border-color: ${p => p.darkMode ? COLOR.WHITE : COLOR.BLACK};
    }
`

const StyledLinkDiv = styled.div`
    ${InheritedStyles}
    ${BorderRadius}
    ${Padding}
    display: flex;    
    align-items: center;
    justify-content: space-between;
`

const StyledLink = styled.a`
    color: ${COLOR.MIDNIGHT_PURPLE_LIGHT};
    text-decoration: none;
`

const TextField = ({ darkModeEnabled, isLink, prefillValue, customValue, onChangeCustomValue }) => {
    return (
        <StyledTextField darkMode={darkModeEnabled}>
            {
                isLink ?
                <StyledLinkDiv>
                    <StyledLink href={prefillValue} target='_blank'>{prefillValue}</StyledLink>
                    <NewTabIcon href={prefillValue}/>
                </StyledLinkDiv>
                :
                <StyledTextInput
                    type='text'
                    value={prefillValue ? prefillValue : customValue}
                    onChange={e => onChangeCustomValue(e)}
                    darkMode={darkModeEnabled}
                    disabled={prefillValue}
                    isPrefilled={prefillValue}
                />
            }
        </StyledTextField>
    )
}

export default TextField
import styled, { css } from 'styled-components'
import { COLOR } from '../constants'
import Icon from './Icon'

const BorderRadius = css`
  border-radius: 4px;
`

const Padding = css`
  padding: 0em 0.75em;
  box-sizing: border-box;
`

const FontSize = css`
  font-size: 0.9em;
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
  background-color: ${p => (p.darkMode ? COLOR.MIDNIGHT_PURPLE : COLOR.WHITE)};
`

const StyledTextInput = styled.input`
  ${InheritedStyles}
  ${Padding}
    ${BorderRadius}
    ${FontSize}
    border: 1px solid ${COLOR.GREY_500};
  color: ${p =>
    p.darkMode ? (p.isPrefilled ? COLOR.MIDNIGHT_PURPLE_LIGHT : COLOR.WHITE) : p.isPrefilled && COLOR.UNSELECTED_GRAY};

  &:focus {
    ${BorderRadius}
    outline: none;
    border: 1px solid;
    border-color: ${p => (p.darkMode ? COLOR.WHITE : COLOR.BLACK)};
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
  text-decoration: none;
`

const StyledLinkText = styled.div`
  ${FontSize}
  color: ${COLOR.MIDNIGHT_PURPLE_LIGHT};
`

const TextField = ({ darkModeEnabled, isLink, prefillValue, customValue, onChangeCustomValue, placeholder }) => {
  return (
    <StyledTextField darkMode={darkModeEnabled}>
      {isLink ? (
        <StyledLinkDiv>
          <StyledLink href={prefillValue} target="_blank">
            <StyledLinkText>{prefillValue}</StyledLinkText>
          </StyledLink>
          <a href={prefillValue} target="_blank" rel="noreferrer">
            <Icon icon="external-link-alt" color={COLOR.BLACK} />
          </a>
        </StyledLinkDiv>
      ) : (
        <StyledTextInput
          type="text"
          value={prefillValue || customValue}
          onChange={e => onChangeCustomValue(e)}
          darkMode={darkModeEnabled}
          disabled={prefillValue}
          isPrefilled={prefillValue}
          placeholder={placeholder}
        />
      )}
    </StyledTextField>
  )
}

export default TextField

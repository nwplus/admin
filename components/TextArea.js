import styled from 'styled-components'
import { COLOR } from '../constants'

export const TextArea = styled.textarea`
  ${props =>
    props.inline ? 'flex-grow: 1; width: 50%; border-radius: 2px 0 0 2px;' : 'width: 100%; border-radius: 2px;'}

  height: 40px;
  border: 1px solid ${COLOR.DARK_GRAY};
  box-sizing: border-box;
  margin-bottom: 0.75rem;
  padding: 0 0.75rem;
  background: ${COLOR.WHITE};
  font-family: inherit;
  resize: vertical;
  overflow-y: auto;
  padding: 0.5rem; /* Padding inside the textarea */
  font-size: 16px;
`

export default TextArea

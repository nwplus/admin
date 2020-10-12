import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { COLOR } from '../constants';

const EditingText = styled.textarea`
  border: 1px solid ${COLOR.DARK_GRAY};
  border-radius: 2px;
  overflow: hidden;
  background-color: ${COLOR.WHITE};
  outline: none;
  padding: 10px 16px 0px 16px;
  height: 0px;
  width: ${(props) => (props.width ? `${props.width};` : '100%;')};
  font-family: inherit;
  font-size: 16px;
  margin-bottom: 0.75rem;
`;

export default function TextBox(props) {
  const { defaultValue, resize, onChange } = props;

  // sets the heights for all textareas based on their scroll height
  const calculateTextAreaHeight = () => {
    const textareas = document.getElementsByClassName('textarea');
    Array.prototype.forEach.call(textareas, (textarea) => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight - 5}px`;
    });
  };

  // get previous defaultValue
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const previousValue = usePrevious({ props });

  // run calculateTextAreaHeight() the first time, then for the subsequent times, only run when the new value entered is different from the old value
  useEffect(() => {
    if (previousValue) {
      if (
        previousValue.props &&
        previousValue.props.defaultValue !== props.defaultValue
      ) {
        calculateTextAreaHeight();
      }
    } else {
      // no previous value, meaning this is the first time the textbox component is called
      calculateTextAreaHeight();
    }
  });

  const styleObj = {
    resize: resize ? 'vertical' : 'none',
  };

  return (
    <EditingText
      style={styleObj}
      className="textarea"
      defaultValue={defaultValue}
      width={props.width}
      onChange={onChange}
    />
  );
}

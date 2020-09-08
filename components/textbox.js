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
`;

export default function TextBox(props) {
  // sets the heights for all textareas based on their scroll height
  const calculateTextAreaHeight = () => {
    const textareas = document.getElementsByClassName('textarea');
    Array.prototype.forEach.call(textareas, function (textarea) {
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
    resize: props.resize ? 'vertical' : 'none',
  };

  return (
    <EditingText
      style={styleObj}
      className="textarea"
      defaultValue={props.defaultValue}
      width={props.width}
      onChange={props.onChange}
    />
  );
}

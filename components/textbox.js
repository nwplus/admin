import { useEffect } from 'react';
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
  const { defaultValue, resize, onChange } = props;

  // sets the heights for all textareas based on their scroll height
  const calculateTextAreaHeight = () => {
    const textareas = document.getElementsByClassName('textarea');
<<<<<<< HEAD
    Array.prototype.forEach.call(textareas, textarea => {
      textarea.style.height = 'auto';
=======
    Array.prototype.forEach.call(textareas, function (textarea) {
>>>>>>> master
      textarea.style.height = `${textarea.scrollHeight - 5}px`;
    });
  };

  useEffect(() => {
    calculateTextAreaHeight();
  });

  const styleObj = {
<<<<<<< HEAD
    resize: resize ? 'vertical' : 'none'
=======
    resize: props.resize ? 'vertical' : 'none',
>>>>>>> master
  };

  return (
    <EditingText
      style={styleObj}
      className="textarea"
<<<<<<< HEAD
      defaultValue={defaultValue}
      onChange={onChange}
=======
      defaultValue={props.defaultValue}
      width={props.width}
      onChange={props.onChange}
>>>>>>> master
    />
  );
}

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { COLOR } from '../constants';
import ArrowIcon from './icons/arrow';

const DropdownContainer = styled.div`
  width: 100%;
`;

const Select = ({
  type = 'button',
  isOpened,
  onKeyDown,
  onClick,
  children,
}) => {
  return (
    <>
      <SelectContent type={type} onKeyDown={onKeyDown} onClick={onClick}>
        {isOpened && <TransformedArrow flip />}
        {!isOpened && <TransformedArrow />}
        {children}
      </SelectContent>
    </>
  );
};

const TransformedArrow = styled(ArrowIcon)`
  position: absolute;
  margin-top: 0.25rem;
  ${(props) =>
    props.flip
      ? 'transform-origin: 50% 50%; transform: rotate(180deg); padding-right: 14.75rem;'
      : 'padding-left: 14.75rem;'}
`;

const SelectContent = styled.button`
  width: 95%;
  height: 40px;
  border: 1px solid ${COLOR.DARK_GRAY};
  border-radius: 2px;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
  padding: 0 0.75rem;
  background: ${COLOR.WHITE};
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
`;

const OptionsContainer = styled.div`
  width: 32%;
  color: ${COLOR.WHITE};
  padding: 0.25rem 0;
  position: fixed;
`;

const OptionList = styled.ul`
  display: ${({ isOpened }) => (isOpened ? 'block' : 'none')};
  list-style: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const Option = styled.li`
  display: block;
  padding: 0.75rem;
  height: 18px;
  line-height: 16px;
  vertical-align: middle;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.25);
  color: ${COLOR.BLACK};
  background: ${({ isActive }) => (isActive ? COLOR.GRAY : COLOR.WHITE)};
  cursor: pointer;
`;

export default function Dropdown({ options, onChange, defaultValue }) {
  const [isOpened, updateIsOpened] = useState(false);
  const [activeItem, updateActiveItem] = useState(
    options[options.findIndex((category) => category.label === defaultValue)] ||
      options[0]
  );
  const optionsListRef = useRef(null);

  const handleOptionClick = (item) => {
    onChange(item);
    updateActiveItem(item);
    updateIsOpened(false);
  };

  const handleButtonKeyDown = (e) => {
    // Enter is pressed
    e.preventDefault();

    if (e.keyCode === 13) {
      updateIsOpened(!isOpened);
    }
  };

  useEffect(() => {
    if (isOpened) {
      optionsListRef.current.focus();
    }
  }, [isOpened]);

  return (
    <DropdownContainer>
      <Select
        type="button"
        isOpened={isOpened}
        onKeyDown={handleButtonKeyDown}
        onClick={() => updateIsOpened(!isOpened)}
      >
        {activeItem.label}
      </Select>
      <OptionsContainer>
        <OptionList
          tabIndex="-1"
          ref={optionsListRef}
          isOpened={isOpened}
          role="listbox"
        >
          {options.map((option) => (
            <Option
              id={option.label}
              key={option.label}
              isActive={option.label === activeItem.label}
              onClick={() => handleOptionClick(option)}
              role="option"
            >
              {option.label}
            </Option>
          ))}
        </OptionList>
      </OptionsContainer>
    </DropdownContainer>
  );
}

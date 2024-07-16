import React, { useState } from 'react'
import TextField from './TextField'
import styled from 'styled-components'
import { COLOR, QUESTION_TYPES } from '../constants'
import QuestionDropdown from './questionDropdown'
import Icon from './Icon'
import Toggle from 'react-toggle'

const QuestionTitle = styled.p`
  color: ${COLOR.MIDNIGHT_PURPLE_DEEP};
  font-weight: 800;
  font-size: 16px;
  margin: 10px 0px;
`

const OptionsContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`

const StyledQuestionButton = styled.button`
  border: none;
  background: transparent;
  display: block;
  margin: 10px auto;
  &:hover {
    transform: scale(1.2);
  }
  i {
    transform: scale(1.3);
  }
`

const QuestionCard = ({ title, desc, type, qOptions, isOther, isRequired }) => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [options, setOptions] = useState(['']);
  const [other, setOther] = useState(false);
  const [required, setRequired] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <div style={{border: `1px solid ${COLOR.MIDNIGHT_PURPLE_DEEP}`, borderRadius: "16px", padding: "30px" }}>
      <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Question</QuestionTitle>
      <TextField
            placeholder="Question title"
            customValue={questionTitle}
            onChangeCustomValue={e => setQuestionTitle(e.target.value)}
      />
      <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Description (optional)</QuestionTitle>
      <TextField
            placeholder="Question description"
            customValue={description}
            onChangeCustomValue={e => setDescription(e.target.value)}
      />
      <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Question Type</QuestionTitle>
      <QuestionDropdown onSelect={o => setQuestionType(o)} defaultValue={questionType} />
      {[QUESTION_TYPES.MCQ, QUESTION_TYPES.DROPDOWN, QUESTION_TYPES.SELECTALL, QUESTION_TYPES.CHECKBOX].includes(questionType) ? (
        <div>
          <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Options</QuestionTitle>
          <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            {options.map((option, index) => (
                <OptionsContent key={index}>
                <TextField
                    placeholder={`Option ${index+1}`}
                    customValue={option}
                    onChangeCustomValue={e => handleOptionChange(index, e.target.value)}
                />
                <StyledQuestionButton onClick={() => removeOption(index)}>
                    <Icon color={COLOR.MIDNIGHT_PURPLE_DEEP} icon="trash-alt" />
                </StyledQuestionButton>
                </OptionsContent>
            ))}
          </div>
          <StyledQuestionButton onClick={addOption}>
            <Icon className="test" color={COLOR.MIDNIGHT_PURPLE_DEEP} icon="plus-circle"/>
          </StyledQuestionButton>
          <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
            <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Add Other</QuestionTitle>
            <Toggle
                defaultChecked={other}
                icons={false}
                onChange={() => setOther(!other)} />
          </div>
        </div>
      ) : null}
      <div style={{display: "flex", alignItems: "center", gap: "10px", justifyContent: "flex-end"}}>
            <Toggle
                defaultChecked={required}
                icons={false}
                onChange={() => setRequired(!required)} />
            <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Required</QuestionTitle>
          </div>
    </div>
  );
};

export default QuestionCard;

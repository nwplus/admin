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

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const StyledField = styled.input`
  color: ${COLOR.MIDNIGHT_PURPLE_DEEP};
  border: none;
  background-color: none;
  outline: 0;
  font-size: 24px;
  font-weight: 700;
  width: 70%;
  height: 30px;
  overflow: auto;
  border: none;
  font-family: 'HK Grotesk';
  cursor: none;
  &:focus {
    border: none;
    background-color: none;
    outline: 0;
  }
`

const Bar = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  i {
    transform: scale(1.3);
  }
`

const QuestionCard = ({ question, removeQuestion, id, moveUp, moveDown, handleChange, duplicateQuestion }) => {
  const [required, setRequired] = useState(question.required || false);
  const [isToggled, setToggled] = useState(question.toggled || true);

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    handleChange(id, 'options', newOptions);
  };

  const addOption = () => {
    handleChange(id, 'options', [...question.options, '']);
  };

  const removeOption = (index) => {
    const newOptions = question.options.filter((_, i) => i !== index);
    handleChange(id, 'options', newOptions);
  };

  return (
    <div style={{border: `1px solid ${COLOR.MIDNIGHT_PURPLE_DEEP}`, borderRadius: "16px", padding: "30px", width: "40vw" }}>
      <TitleBar>
        <Bar style={{width: "90%"}}>
            <Icon color={COLOR.MIDNIGHT_PURPLE_DEEP} icon="question-circle"/>
            <StyledField type="text" placeholder="Untitled" value={question.title} readonly/>
        </Bar>
        <Bar>
            <StyledQuestionButton onClick={() => setToggled(!isToggled)}>
                <Icon color={COLOR.MIDNIGHT_PURPLE_DEEP} icon="compress" />
            </StyledQuestionButton>
            <StyledQuestionButton onClick={() => moveUp(id)}>
                <Icon color={COLOR.MIDNIGHT_PURPLE_DEEP} icon="arrow-up" />
            </StyledQuestionButton>
            <StyledQuestionButton onClick={() => moveDown(id)}>
                <Icon color={COLOR.MIDNIGHT_PURPLE_DEEP} icon="arrow-down" />
            </StyledQuestionButton>
            <StyledQuestionButton onClick={() => duplicateQuestion(id)}>
                <Icon color={COLOR.MIDNIGHT_PURPLE_DEEP} icon="copy" />
            </StyledQuestionButton>
            <StyledQuestionButton onClick={() => removeQuestion(id)}>
                <Icon color={COLOR.MIDNIGHT_PURPLE_DEEP} icon="trash-alt" />
            </StyledQuestionButton>
        </Bar>
      </TitleBar>
      
      {isToggled && <>
      <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Question</QuestionTitle>
      <TextField
            placeholder="Question title"
            customValue={question.title}
            onChangeCustomValue={e => handleChange(id, 'title', e.target.value)}
      />
      <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Description (optional)</QuestionTitle>
      <TextField
            placeholder="Question description"
            customValue={question.description}
            onChangeCustomValue={e => handleChange(id, 'description', e.target.value)}
      />
      <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Question Type</QuestionTitle>
      <QuestionDropdown onSelect={o => handleChange(id, 'type', o)} defaultValue={question.type} />
      </>}
      {isToggled && [QUESTION_TYPES.MCQ, QUESTION_TYPES.DROPDOWN, QUESTION_TYPES.SELECTALL, QUESTION_TYPES.CHECKBOX].includes(question.type) ? (
        <div>
          <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Options</QuestionTitle>
          <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            {question.options.map((option, index) => (
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
                checked={question.other}
                icons={false}
                onChange={() => handleChange(id, 'other', !question.other)} />
          </div>
        </div>
      ) : null}
      {isToggled && <div style={{display: "flex", alignItems: "center", gap: "10px", justifyContent: "flex-end"}}>
            <Toggle
                checked={question.required}
                icons={false}
                onChange={() => handleChange(id, 'required', !question.required)} />
            <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Required</QuestionTitle>
      </div>}
    </div>
  );
};

export default QuestionCard;

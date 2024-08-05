import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Toggle from 'react-toggle'
import TextField from './TextField'
import { BASIC_INFO_FORM_INPUT_FIELDS, COLOR, QUESTION_TYPES, SKILLS_FORM_INPUT_FIELDS } from '../constants'
import QuestionDropdown from './questionDropdown'
import Icon from './Icon'

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
  user-select: none;
  cursor: default;
  &:focus {
    border: none;
    background-color: none;
    outline: 0;
  }
`

const StyledToggle = styled(Toggle)`
  &.react-toggle--checked .react-toggle-track {
    background: linear-gradient(92.58deg, #0defe1 0%, #78ff96 100%);
  }

  &.react-toggle--checked .react-toggle-thumb {
    left: 31px !important;
  }

  .react-toggle-track {
    background-color: transparent !important;
    border: 2px solid #2c2543;
    margin: 0 !important;
    height: 20px !important;
  }

  .react-toggle-thumb {
    background-color: #2c2543 !important;
    top: 4px !important;
    width: 16px !important;
    height: 16px !important;
  }

  &.react-toggle:not(.react-toggle--checked) .react-toggle-thumb {
    left: 5px !important;
  }
`

const StyledQuestionCard = styled.div`
  border: 1px solid ${COLOR.MIDNIGHT_PURPLE_DEEP};
  border-radius: 16px;
  padding: 30px;
  width: 40vw;
`

const Bar = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  i {
    transform: scale(1.3);
  }
`

const StyledOtherToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const StyledOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const QuestionCard = ({
  question,
  removeQuestion,
  id,
  moveUp,
  moveDown,
  handleChange,
  duplicateQuestion,
  locked,
  questions,
}) => {
  const [isToggled, setToggled] = useState(true)
  const [formInputOptions, setFormInputOptions] = useState(BASIC_INFO_FORM_INPUT_FIELDS)

  useEffect(() => {
    const pathSegments = location.pathname.split('/')
    const currentSection = pathSegments[pathSegments.length - 1]

    let allOptions
    if (currentSection === 'basicinfo') {
      allOptions = BASIC_INFO_FORM_INPUT_FIELDS
    } else if (currentSection === 'skills') {
      allOptions = SKILLS_FORM_INPUT_FIELDS
    }
    const selectedFormInputs = questions.map(q => q.formInput)
    const filteredOptions = allOptions.filter(
      option => !selectedFormInputs.includes(option) || option === question.formInput
    )

    setFormInputOptions(filteredOptions)
  }, [location.pathname, questions, question.formInput])

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options]
    newOptions[index] = value
    handleChange(id, 'options', newOptions)
  }

  const addOption = () => {
    handleChange(id, 'options', [...question.options, ''])
  }

  const removeOption = index => {
    const newOptions = question.options.filter((_, i) => i !== index)
    handleChange(id, 'options', newOptions)
  }

  return (
    <StyledQuestionCard>
      <TitleBar>
        <Bar style={{ width: '90%' }}>
          <Icon color={COLOR.MIDNIGHT_PURPLE_DEEP} icon="question-circle" />
          <StyledField type="text" placeholder="Untitled" value={question.title || ''} readOnly />
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

      {isToggled && (
        <>
          <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Question</QuestionTitle>
          <TextField
            placeholder="Question title"
            customValue={question.title || ''}
            onChangeCustomValue={e => handleChange(id, 'title', e.target.value)}
          />
          <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Description (optional)</QuestionTitle>
          <TextField
            placeholder="Question description"
            customValue={question.description || ''}
            onChangeCustomValue={e => handleChange(id, 'description', e.target.value)}
          />
          <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Form Input Field</QuestionTitle>
          <QuestionDropdown
            onSelect={o => handleChange(id, 'formInput', o)}
            defaultValue={question.formInput || ''}
            options={formInputOptions}
            locked={locked}
          />
          <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Question Type</QuestionTitle>
          <QuestionDropdown
            onSelect={o => handleChange(id, 'type', o)}
            defaultValue={question.type || ''}
            options={Object.values(QUESTION_TYPES)}
          />
        </>
      )}
      {isToggled &&
      [QUESTION_TYPES.MCQ, QUESTION_TYPES.DROPDOWN, QUESTION_TYPES.SELECTALL, QUESTION_TYPES.CHECKBOX].includes(
        question.type
      ) ? (
        <div>
          <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Options</QuestionTitle>
          <StyledOptions>
            {(question.options || []).map((option, index) => (
              <OptionsContent key={index}>
                <TextField
                  placeholder={`Option ${index + 1}`}
                  customValue={option}
                  onChangeCustomValue={e => handleOptionChange(index, e.target.value)}
                />
                <StyledQuestionButton onClick={() => removeOption(index)}>
                  <Icon color={COLOR.MIDNIGHT_PURPLE_DEEP} icon="trash-alt" />
                </StyledQuestionButton>
              </OptionsContent>
            ))}
          </StyledOptions>
          <StyledQuestionButton onClick={addOption}>
            <Icon color={COLOR.MIDNIGHT_PURPLE_DEEP} icon="plus-circle" />
          </StyledQuestionButton>
          <StyledOtherToggle>
            <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Add Other</QuestionTitle>
            <StyledToggle
              checked={question.other || false}
              icons={false}
              onChange={() => handleChange(id, 'other', !question.other)}
            />
          </StyledOtherToggle>
        </div>
      ) : null}
      {isToggled && (
        <StyledOtherToggle style={{ justifyContent: 'flex-end' }}>
          <StyledToggle
            checked={question.required || false}
            icons={false}
            onChange={() => handleChange(id, 'required', !question.required)}
          />
          <QuestionTitle color={`${COLOR.MIDNIGHT_PURPLE_DEEP}`}>Required</QuestionTitle>
        </StyledOtherToggle>
      )}
    </StyledQuestionCard>
  )
}

export default QuestionCard

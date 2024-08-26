import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  getHackathonPaths,
  getHackathons,
  getHackerAppQuestions,
  updateHackerAppQuestions,
  getHackerAppQuestionsMetadata,
  formatDate,
  getTimestamp,
  updateHackerAppQuestionsMetadata,
} from '../../../utility/firebase'
import Page from '../../../components/page'
import { HACKER_APP_NAVBAR, COLOR } from '../../../constants'
import QuestionCard from '../../../components/questionCard'
import Icon from '../../../components/Icon'
import Button from '../../../components/button'
import { useAuth } from '../../../utility/auth'

const HeaderContainer = styled.div`
  display: flex;
`

const Header = styled.h1`
  margin-top: 0;
  font-weight: 600;
  font-size: 32px;
  color: ${COLOR.MIDNIGHT_PURPLE_DEEP};
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

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 60px;
  right: 80px;
`

const StyledMetadataP = styled.p`
  position: absolute;
  top: 100px;
  right: 80px;
  color: ${COLOR.MIDNIGHT_PURPLE};
`

export default ({ id, hackathons }) => {
  const [questions, setQuestions] = useState([
    { title: '', description: '', type: '', options: [''], other: false, required: false, formInput: '', maxWords: '' },
  ])
  const [metadata, setMetadata] = useState({})
  const { email: user } = useAuth().user

  useEffect(() => {
    const fetchQuestions = async () => {
      const appQuestions = await getHackerAppQuestions(id, 'Skills')
      setQuestions(appQuestions)
    }
    const fetchMetadata = async () => {
      const fetchedMetadata = await getHackerAppQuestionsMetadata(id, 'Skills')
      setMetadata(fetchedMetadata)
    }
    fetchQuestions()
    fetchMetadata()
  }, [id])

  const addQuestion = index => {
    const newQuestions = [...questions]
    newQuestions.splice(index + 1, 0, {
      title: '',
      description: '',
      type: '',
      options: [''],
      other: false,
      required: false,
      formInput: '',
    })
    setQuestions(newQuestions)
  }

  const removeQuestion = index => {
    const newQuestions = questions.filter((_, i) => i !== index)
    setQuestions(newQuestions)
  }

  const handleChange = (index, field, value) => {
    const newQuestions = [...questions]
    newQuestions[index][field] = value
    setQuestions(newQuestions)
  }

  const moveUp = index => {
    if (index > 0) {
      const newQuestions = [...questions]
      ;[newQuestions[index - 1], newQuestions[index]] = [newQuestions[index], newQuestions[index - 1]]
      setQuestions(newQuestions)
    }
  }

  const moveDown = index => {
    if (index < questions.length - 1) {
      const newQuestions = [...questions]
      ;[newQuestions[index + 1], newQuestions[index]] = [newQuestions[index], newQuestions[index + 1]]
      setQuestions(newQuestions)
    }
  }

  const duplicateQuestion = index => {
    const newQuestions = [...questions]
    const duplicate = { ...newQuestions[index] }
    newQuestions.splice(index + 1, 0, duplicate)
    setQuestions(newQuestions)
  }

  const validateQuestions = questions => {
    for (let question of questions) {
      if (!question.formInput || question.formInput.trim() === '') {
        return false
      }
    }
    return true
  }

  const handleSave = async hackathon => {
    const validated = validateQuestions(questions)
    if (!validated) {
      alert('Please make sure that you have selected a formInput field for each question.')
      return
    }
    await updateHackerAppQuestions(hackathon, questions, 'Skills')
    const newMetadata = { lastEditedAt: getTimestamp(), lastEditedBy: user }
    setMetadata(newMetadata)
    await updateHackerAppQuestionsMetadata(hackathon, 'Skills', newMetadata)
    alert('Questions were saved to the database!')
  }

  return (
    <>
      <Page
        currentPath={`hackerapps/${id}`}
        hackathons={hackathons}
        hackerAppHeader={id}
        hackerAppNavbarItems={HACKER_APP_NAVBAR}
      >
        <StyledButton
          color={COLOR.MIDNIGHT_PURPLE_DEEP}
          contentColor={COLOR.WHITE}
          hoverBackgroundColor={COLOR.MIDNIGHT_PURPLE_LIGHT}
          onClick={async () => {
            await handleSave(id)
          }}
        >
          <Icon color={COLOR.WHITE} icon="save" />
          Save
        </StyledButton>
        <StyledMetadataP>{`Last Edited by ${metadata.lastEditedBy} at ${formatDate(
          metadata.lastEditedAt?.seconds
        )}`}</StyledMetadataP>
        <HeaderContainer>
          <Header>3. Add skills and long answer questions</Header>
        </HeaderContainer>
        <QuestionsContainer>
          {questions.map((question, index) => (
            <React.Fragment key={index}>
              <QuestionCard
                question={question}
                id={index}
                removeQuestion={removeQuestion}
                handleChange={handleChange}
                moveUp={moveUp}
                moveDown={moveDown}
                duplicateQuestion={duplicateQuestion}
                locked={question.formInput}
                questions={questions}
              />
              <StyledQuestionButton
                onClick={() => {
                  addQuestion(index)
                }}
              >
                <Icon color={COLOR.MIDNIGHT_PURPLE_DEEP} icon="plus-circle" />
              </StyledQuestionButton>
            </React.Fragment>
          ))}
        </QuestionsContainer>
      </Page>
    </>
  )
}

export const getStaticPaths = async () => {
  return getHackathonPaths()
}

export const getStaticProps = async ({ params }) => {
  const hackathons = await getHackathons()
  return {
    props: {
      hackathons,
      id: params.id,
    },
  }
}

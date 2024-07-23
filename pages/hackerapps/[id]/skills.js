import React, { useState } from 'react'
import styled from 'styled-components'
import { getHackathonPaths, getHackathons } from '../../../utility/firebase'
import Page from '../../../components/page'
import { HACKER_APP_NAVBAR, COLOR } from '../../../constants'
import QuestionCard from '../../../components/questionCard'
import Icon from '../../../components/Icon'

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

export default ({ id, hackathons }) => {
  const [questions, setQuestions] = useState([
    { title: '', description: '', type: '', options: [''], other: false, required: false },
  ])

  const addQuestion = () => {
    setQuestions([...questions, { title: '', description: '', type: '', options: [''], other: false, required: false }])
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

  return (
    <>
      <Page
        currentPath={`hackerapps/${id}`}
        hackathons={hackathons}
        hackerAppHeader={id}
        hackerAppNavbarItems={HACKER_APP_NAVBAR}
      >
        <HeaderContainer>
          <Header>3. Add skills and long answer questions</Header>
        </HeaderContainer>
        <QuestionsContainer>
          {questions.map((question, index) => (
            <>
              <QuestionCard
                question={question}
                id={index}
                removeQuestion={removeQuestion}
                handleChange={handleChange}
                moveUp={moveUp}
                moveDown={moveDown}
                duplicateQuestion={duplicateQuestion}
              />
              <StyledQuestionButton onClick={addQuestion}>
                <Icon color={COLOR.MIDNIGHT_PURPLE_DEEP} icon="plus-circle" />
              </StyledQuestionButton>
            </>
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

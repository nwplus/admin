import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  getHackerAppQuestions,
  getHackathonPaths,
  getHackathons,
  updateHackerAppQuestions,
} from '../../../utility/firebase'
import Page from '../../../components/page'
import { HACKER_APP_NAVBAR, COLOR } from '../../../constants'
import QuestionCard from '../../../components/questionCard'
import Icon from '../../../components/Icon'
import Button from '../../../components/button'

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

export default ({ id, hackathons }) => {
  const [questions, setQuestions] = useState([
    { title: '', description: '', type: '', options: [''], other: false, required: false },
  ])

  useEffect(() => {
    const fetchQuestions = async () => {
      const appQuestions = await getHackerAppQuestions(id, 'BasicInfo')
      setQuestions(appQuestions)
    }
    fetchQuestions()
    return () => {
      setQuestions([])
    }
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

  const handleSave = async hackathon => {
    await updateHackerAppQuestions(hackathon, questions, 'BasicInfo')
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
          onClick={() => {
            handleSave(id)
          }}
        >
          <Icon color={COLOR.WHITE} icon="save" />
          Save
        </StyledButton>
        <HeaderContainer>
          <Header>2. Add basic information questions</Header>
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

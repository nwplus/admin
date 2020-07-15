import Card, {
  CardHeader,
  CardTitle,
  CardButtonContainer,
  CardContent
} from "../components/card"
import Button from "../components/button"
import EditFAQIcon from "../components/icons/editFAQ"
import NewIcon from "../components/icons/new"
import SearchIcon from "../components/icons/search"
import CloseIcon from "../components/icons/close"
import { COLOR } from "../constants"
import { EDIT, NEW } from "../constants"
import styled from "styled-components"
import React from "react"

const ViewDetailsButton = styled.div`
  width: 22px;
  height: 22px;

  background: ${COLOR.BLACK};
  mix-blend-mode: normal;
  transform: matrix(1, 0, 0, -1, 0, 0);
`

const FAQContent = styled.table`
  width: 846px;
  height: 456px;
  left: 465px;
  top: 327px;

  border: 1px solid ${COLOR.BLACK};
  box-sizing: border-box;
  border-radius: 3px;
`

const TableRow = styled.tr`
  height: 56px;
  border-top: 2px solid ${COLOR.GRAY};
`

const TableHeader = styled.th`
  width: 95px;
  height: 12px;

  font-family: Apercu Pro;
  font-size: 16px;
  line-height: 11px;

  margin-top: 26px;
  margin-bottom: 18px;
  margin-left: 28px;
`

const TableData = styled.td`
  width: 280px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 12px;

  font-family: Apercu Pro;
  font-size: 16px;
  line-height: 11px;

  margin-left: 28px;
  margin-top: 18px;
  margin-bottom: 18px;

  color: #5a5a5a;
`

const TransparentButton = styled.button`
  width: 48px;
  height: 48px;
  margin-right: 4px;
  background-color: Transparent;
  border: 0;
  padding: 6px;
  cursor: pointer;
`
function QuestionRow(props) {
  console.log(props)
  return (
    <TableRow>
      <TableData>{props.question}</TableData>
      <TableData>{props.category}</TableData>
      <TableData>{props.modified}</TableData>
      <TableData>
        <TransparentButton>
          <SearchIcon />
        </TransparentButton>
        <TransparentButton>
          <EditFAQIcon />
        </TransparentButton>
        <TransparentButton>
          <CloseIcon />
        </TransparentButton>
      </TableData>
    </TableRow>
  )
}

class FAQ extends React.Component {
  // Handler for edit modal
  constructor() {
    super()
    this.state = {
      hackathon: "TestHackathon2020",
      questionsList: [
        {
          question: "How can I sign up",
          answer: "nwplus.io",
          category: "General",
          modified: "2019-05-10 03:22:22"
        },
        {
          question: "What is a hackathon",
          answer: "nwplus.io",
          category: "General",
          modified: "2020-05-10 03:22:22"
        },
        {
          question: "blah blah blah",
          answer: "blah",
          category: "General",
          modified: "2019-05-10 03:22:22"
        },
        {
          question: "is nwplus good",
          answer: "hell yeah",
          category: "General",
          modified: "2019-05-10 03:22:22"
        },
        {
          question: "hell yeah",
          answer: "nwplus.io",
          category: "General",
          modified: "2020-05-10 03:22:22"
        },
        {
          question: "blah blah blah",
          answer: "nwplus.io",
          category: "General",
          modified: "2019-05-10 03:22:22"
        },
        {
          question: "is nwplus cool",
          answer: "nwplus.io",
          category: "General",
          modified: "2019-05-10 03:22:22"
        },
        {
          question: "i love nwplus",
          answer: "ya",
          category: "General",
          modified: "2020-05-10 03:22:22"
        },
        {
          question: "blah blah blah",
          answer: "nwplus.io",
          category: "General",
          modified: "2019-05-10 03:22:22"
        }
      ]
    }
  }
  editItem = (e) => {
    /* TODO */
  }

  // Handler for saving changes the user made
  confirmEdit = (e) => {
    /* TODO */
  }

  // view details for a particular question
  viewDetails = (e) => {
    /* TODO */
  }

  // removes an FAQ
  removeItem = (e) => {
    /* TODO */
  }

  render() {
    const questions = this.state.questionsList
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardButtonContainer>
              <Button type={NEW}>New Question</Button>
            </CardButtonContainer>
          </CardHeader>
          <CardContent style={{ backgroundColor: COLOR.BACKGROUND }}>
            <FAQContent>
              <thead>
                <TableRow>
                  <TableHeader>Question</TableHeader>
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Last Modified</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {questions.map((item, id) => (
                  <QuestionRow
                    question={item.question}
                    category={item.category}
                    modified={item.modified}
                  />
                ))}
              </tbody>
            </FAQContent>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

export default FAQ

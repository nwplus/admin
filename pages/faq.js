import Card, {
  CardHeader,
  CardTitle,
  CardButtonContainer,
  CardContent
} from '../components/card'
import Button from '../components/button'
import Modal, { ModalTitle } from '../components/modal'
import EditIcon from '../components/icons/edit'
import EditFAQIcon from '../components/icons/editFAQ'
import NewIcon from '../components/icons/new'
import SearchIcon from '../components/icons/search'
import CloseIcon from '../components/icons/close'
import { COLOR } from '../constants'
import { EDIT, NEW } from '../constants'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { fireDb } from '../utility/firebase'

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
          <EditIcon color={COLOR.BLACK} />
        </TransparentButton>
        <TransparentButton>
          <CloseIcon />
        </TransparentButton>
      </TableData>
    </TableRow>
  )
}

export default function Faq() {
  const [isModalOpen, setModalOpen] = useState({})
  const [faqs, setFaqs] = useState({})
  const [hackathon, setHackathon] = useState({})

  if (Object.keys(faqs).length === 0) {
    fireDb.getFaqs().then((res) => {
      console.log(res)
      setFaqs(res)
    })
  }
  useEffect(
    () => {
      // render the questions here
      console.log(faqs)
    },
    { faqs }
  )

  const toggleState = (e) => {
    e.preventDefault()
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  const onEscKeyDown = (e) => {
    console.log('got here')
    if (e.key !== 'Escape' && !this.state.isModalOpen) return
    this.setState({ isModalOpen: false })
  }
  const editItem = (e) => {
    /* TODO */
  }

  // Handler for saving changes the user made
  const confirmEdit = (e) => {
    /* TODO */
  }

  // view details for a particular question
  const viewDetails = (e) => {
    /* TODO */
  }

  // removes an FAQ
  const removeItem = (e) => {
    /* TODO */
  }

  return (
    // const questions = this.state.questionsList
    <React.Fragment>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardButtonContainer>
            {/* <Button type={NEW} onClick={this.toggleState}>
              New Question
              <div>Modal is: {this.state.isModalOpen ? 'Open' : 'Closed'}</div>
            </Button> */}
          </CardButtonContainer>
        </CardHeader>
        <CardContent style={{ backgroundColor: COLOR.BACKGROUND }}>
          {/* <FAQContent>
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
            </FAQContent> */}
        </CardContent>
      </Card>
      {/* {this.state.isModalOpen && (
          <Modal show={this.state.isModalOpen}>
            <ModalTitle>New Item</ModalTitle>
          </Modal>
        )} */}
    </React.Fragment>
  )
}

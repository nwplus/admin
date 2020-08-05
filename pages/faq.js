import Card, {
  CardHeader,
  CardTitle,
  CardButtonContainer,
  CardContent
} from '../components/card'
import Button from '../components/button'
// import Modal, { ModalTitle } from '../components/modal'
import EditIcon from '../components/icons/edit'
import NewIcon from '../components/icons/new'
import ViewIcon from '../components/icons/view'
import CloseIcon from '../components/icons/close'
import { COLOR } from '../constants'
import { EDIT, NEW } from '../constants'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { fireDb } from '../utility/firebase'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Modal from 'react-modal'

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
`

const TableHeader = styled.th`
  text-align: left !important;
  width: 95px;
  height: 12px;

  font-family: Apercu Pro;
  font-size: 16px;
  line-height: 11px;

  margin-top: 26px;
  margin-bottom: 18px;
  padding-left: 28px;
`

const TableData = styled.td`
  max-width: 280px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 12px;
  vertical-align: middle;

  font-family: Apercu Pro;
  font-size: 16px;
  line-height: 11px;

  padding-left: 28px;
  margin-top: 18px;
  margin-bottom: 18px;

  border-top: 2px solid ${COLOR.GRAY} !important;
  color: #5a5a5a;
`

const TransparentButton = styled.button`
  width: 48px;
  height: 48px;
  background-color: Transparent;
  border: 0;
  padding: 6px;
  cursor: pointer;
`

export default function Faq() {
  const [isModalOpen, setModalOpen] = useState({})
  const [faqs, setFaqs] = useState({})
  const [hackathon, setHackathon] = useState({})

  if (Object.keys(faqs).length === 0) {
    fireDb.getFaqs().then((res) => {
      setFaqs(res)
    })
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

  function QuestionRow(props) {
    const router = useRouter()
    return (
      <TableRow>
        <TableData>{props.question}</TableData>
        <TableData>{props.category}</TableData>
        <TableData>{props.lastModified}</TableData>
        <TableData>
          <TransparentButton>
            <Link
              href={{
                pathname: '/faq/',
                query: {
                  faqId: props.faqId,
                  question: props.question,
                  category: props.category,
                  answer: props.answer,
                  lastModified: props.lastModified
                }
              }}
              as={`/faq/${props.faqId}`}
            >
              <a>
                <ViewIcon />
              </a>
            </Link>
            {/* Converting null/undefined faqId to boolean by `!!`
            can also control using state*/}
            <Modal
              isOpen={!!router.query.faqId}
              onRequestClose={() => router.push('/faq')}
            >
              <div>Question ID: {props.faqId}</div>
              <div>Question: {props.question}</div>
              <div>Category: {props.category}</div>
              <div>Answer: {props.answer}</div>
              <div>Last modified: {props.lastModified}</div>
            </Modal>
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
              {Object.keys(faqs).map((id, item) => (
                <QuestionRow
                  key={id}
                  faqId={id}
                  question={faqs[id].question}
                  category={faqs[id].category}
                  answer={faqs[id].answer}
                  lastModified={faqs[id].lastModified}
                />
              ))}
            </tbody>
          </FAQContent>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

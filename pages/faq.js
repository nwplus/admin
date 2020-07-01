import Card from "../components/card"
import styled from "styled-components"
import React from "react"

const props = {
  question: "How can I sign up",
  category: "General",
  modified: "2019-05-10 03:22:22"
}

const FAQContent = styled.table`
  width: 846px;
  height: 456px;
  left: 465px;
  top: 327px;

  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 3px;
`

const TableRow = styled.tr`
  height: 56px;
  border-top: 2px solid #ededed;
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

export default function FAQ() {
  // Handler for edit modal
  const editItem = e => {
    /*TODO*/
  }

  // Handler for saving changes the user made
  const confirmEdit = e => {
    /*TODO*/
  }

  // view details for a particular question
  const viewDetails = e => {
    /*TODO*/
  }

  // removes an FAQ
  const removeItem = e => {
    /*TODO*/
  }

  // Called by function that loops through questions
  function QuestionRow(props) {
    const item = props
    return (
      <TableRow>
        <TableData>{item.question}</TableData>
        <TableData>{item.category}</TableData>
        <TableData>{item.modified}</TableData>
      </TableRow>
    )
  }

  function FAQTable(props) {
    return (
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
          <QuestionRow
            question={props.data.question}
            category={props.data.category}
            modified={props.data.modified}
          />
        </tbody>
      </FAQContent>
    )
  }

  return (
    // <React.Fragment>
    //   <Card
    //     Header="Frequently Asked Questions"
    //     Content={}
    //   />
    // </React.Fragment>
    <FAQTable data={props} />
  )
}

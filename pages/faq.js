import Card, {
  CardHeader,
  CardTitle,
  CardButtonContainer,
  CardContent
} from '../components/card';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { fireDb } from '../utility/firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '../components/button';
import Modal, {
  ModalContent,
  ModalField,
  Label,
  InputField
} from '../components/modal';
import { COLOR, EDIT, VIEW, NEW, DELETE, FAQ } from '../constants';

const FAQContent = styled.table`
  background-color: ${COLOR.WHITE};
  table-layout: fixed;
  width: 100%;

  border: 1px solid ${COLOR.BLACK};
  box-sizing: border-box;
  border-radius: 3px;
`;

const TableRow = styled.tr`
  height: 56px;
`;

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
`;

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
  color: ${COLOR.BODY_TEXT};
`;

const ActionsButtonContainer = styled.button`
  width: 48px;
  height: 48px;
  background-color: Transparent;
  border: 0;
  padding: 6px;
`;

export default function Faq() {
  const [faqs, setFaqs] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [currFaq, setCurrFaq] = useState({});
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (Object.keys(faqs).length === 0) {
    fireDb.getFaqs().then((res) => {
      setFaqs(res);
    });
  }

  const editItem = (e) => {
    /* TODO */
  };

  // Handler for saving changes the user made
  const confirmEdit = (e) => {
    /* TODO */
  };

  // view details for a particular question
  const viewDetails = (e) => {
    /* TODO */
  };

  // removes an FAQ
  const removeItem = (e) => {
    /* TODO */
  };

  function QuestionRow(props) {
    const router = useRouter();
    const { faqId, question, category, answer, lastModified } = props;
    return (
      <TableRow>
        <TableData>{question}</TableData>
        <TableData>{category}</TableData>
        <TableData>{lastModified}</TableData>
        <TableData>
          <ActionsButtonContainer>
            <Button
              type={VIEW}
              color={COLOR.TRANSPARENT}
              onClick={() => setCurrFaq(props)}
            />
            <Modal
              isOpen={Object.keys(currFaq).length > 0}
              handleClose={() => setCurrFaq({})}
              handleSave={() => setCurrFaq({})}
              modalAction={VIEW}
              lastModified={currFaq.lastModified}
            >
              <ModalContent page={FAQ.label} columns={2}>
                <ModalField
                  label="Question"
                  value={currFaq.question}
                  modalAction={VIEW}
                />
                <ModalField
                  label="Category"
                  value={currFaq.category}
                  modalAction={VIEW}
                />
              </ModalContent>
              <ModalContent page={FAQ.label} columns={1}>
                <ModalField
                  label="Answer"
                  value={currFaq.answer}
                  modalAction={VIEW}
                />
              </ModalContent>
            </Modal>
          </ActionsButtonContainer>
          <ActionsButtonContainer>
            <Link
              href={{
                pathname: '/faq',
                query: {
                  faqId: faqId,
                  question: question,
                  category: category,
                  answer: answer,
                  lastModified: lastModified
                }
              }}
              as={`/faq/${faqId}`}
            >
              <a>
                <Button type={EDIT} color={COLOR.TRANSPARENT} />
              </a>
            </Link>
            {/* Converting null/undefined faqId to boolean by `!!` */}
            <Modal
              isOpen={!!router.query.faqId}
              handleClose={() => router.push('/faq')}
              handleSave={() => router.push('/faq')}
              modalAction={EDIT}
              lastModified={router.query.lastModified}
            >
              <ModalContent page={FAQ.label} columns={2}>
                <ModalField
                  label="Question"
                  value={router.query.question}
                  modalAction={EDIT}
                />
                <ModalField
                  label="Category"
                  value={router.query.category}
                  modalAction={EDIT}
                />
              </ModalContent>
              <ModalContent page={FAQ.label} columns={1}>
                <ModalField
                  label="Answer"
                  value={router.query.answer}
                  modalAction={EDIT}
                />
              </ModalContent>
            </Modal>
          </ActionsButtonContainer>
          <ActionsButtonContainer>
            <Button type={DELETE} color={COLOR.TRANSPARENT} />
          </ActionsButtonContainer>
        </TableData>
      </TableRow>
    );
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
        <CardContent style={{ backgroundColor: `${COLOR.BACKGROUND}` }}>
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
  );
}

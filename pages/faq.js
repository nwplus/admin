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
  width: 846px;
  height: 456px;
  left: 465px;
  top: 327px;
  background-color: ${COLOR.WHITE};

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
  color: #5a5a5a;
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
                <Button type={VIEW} color={COLOR.TRANSPARENT} />
              </a>
            </Link>
            {/* Converting null/undefined faqId to boolean by `!!` */}
            <Modal
              isOpen={!!router.query.faqId}
              handleClose={() => router.push('/faq')}
              handleSave={() => router.push('/faq')}
              modalAction={VIEW}
            >
              <ModalContent type={FAQ} columns={2}>
                <ModalField label='Question' value={router.query.question} />
                <ModalField label='Category' value={router.query.category} />
              </ModalContent>
              <ModalContent type={FAQ} columns={1}>
                <ModalField label='Answer' value={router.query.answer} />
              </ModalContent>
              <div>Question ID: {router.query.faqId}</div>
              <div>Last modified: {router.query.lastModified}</div>
            </Modal>
          </ActionsButtonContainer>
          <ActionsButtonContainer>
            <Button type={EDIT} color={COLOR.TRANSPARENT} />
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

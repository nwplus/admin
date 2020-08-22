import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fireDb } from '../utility/firebase';
import Card, {
  CardHeader,
  CardTitle,
  CardButtonContainer,
  CardContent,
} from '../components/card';
import Button from '../components/button';
import Modal, { ModalContent, ModalField } from '../components/modal';
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
  const [faqs, setFaqs] = useState([]);
  const [currFaq, setCurrFaq] = useState({});
  const [faqEditing, setFaqEditing] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputTimeout = useRef(null);

  if (Object.keys(faqs).length === 0) {
    fireDb.getFaqs().then((res) => {
      setFaqs(res);
    });
  }

  const handleClose = () => {
    setFaqEditing({});
    setCurrFaq({});
    setIsModalOpen(false);
  };

  const handleAdd = (faq) => {
    // TODO: add call to confirmation modal here before we add the data
    fireDb.addFaq(faq);
    faq.lastModified = fireDb.formatDate(fireDb.getTimestamp().seconds);
    setFaqs({
      ...faqs,
      [faq.faqId]: {
        ...faqEditing,
      },
    });
    handleClose();
  };

  const handleInput = (property, value, faq) => {
    if (inputTimeout.current) {
      if (inputTimeout.current[property] !== null)
        clearTimeout(inputTimeout.current[property]);
    } else {
      inputTimeout.current = {};
      inputTimeout.current[property] = null;
    }

    inputTimeout.current[property] = setTimeout(() => {
      inputTimeout.current[property] = null;
      setFaqEditing({
        ...faq,
        [property]: value,
      });
    }, 1000);
  };

  const handleDelete = (faqId) => {
    fireDb.deleteFaq(faqId);
    // setFaqs(
    //   Object.keys(faqs)
    //     .filter((id) => {
    //       id != faqId;
    //     })
    //     .reduce((obj, id) => {
    //       obj[id] = faqs[id];
    //       return obj;
    //     }, {})
    // );
    // console.log(faqs);
    handleClose();
  };

  function QuestionRow(props) {
    const router = useRouter();
    const { faqId, question, category, answer, lastModified } = props;

    const handleSave = () => {
      fireDb.updateFaq(faqEditing);
      faqEditing.lastModified = fireDb.formatDate(
        fireDb.getTimestamp().seconds
      );
      setFaqs({
        ...faqs,
        [faqId]: {
          ...faqEditing,
        },
      });
      props = { ...faqEditing };
      router.push('/faq');
      handleClose();
    };

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
              handleClose={() => handleClose({})}
              handleSave={() => handleClose({})}
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
                  lastModified: lastModified,
                },
              }}
              as={`/faq/${faqId}`}
            >
              <a>
                <Button
                  type={EDIT}
                  color={COLOR.TRANSPARENT}
                  onClick={() => setFaqEditing(props)}
                />
              </a>
            </Link>
            {/* Converting null/undefined faqId to boolean by `!!` */}
            <Modal
              isOpen={!!router.query.faqId}
              handleClose={() => router.push('/faq')}
              handleSave={() => handleSave()}
              modalAction={EDIT}
              // lastModified={router.query.lastModified}
              lastModified={faqEditing.lastModified}
            >
              <ModalContent page={FAQ.label} columns={2}>
                <ModalField
                  label="Question"
                  // value={router.query.question}
                  value={faqEditing.question}
                  modalAction={EDIT}
                  onChange={(event) =>
                    handleInput('question', event.target.value, faqEditing)
                  }
                />
                <ModalField
                  label="Category"
                  // value={router.query.category}
                  value={faqEditing.category}
                  modalAction={EDIT}
                  onChange={(event) =>
                    handleInput('category', event.target.value, faqEditing)
                  }
                />
              </ModalContent>
              <ModalContent page={FAQ.label} columns={1}>
                <ModalField
                  label="Answer"
                  // value={router.query.answer}
                  value={faqEditing.answer}
                  modalAction={EDIT}
                  onChange={(event) =>
                    handleInput('answer', event.target.value, faqEditing)
                  }
                />
              </ModalContent>
            </Modal>
          </ActionsButtonContainer>
          <ActionsButtonContainer>
            {/* TODO: Need to add confirmation modal before deleting */}
            <Button
              type={DELETE}
              color={COLOR.TRANSPARENT}
              onClick={() => handleDelete(props.faqId)}
            />
          </ActionsButtonContainer>
        </TableData>
      </TableRow>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardButtonContainer>
            <Button type={NEW} onClick={() => setIsModalOpen(true)}>
              New Question
            </Button>
            <Modal
              isOpen={isModalOpen}
              // TODO: add function confirming if user would like to exit away
              handleClose={() => setIsModalOpen(false)}
              handleSave={() => handleAdd(faqEditing)}
              modalAction={NEW}
            >
              <ModalContent page={FAQ.label} columns={2}>
                <ModalField
                  label="Question"
                  modalAction={NEW}
                  onChange={(event) =>
                    handleInput('question', event.target.value, faqEditing)
                  }
                />
                <ModalField
                  label="Category"
                  // TODO: need to add dropdown here for category options
                  modalAction={NEW}
                  onChange={(event) =>
                    handleInput('category', event.target.value, faqEditing)
                  }
                />
              </ModalContent>
              <ModalContent page={FAQ.label} columns={1}>
                <ModalField
                  label="Answer"
                  modalAction={NEW}
                  onChange={(event) =>
                    handleInput('answer', event.target.value, faqEditing)
                  }
                />
              </ModalContent>
            </Modal>
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
              {Object.keys(faqs).map((id) => (
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
    </>
  );
}

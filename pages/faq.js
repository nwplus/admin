import React, { useState, useRef, useEffect } from 'react';
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
import { COLOR, EDIT, VIEW, NEW, DELETE, FAQ, FAQCategory } from '../constants';

const FAQWrapper = styled.div`
  max-height: 512px;
  overflow-y: scroll;

  border: 1px solid ${COLOR.BLACK};
  box-sizing: border-box;
  border-radius: 3px;
`;

const FAQContent = styled.table`
  background-color: ${COLOR.WHITE};
  table-layout: fixed;
  width: 100%;
`;

const TableRow = styled.tr`
  height: 56px;
  vertical-align: middle;
`;

const TableHeader = styled.th`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${COLOR.WHITE};

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
  ${(props) =>
    !props.actions &&
    'max-width: 280px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'}

  height: 12px;
  vertical-align: middle !important;

  font-family: Apercu Pro;
  font-size: 16px;
  line-height: 11px;

  padding-left: 28px;
  margin-top: 18px;
  margin-bottom: 18px;

  border-top: 2px solid ${COLOR.GRAY} !important;
  color: ${COLOR.BODY_TEXT};
`;

const ActionsButtonContainer = styled.div`
  display: inline-block;
  align-items: flex-start;
  margin: 0;
  width: 48px;
  height: 48px;
  background-color: Transparent;
  border: 0;
`;

const PlaceHolderText = styled.td`
  text-align: center !important;
  height: 24px;
  color: ${COLOR.BODY_TEXT};

  font-family: Apercu Pro;
  font-size: 18px;
  line-height: 24px;

  margin-top: 32px;
  margin-bottom: 32px;
`;

export default function Faq({ currHackathon, hackathons }) {
  const router = useRouter();
  // uncomment 'LHD2021' when integrated with sidebar to receive hackathon that is passed down
  const [hackathon, setHackathon] = useState(currHackathon || 'LHD2021');
  const [faqs, setFaqs] = useState([]);
  const [faqViewing, setFaqViewing] = useState({});
  const [faqEditing, setFaqEditing] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const inputTimeout = useRef(null);

  useEffect(() => {
    if (Object.keys(faqs).length === 0) {
      fireDb.getFaqs(hackathon).then((res) => {
        if (Object.keys(res).length > 0) {
          setFaqs(res);
        }
        setIsLoading(false);
      });
    }
  }, []);

  const handleClose = () => {
    setFaqEditing({});
    setFaqViewing({});
    setAddNew(false);
  };

  const handleNew = (faq) => {
    faq.hackathonIDs = [hackathon];
    fireDb.addFaq(faq);
    faq.lastModified = fireDb.formatDate(fireDb.getTimestamp().seconds);
    setFaqs({
      ...faqs,
      [faq.faqID]: {
        ...faqEditing,
        hackathonIDs: [hackathon],
      },
    });
    handleClose();
  };

  const handleInput = (property, value, faq, isDropdown = false) => {
    if (isDropdown) {
      setFaqEditing({
        ...faq,
        [property]: value,
      });
      return;
    }
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

  const handleUpdate = (faqID, faq) => {
    fireDb.updateFaq(faqID, faq);
    setFaqEditing(
      {
        ...faq,
        lastModified: fireDb.formatDate(fireDb.getTimestamp().seconds),
      },
      setFaqs({
        ...faqs,
        [faqID]: {
          ...faq,
        },
      })
    );
    router.push('/faq');
    handleClose();
  };

  const handleDelete = (faqID) => {
    fireDb.deleteFaq(faqID);
    setFaqs(
      Object.keys(faqs)
        .filter((id) => {
          id !== faqID;
        })
        .reduce((obj, id) => {
          obj[id] = faqs[id];
          return obj;
        }, {})
    );
    handleClose();
  };

  function QuestionRow(props) {
    return (
      <TableRow>
        <TableData>{faqs[props.faqID].question}</TableData>
        <TableData>{faqs[props.faqID].category}</TableData>
        <TableData>{faqs[props.faqID].lastModified}</TableData>
        <TableData actions>
          <ActionsButtonContainer>
            <Button
              type={VIEW}
              color={COLOR.TRANSPARENT}
              onClick={() => setFaqViewing(faqs[props.faqID])}
            />
            <Modal
              isOpen={Object.keys(faqViewing).length > 0}
              handleClose={() => handleClose({})}
              handleSave={() => handleClose({})}
              modalAction={VIEW}
              lastModified={faqViewing.lastModified}
            >
              <ModalContent page={FAQ} columns={2}>
                <ModalField
                  label="Question"
                  value={faqViewing.question}
                  modalAction={VIEW}
                />
                <ModalField
                  label="Category"
                  value={faqViewing.category}
                  modalAction={VIEW}
                />
              </ModalContent>
              <ModalContent page={FAQ} columns={1}>
                <ModalField
                  label="Answer"
                  value={faqViewing.answer}
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
                  faqID: props.faqID,
                  question: faqs[props.faqID].question,
                  category: faqs[props.faqID].category,
                  answer: faqs[props.faqID].answer,
                  lastModified: faqs[props.faqID].lastModified,
                },
              }}
              as={`/faq/${props.faqID}`}
            >
              <a>
                <Button
                  type={EDIT}
                  color={COLOR.TRANSPARENT}
                  onClick={() => setFaqEditing(faqs[props.faqID])}
                />
              </a>
            </Link>
            <Modal
              isOpen={!!router.query.faqID}
              handleClose={() => router.push('/faq')}
              handleSave={() => handleUpdate(router.query.faqID, faqEditing)}
              modalAction={EDIT}
              lastModified={faqEditing.lastModified}
            >
              <ModalContent page={FAQ} columns={2}>
                <ModalField
                  label="Question"
                  value={faqEditing.question}
                  modalAction={EDIT}
                  onChange={(event) =>
                    handleInput('question', event.target.value, faqEditing)
                  }
                />
                <ModalField
                  label="Category"
                  value={faqEditing.category}
                  modalAction={EDIT}
                  onChange={(category) =>
                    handleInput('category', category.label, faqEditing, true)
                  }
                />
              </ModalContent>
              <ModalContent page={FAQ} columns={1}>
                <ModalField
                  label="Answer"
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
            <Button
              type={DELETE}
              color={COLOR.TRANSPARENT}
              onClick={() => handleDelete(props.faqID)}
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
            <Button type={NEW} onClick={() => setAddNew(true)}>
              New Question
            </Button>
            <Modal
              isOpen={addNew}
              handleClose={() => setAddNew(false)}
              handleSave={() => handleNew(faqEditing)}
              modalAction={NEW}
            >
              <ModalContent page={FAQ} columns={2}>
                <ModalField
                  label="Question"
                  modalAction={NEW}
                  onChange={(event) =>
                    handleInput('question', event.target.value, faqEditing)
                  }
                />
                <ModalField
                  label="Category"
                  modalAction={NEW}
                  onChange={(category) =>
                    handleInput('category', category.label, faqEditing, true)
                  }
                  value={FAQCategory.GENERAL}
                />
              </ModalContent>
              <ModalContent page={FAQ} columns={1}>
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
          <FAQWrapper>
            {isLoading && (
              <FAQContent>
                <tbody>
                  <TableRow>
                    <PlaceHolderText>
                      Loading FAQs for {hackathon}...
                    </PlaceHolderText>
                  </TableRow>
                </tbody>
              </FAQContent>
            )}
            {Object.keys(faqs).length === 0 && !isLoading && (
              <FAQContent>
                <tbody>
                  <TableRow>
                    <PlaceHolderText>No FAQs for {hackathon}</PlaceHolderText>
                  </TableRow>
                </tbody>
              </FAQContent>
            )}
            {Object.keys(faqs).length > 0 && !isLoading && (
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
                      faqID={id}
                      question={faqs[id].question}
                      category={faqs[id].category}
                      answer={faqs[id].answer}
                      lastModified={faqs[id].lastModified}
                      hackathonIDs={faqs[id].hackathonIDs}
                    />
                  ))}
                </tbody>
              </FAQContent>
            )}
          </FAQWrapper>
        </CardContent>
      </Card>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  formatDate,
  getTimestamp,
  getFaqs,
  addFaq,
  updateFaq,
  deleteFaq,
  getHackathons,
} from '../utility/firebase';
import Card, {
  CardHeader,
  CardTitle,
  CardButtonContainer,
  CardContent,
} from '../components/card';
import Button from '../components/button';
import Modal, { Label, ModalContent, ModalField } from '../components/modal';
import Checkbox from '../components/checkbox';
import { COLOR, EDIT, VIEW, NEW, DELETE, FAQ, FAQCategory } from '../constants';
import { useAuth } from '../utility/auth';
import Page from '../components/page';

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

  font-size: 18px;
  line-height: 24px;

  margin-top: 32px;
  margin-bottom: 32px;
`;

export default function Faq({ hackathons }) {
  // remove'LHD2021' when integrated with sidebar to receive hackathon that is passed down
  const [faqs, setFaqs] = useState([]);
  const [newFaq, setNewFaq] = useState({ hackathonIDs: [] });
  const [faqViewing, setFaqViewing] = useState({});
  const [faqEditing, setFaqEditing] = useState({});
  const [faqConfirm, setFaqConfirm] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');
  const { email: user } = useAuth().user;

  const fetchFaqs = async () => {
    const faqsFetched = await getFaqs();
    Object.keys(faqsFetched).length > 0 && setFaqs(faqsFetched);
  };
  useEffect(() => {
    fetchFaqs();
    setIsLoading(false);
  }, [window.location.pathname]);

  useEffect(() => {
    if (alertMsg.length > 0) alert(alertMsg);
  }, [alertMsg]);

  const handleNew = async () => {
    newFaq.category = newFaq.category ? newFaq.category : FAQCategory.GENERAL;
    newFaq.lastModifiedBy = user;
    const faqID = await addFaq(newFaq);
    newFaq.lastModified = formatDate(getTimestamp().seconds);
    setFaqs({
      ...faqs,
      [faqID]: {
        ...newFaq,
        id: faqID,
      },
    });
    setNewFaq({ hackathonIDs: [] });
    setAddNew(false);
    setAlertMsg(
      `Successfully added the following question: \n${newFaq.question}`
    );
  };

  const handleInput = (property, value, faq, setState) => {
    setState({
      ...faq,
      [property]: value,
    });
  };

  const handleToggle = (hackathon, faq, setState) => {
    if (faq.hackathonIDs.includes(hackathon)) {
      setState({
        ...faq,
        hackathonIDs: faq.hackathonIDs.filter((item) => {
          return item !== hackathon;
        }),
      });
    } else {
      setState({
        ...faq,
        hackathonIDs: [...faq.hackathonIDs, hackathon],
      });
    }
  };

  const handleUpdate = () => {
    faqEditing.lastModifiedBy = user;
    updateFaq(faqEditing.id, faqEditing);
    faqEditing.lastModified = formatDate(getTimestamp().seconds);
    setFaqEditing(
      {
        ...faqEditing,
      },
      setFaqs({
        ...faqs,
        [faqEditing.id]: {
          ...faqEditing,
        },
      })
    );
    setFaqEditing(
      {},
      setAlertMsg(
        `Successfully updated the following question: \n${faqEditing.question}`
      )
    );
  };

  const handleDelete = (faqID, confirmed = false) => {
    if (!confirmed) {
      setFaqConfirm({
        ...faqs[faqID],
      });
      return;
    }
    deleteFaq(faqID);
    setFaqs(
      Object.keys(faqs)
        .filter((id) => {
          return id !== faqID;
        })
        .reduce((obj, id) => {
          obj[id] = faqs[id];
          return obj;
        }, {})
    );
    setFaqConfirm(
      {},
      setAlertMsg(
        `Successfully deleted the following question: \n${faqs[faqID].question}`
      )
    );
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
          </ActionsButtonContainer>
          <ActionsButtonContainer>
            <Button
              type={EDIT}
              color={COLOR.TRANSPARENT}
              onClick={() => setFaqEditing(faqs[props.faqID])}
            />
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
    <Page hackathons={hackathons} currentPath="faq">
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardButtonContainer>
            <Button type={NEW} onClick={() => setAddNew(true)}>
              New Question
            </Button>
          </CardButtonContainer>
        </CardHeader>
        <CardContent style={{ backgroundColor: `${COLOR.BACKGROUND}` }}>
          <FAQWrapper>
            {isLoading && (
              <FAQContent>
                <tbody>
                  <TableRow>
                    <PlaceHolderText>Loading FAQs...</PlaceHolderText>
                  </TableRow>
                </tbody>
              </FAQContent>
            )}
            {Object.keys(faqs).length === 0 && !isLoading && (
              <FAQContent>
                <tbody>
                  <TableRow>
                    <PlaceHolderText>No FAQs found.</PlaceHolderText>
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
                      lastModified={`${faqs[id].lastModified} by ${faqs[id].lastModifiedBy}`}
                      hackathonIDs={faqs[id].hackathonIDs}
                    />
                  ))}
                </tbody>
              </FAQContent>
            )}
          </FAQWrapper>

          {/* Modal for adding a new FAQ */}
          <Modal
            isOpen={addNew}
            handleClose={() => setAddNew(false)}
            handleSave={() => handleNew(newFaq)}
            modalAction={NEW}
          >
            <ModalContent page={FAQ} columns={2}>
              <ModalField
                label="Question"
                modalAction={NEW}
                onChange={(event) => {
                  handleInput(
                    'question',
                    event.target.value,
                    newFaq,
                    setNewFaq
                  );
                }}
              />
              <ModalField
                label="Category"
                modalAction={NEW}
                onChange={(category) => {
                  handleInput('category', category.label, newFaq, setNewFaq);
                }}
                value={FAQCategory.GENERAL}
              />
            </ModalContent>
            <ModalContent page={FAQ} columns={1}>
              <div>
                <ModalField
                  label="Answer"
                  modalAction={NEW}
                  onChange={(event) => {
                    handleInput(
                      'answer',
                      event.target.value,
                      newFaq,
                      setNewFaq
                    );
                  }}
                />
                <Label>Hackathons this FAQ applies to</Label>
                {newFaq.hackathonIDs &&
                  hackathons.map((hackathon) => (
                    <Checkbox
                      key={hackathon}
                      id={hackathon}
                      label={hackathon}
                      checked={newFaq.hackathonIDs.includes(hackathon)}
                      onClick={() => handleToggle(hackathon, newFaq, setNewFaq)}
                    />
                  ))}
              </div>
            </ModalContent>
          </Modal>

          {/* Modal for viewing a FAQ */}
          <Modal
            isOpen={Object.keys(faqViewing).length > 0}
            handleClose={() => setFaqViewing({})}
            handleSave={() => setFaqViewing({})}
            modalAction={VIEW}
            lastModified={`${faqViewing.lastModified} by ${faqViewing.lastModifiedBy}`}
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
              <div>
                <ModalField
                  label="Answer"
                  value={faqViewing.answer}
                  modalAction={VIEW}
                />
                <Label>Hackathons this FAQ applies to</Label>
                {faqViewing.hackathonIDs &&
                  hackathons.map((hackathon) => (
                    <Checkbox
                      key={hackathon}
                      id={hackathon}
                      label={hackathon}
                      checked={faqViewing.hackathonIDs.includes(hackathon)}
                      disabled
                    />
                  ))}
              </div>
            </ModalContent>
          </Modal>

          {/* Modal for editing a FAQ */}
          <Modal
            isOpen={Object.keys(faqEditing).length > 0}
            handleClose={() => setFaqEditing({})}
            handleSave={() => handleUpdate()}
            modalAction={EDIT}
            lastModified={`${faqEditing.lastModified} by ${faqEditing.lastModifiedBy}`}
          >
            <ModalContent page={FAQ} columns={2}>
              <ModalField
                label="Question"
                value={faqEditing.question}
                modalAction={EDIT}
                onChange={(event) => {
                  handleInput(
                    'question',
                    event.target.value,
                    faqEditing,
                    setFaqEditing
                  );
                }}
              />
              <ModalField
                label="Category"
                value={faqEditing.category}
                modalAction={EDIT}
                onChange={(category) => {
                  handleInput(
                    'category',
                    category.label,
                    faqEditing,
                    setFaqEditing
                  );
                }}
              />
            </ModalContent>
            <ModalContent page={FAQ} columns={1}>
              <div>
                <ModalField
                  label="Answer"
                  value={faqEditing.answer}
                  modalAction={EDIT}
                  onChange={(event) => {
                    handleInput(
                      'answer',
                      event.target.value,
                      faqEditing,
                      setFaqEditing
                    );
                  }}
                />
                <Label>Hackathons this FAQ applies to</Label>
                {faqEditing.hackathonIDs &&
                  hackathons.map((hackathon) => (
                    <Checkbox
                      key={hackathon}
                      id={hackathon}
                      label={hackathon}
                      checked={faqEditing.hackathonIDs.includes(hackathon)}
                      onClick={() =>
                        handleToggle(hackathon, faqEditing, setFaqEditing)
                      }
                    />
                  ))}
              </div>
            </ModalContent>
          </Modal>

          {/* Confirmation modal for deleting a FAQ */}
          <Modal
            isOpen={Object.keys(faqConfirm).length > 0}
            handleClose={() => setFaqConfirm({})}
            handleSave={() => handleDelete(faqConfirm.id, true)}
            modalTitle="Are you sure you would like to delete the following FAQ?"
            modalAction={DELETE}
          >
            <ModalContent page={FAQ} columns={2}>
              <ModalField
                label="Question"
                value={faqConfirm.question}
                modalAction={VIEW}
              />
              <ModalField
                label="Category"
                value={faqConfirm.category}
                modalAction={VIEW}
              />
            </ModalContent>
            <ModalContent page={FAQ} columns={1}>
              <div>
                <ModalField
                  label="Answer"
                  value={faqConfirm.answer}
                  modalAction={VIEW}
                />
                <Label>Hackathons this FAQ applies to</Label>
                {faqConfirm.hackathonIDs &&
                  hackathons.map((hackathon) => (
                    <Checkbox
                      key={hackathon}
                      id={hackathon}
                      label={hackathon}
                      checked={faqConfirm.hackathonIDs.includes(hackathon)}
                      disabled
                    />
                  ))}
              </div>
            </ModalContent>
          </Modal>
        </CardContent>
      </Card>
    </Page>
  );
}

export const getStaticProps = async () => {
  const hackathons = await getHackathons();
  return {
    props: {
      hackathons,
    },
  };
};

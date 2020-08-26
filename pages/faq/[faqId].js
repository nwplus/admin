import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { fireDb } from '../../utility/firebase';
import Modal, { ModalContent, ModalField } from '../../components/modal';
import { EDIT, FAQ } from '../../constants';

export default function FaqID() {
  const router = useRouter();
  const [faq, setFaq] = useState(router.query);

  // For some reason, faqID becomes faqId when passed through the router
  if (faq.question === undefined && router.query.faqId) {
    fireDb.getFaq(router.query.faqId).then((res) => {
      setFaq(res);
    });
  }

  const handleInput = (property, value) => {
    setFaq({
      ...faq,
      [property]: value,
    });
  };

  const handleClose = () => {
    router.push('/faq');
    setFaq({});
  };

  const handleUpdate = (faqID) => {
    fireDb.updateFaq(faqID, faq);
    handleClose();
  };

  return (
    <Modal
      isOpen
      handleClose={() => handleClose()}
      handleSave={() => handleUpdate(router.query.faqId)}
      modalAction={EDIT}
    >
      <ModalContent page={FAQ} columns={2}>
        <ModalField
          label="Question"
          value={faq.question}
          modalAction={EDIT}
          onChange={(event) => handleInput('question', event.target.value)}
        />
        {faq.category && (
          <ModalField
            label="Category"
            value={faq.category}
            modalAction={EDIT}
            onChange={(category) =>
              handleInput('category', category.label, true)
            }
          />
        )}
      </ModalContent>
      <ModalContent page={FAQ} columns={1}>
        <ModalField
          label="Answer"
          value={faq.answer}
          modalAction={EDIT}
          onChange={(event) => handleInput('answer', event.target.value)}
        />
      </ModalContent>
    </Modal>
  );
}

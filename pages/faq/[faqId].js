import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import Modal, { ModalTitle } from '../../components/modal'
import Modal from 'react-modal';
import { fireDb } from '../../utility/firebase';

export default function faqIdPage() {
  const router = useRouter();
  // access the query element
  let { faqId, question, category, answer, lastModified } = router.query;
  const [currFaq, setCurrFaq] = useState({
    question: question,
    category: category,
    answer: answer,
    lastModified: lastModified
  });

  if (
    question === undefined &&
    answer === undefined &&
    category === undefined &&
    lastModified === undefined &&
    faqId
  ) {
    fireDb.getFaq(faqId).then((res) => {
      setCurrFaq(res);
    });
  }
  return (
    <>
      {/* {console.log(currFaq)} */}
      {/* {useEffect(() => {}, {currFaq})} */}
      <div>Question ID: {faqId}</div>
      <div>Question: {currFaq['question']}</div>
      <div>Category: {currFaq['category']}</div>
      <div>Answer: {currFaq['answer']}</div>
      <div>Last modified: {currFaq['lastModified']}</div>
    </>
  );
}

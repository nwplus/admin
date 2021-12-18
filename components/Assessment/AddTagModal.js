import React from 'react';
import Modal from './Modal';
import Button from '../button';

export default function AddTagModal({ setShowing }) {
  return (
    <Modal setShowing={setShowing}>
      <Button>Done</Button>
    </Modal>
  );
}
// [TODO] list
// 3. need a field to hold associated tag for an applicant?
// 4. [outside of mvp] delete a tag, add a trash can icon (ask design for a trash
//    can icon but use placeholder for now) that deletes a tag and remove it from all applicants who previously had

// [TODO] questions
// 1. should the tags be hardcoded or stored in firebase
// 2. insert tag property

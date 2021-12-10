import React from 'react';
import CSVButton from './CSVButton';
import Modal from './Modal';
import ResumeExportButton from './ResumeExportButton';

export default function AddTagModal({ setShowing }) {
  return (
    <Modal setShowing={setShowing}>
      <h3>Export applicant data</h3>
      <CSVButton />
      <ResumeExportButton />
    </Modal>
  );
}
// TODO list
// 1. a filter function to match typed in result with the starting letter of tag,
//     only return top 5 match alphabetical order
// 2. a create option if what's typed in does not have an exact match in existing tag
// 3. need a field to hold associated tag for an applicant?
// 4. delete a tag, add a trash can icon (ask design for a trash
//    can icon but use placeholder for now) that deletes a tag and remove it from all applicants who previously had

// [TODO] questions
// 1. should the tags be hardcoded or stored in firebase
// 2. insert tag property

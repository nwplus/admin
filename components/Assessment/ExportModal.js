import React from 'react'
import CSVButton from './CSVButton'
import Modal from './Modal'
import ResumeExportButton from './ResumeExportButton'

export default function ExportModal({ setShowing }) {
  return (
    <Modal setShowing={setShowing}>
      <h3>Export applicant data</h3>
      <CSVButton />
      <ResumeExportButton />
    </Modal>
  )
}

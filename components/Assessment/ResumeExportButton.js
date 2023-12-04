import React, { useState } from 'react'
import Spinner from '../../assets/spinner.svg'
import { getAllResumes } from '../../utility/firebase'
import { Button } from './Button'

export default function ResumeExportButton() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Button
        width="large"
        bColor="black"
        onClick={async () => {
          setLoading(true)
          await getAllResumes()
          setLoading(false)
        }}
      >
        <div style={{ position: 'relative', textAlign: 'center' }}>
          Download Resumes{' '}
          {loading && (
            <img
              src={Spinner}
              style={{
                position: 'absolute',
                width: '30px',
                height: '30px',
                right: '10px',
              }}
              alt="loading"
            />
          )}
        </div>
      </Button>
    </>
  )
}

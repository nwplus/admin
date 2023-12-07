import React, { useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import Spinner from '../../assets/spinner.svg'
import { getCSVData } from '../../utility/firebase'
import { Button } from './Button'

export default function CSVButton() {
  const [csvData, setCSVData] = useState('')
  const downloadLink = useRef()
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Button
        width="large"
        bColor="black"
        onClick={async () => {
          setLoading(true)
          const data = await getCSVData()
          setLoading(false)
          setCSVData(data)
          downloadLink.current.link.click()
        }}
      >
        <div style={{ position: 'relative', textAlign: 'center' }}>
          Download CSV{' '}
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
      <CSVLink style={{ visibility: 'hidden' }} ref={downloadLink} filename="applicants.csv" data={csvData} />
    </>
  )
}

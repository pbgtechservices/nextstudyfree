'use client'
import React, { useEffect, useState } from 'react'
import CollegeMainDetals from './collegeMainDetals'
import CollegeSubDetails from './collegeSubDetails'
import { Audio } from 'react-loader-spinner'
import Header from '../../../components/header/header'
import { callToBackend } from '@/app/controls/api'

const CollegeDetails = (props) => {
  const [loading, setLoading] = useState(false)
  let collegeId = props.params.collegeName
  const [selectedData, setSelecteddata] = useState()

  useEffect(() => {
    setLoading(true)
    callToBackend(`college/college-detail/${collegeId}/`, 'GET')
      .then((d) => {
        setLoading(false)
        setSelecteddata(d)
      })
      .catch(() => {
        setLoading(false)
      })
    // eslint-disable-next-line
  }, [collegeId])

  if (!selectedData) return <p></p>

  return (
    <div style={{ backgroundColor: 'var(--bg-light)' }}>
      <Header setLoading={setLoading} showSearchCont={false} />
      <div className="college-full-details-cont">
        {loading && (
          <div
            className="college-full-details-cont mt-5 d-flex flex-column align-items-center"
            style={{ backgroundColor: 'transparent' }}
          >
            <Audio
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
            <span className="loading-text">
              Loading colleges details please wait..
            </span>
          </div>
        )}

        {!loading && selectedData && (
          <div className="college-details-section">
            <CollegeMainDetals selectedData={selectedData} />
            <CollegeSubDetails selectedData={selectedData} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CollegeDetails

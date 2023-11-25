'use client'
import React, { useEffect, useState } from 'react'
import CollegeMainDetals from './collegeMainDetals'
import CollegeSubDetails from './collegeSubDetails'
import { Audio } from 'react-loader-spinner'
import Header from '../../../components/header/header'
import { callToBackend } from '@/app/controls/api'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const CollegeDetails = (props) => {
  const [loading, setLoading] = useState(false)
  let collegeId = props.params.collegeName
  const [selectedData, setSelecteddata] = useState()

  var thumbnails = selectedData?.collegeImages
    ?.filter((ds) => {
      var array = ds?.College_Image?.split('/')
      var lastsegment = array[array.length - 1]
      var key = lastsegment.split('.')[0].split('_')[0] === 'thumbnail'
      return key
    })[0]
    ?.College_Image?.split('?')[0]

  var collegeImages = selectedData?.collegeImages
    ?.filter((ds) => {
      var array = ds?.College_Image?.split('/')
      var lastsegment = array[array.length - 1]
      var key = lastsegment.split('.')[0].split('_')[0] === 'collegeImage'
      return key
    })[0]
    ?.College_Image?.split('?')[0]

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

  const title = selectedData?.Open_Graph_Title || selectedData?.collegeName
  const description = selectedData?.Open_Graph_Description
  const canonicalURL = 'your_canonical_url_here' // Replace with your actual canonical URL
  const thumbnail = thumbnails || collegeImages

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

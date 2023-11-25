'use client'
import React, { useEffect, useState } from 'react'
import CollegeMainDetals from './collegeMainDetals'
import CollegeSubDetails from './collegeSubDetails'
import { Audio } from 'react-loader-spinner'
import Header from '../../../components/header/header'
import { useRouter } from 'next/navigation'
import { callToBackend } from '@/app/controls/api'
import Head from 'next/head'

const CollegeDetails = (props) => {
  const [loading, setLoading] = useState(false)
  let collegeId = props.params.collegeName
  const [selectedData, setSelecteddata] = useState()

  let userInfoLocal
  if (typeof window !== 'undefined') {
    userInfoLocal = localStorage.getItem('userInfo')
  }
  let userInfo = userInfoLocal && JSON.parse(userInfoLocal)
  const isEditAccess =
    userInfo?.contactNumber === '9663881439' ||
    userInfo?.contactNumber === '8553322965'

  const navigate = useRouter()

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

  const metadata = {
    title:
      ' Study Free | Get 100% Fee Concesion In Reputed PU Science College Based on Entrance Exam or 10th Result',
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-light)' }}>
      <Head>
        <title>
          {title && description
            ? `${title} | ${description}`
            : 'Study Free | Get 100% Fee Concession In Reputed PU Science College Based on Entrance Exam or 10th Result'}
        </title>

        {/* Twitter Meta Tags */}
        <meta name="twitter:url" content={canonicalURL} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={thumbnail} />

        {/* Open Graph Meta Tags */}
        <meta property="og:url" content={canonicalURL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={thumbnail} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={title} />
        <meta property="og:image:alt" content={description} />
      </Head>
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
            {isEditAccess && (
              <div
                className="confirm-popup-btn-cont"
                style={{ justifyContent: 'flex-end', width: '80%' }}
              >
                <button
                  className="auth-btn"
                  onClick={() =>
                    navigate.push(
                      `/admin/register_college/${selectedData?.collegeName.replaceAll(
                        ' ',
                        '-',
                      )}`,
                    )
                  }
                >
                  Edit
                </button>
              </div>
            )}
            <CollegeMainDetals selectedData={selectedData} />
            <CollegeSubDetails selectedData={selectedData} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CollegeDetails

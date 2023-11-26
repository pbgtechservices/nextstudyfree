'use client'
import React, { useEffect, useState } from 'react'
import CollegeMainDetals from './collegeMainDetals'
import CollegeSubDetails from './collegeSubDetails'
import { Audio } from 'react-loader-spinner'
import Header from '../../../components/header/header'
import { callToBackend } from '@/app/controls/api'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import RootLayout from './layout'

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

  if (!selectedData) return <p></p>

  const title = selectedData?.Open_Graph_Title || selectedData?.collegeName
  const description = selectedData?.Open_Graph_Description
  const canonicalURL = 'your_canonical_url_here' // Replace with your actual canonical URL
  const thumbnail = thumbnails || collegeImages

  const metadata = {
    title:
      title && description
        ? `${title} | ${description}`
        : 'Study | Get 100% Fee Concession In Reputed PU Science College Based on Entrance Exam or 10th Result',
    favicon: './favicon.ico',
    canonicalURL: 'your_canonical_url_here', // Replace with your actual canonical URL
    twitter: {
      url: canonicalURL,
      title: title,
      description: description,
      image: thumbnail,
    },
    openGraph: {
      url: canonicalURL,
      title: title,
      description: description,
      image: thumbnail,
      imageWidth: 1200,
      imageHeight: 630,
      type: 'website',
      siteName: title,
      imageAlt: description,
    },
  }

  return (
    <RootLayout metadata={metadata}>
      <div style={{ backgroundColor: 'var(--bg-light)' }}>
        <Head>
          <title>{metadata.title}</title>
          <link rel="icon" href={metadata.favicon} />

          <meta name="twitter:url" content={metadata.twitter.url} />
          <meta name="twitter:title" content={metadata.twitter.title} />
          <meta
            name="twitter:description"
            content={metadata.twitter.description}
          />
          <meta name="twitter:image" content={metadata.twitter.image} />

          <meta property="og:url" content={metadata.openGraph.url} />
          <meta property="og:title" content={metadata.openGraph.title} />
          <meta
            property="og:description"
            content={metadata.openGraph.description}
          />
          <meta property="og:image" content={metadata.openGraph.image} />
          <meta
            property="og:image:width"
            content={metadata.openGraph.imageWidth}
          />
          <meta
            property="og:image:height"
            content={metadata.openGraph.imageHeight}
          />
          <meta property="og:type" content={metadata.openGraph.type} />
          <meta property="og:site_name" content={metadata.openGraph.siteName} />
          <meta property="og:image:alt" content={metadata.openGraph.imageAlt} />
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
              <CollegeMainDetals selectedData={selectedData} />
              <CollegeSubDetails selectedData={selectedData} />
            </div>
          )}
        </div>
      </div>
    </RootLayout>
  )
}

export default CollegeDetails

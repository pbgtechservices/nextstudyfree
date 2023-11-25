'use client'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Footer from '../../../components/footer/footer'
import Header from '../../../components/header/header'
import { callToBackend } from '../../../controls/api'
import Auth from '../../../auth/page'
import CollegeList from './collegeList'
import { noCollege } from '../../../assets/index'
import { Audio } from 'react-loader-spinner'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import Head from 'next/head'
import Image from 'next/image'

const Home = (props) => {
  let userInfoLocal
  if (typeof window !== 'undefined') {
    userInfoLocal = localStorage.getItem('userInfo')
  }
  let userInfo = userInfoLocal && JSON.parse(userInfoLocal)
  const [seed, setSeed] = useState(1)
  const [loading, setLoading] = useState(false)
  const [collegeData, setCollegeData] = useState()
  const [selectedColleges, setSelectedColleges] = useState({
    collegeName: '',
    location: '',
  })
  const [categories, setCategories] = useState([])
  const [totalCount, setTotalCount] = useState()
  const [locationData, setLocationData] = useState([])

  const pagination = props.params.pagination
  const category = props.params.category
  const location = props.params.location ? props.params.location : ''

  const collegeName = props.params.collegeName
  const selecteCollegeType = category

  const navigate = typeof window !== 'undefined' && useRouter()

  if (!navigate) {
    return <p></p> // or a loading state
  }

  const getCategories = () => {
    setLoading(true)
    callToBackend('college/college-category-list/', 'GET')
      .then((d) => {
        setCategories(d)
      })
      .then(() => {
        getCollegeData()
      })
  }

  const getCollegeData = () => {
    callToBackend(
      `college/search-college-detail/all/?page=${pagination}&category=${selecteCollegeType}&location=${location}`,
      'GET',
    )
      .then((d) => {
        setLoading(false)
        setCollegeData(d?.college_list)
        setTotalCount(d.total_count)
        setLocationData(d?.location)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!categories?.length) {
      getCategories()
    } else {
      setLoading(true)
      getCollegeData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, pagination, seed])

  const deleteCollege = (uId) => {
    setLoading(true)
    callToBackend(`college/college-detail/${uId}/`, 'DELETE').then(() => {
      setLoading(false)
      getCollegeData()
    })
  }

  const collegeDatas = collegeData?.filter(
    (d) =>
      d?.category.findIndex(
        (d) => d.College_Category === selecteCollegeType?.replace('%20', ' '),
      ) > -1,
  )

  if (!collegeDatas) return <p></p>

  let collegeDataFilteredLocation = location
    ? collegeDatas?.filter(
        (obj) => obj?.location?.toLowerCase() === location?.toLowerCase(),
      )
    : collegeDatas

  let final = collegeDataFilteredLocation

  const route = usePathname()
  const pathName = route?.path
  return (
    <>
      <Head>
        <title>
          Study Free | Get 100% Fee Concesion In Reputed PU Science College
          Based on Entrance Exam or 10th Result
        </title>
      </Head>
      <Header
        setSelectedColleges={setSelectedColleges}
        selectedColleges={selectedColleges}
        setLoading={setLoading}
        showSearchCont={true}
        collegeName={collegeName}
        location={location}
        locationData={locationData}
      />

      <div className="home-cont">
        {loading ? (
          <div
            className="home-cont d-flex flex-column align-items-center"
            style={{ backgroundColor: 'transparent' }}
          >
            <Audio
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="audio-loading"
              wrapperStyle={{ marginTop: '5rem' }}
              wrapperClass="wrapper-class"
              visible={true}
            />
            <span className="loading-text">Loading colleges please wait..</span>
          </div>
        ) : (
          <>
            <div className="college-tab-cont">
              {categories
                ?.sort((a, b) => Number(a.priority) - Number(b.priority))
                ?.map((d, index) => (
                  <a
                    key={index}
                    className={clsx(
                      'tabs',
                      category?.replace('%20', ' ') === d?.College_Category
                        ? 'tabs-active'
                        : '',
                    )}
                    onClick={() => {
                      window.scrollTo({ top: 615, behavior: 'smooth' })
                      setSeed(Math.random())
                    }}
                    href={
                      collegeName && location
                        ? `/colleges/1/${d?.College_Category}/${location}/${collegeName}`
                        : location
                        ? `/colleges/1/${d?.College_Category}/${location}`
                        : `/colleges/1/${d?.College_Category}`
                    }
                  >
                    {d?.College_Category}
                  </a>
                ))}
            </div>

            <Container className="container">
              {!!final?.length ? (
                <CollegeList
                  key={seed}
                  collegeData={final}
                  loading={loading}
                  deleteCollege={deleteCollege}
                  collegeName={collegeName}
                  category={category}
                  location={location}
                  count={totalCount}
                  pagination={pagination}
                />
              ) : (
                <div className="no-collge-cont">
                  <Image src={noCollege} alt="" className="no-college-found" />
                  <span className="no-colleges-text">
                    No {category} Colleges Found
                  </span>
                </div>
              )}
            </Container>

            {!loading && !userInfo && (
              <div className="auth-cont-home">
                <Auth
                  isDefaultRegister={true}
                  registerHeaderText="To write Entrance exam, View other details register first"
                  isFromHomeScreen={true}
                />
              </div>
            )}
          </>
        )}
      </div>

      {!loading && pathName !== 'FilterScreen' && (
        <Footer
          locationData={locationData}
          loading={loading}
          setSelectedColleges={setSelectedColleges}
        />
      )}
    </>
  )
}

export default Home

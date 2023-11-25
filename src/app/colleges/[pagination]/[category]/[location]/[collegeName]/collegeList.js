import React, { useState } from 'react'
import StarRatings from 'react-star-ratings'
import { HiBuildingLibrary, HiFlag } from 'react-icons/hi2'
import { IoIosSchool, IoMdWarning } from 'react-icons/io'
import { Audio } from 'react-loader-spinner'
import { FiMapPin } from 'react-icons/fi'
import { adminOpen } from '../../../../../assets/index'
import { useRouter } from 'next/navigation'
import ReactPaginate from 'react-paginate'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import Image from 'next/image'

const CollegeList = (props) => {
  const { collegeData, loading, deleteCollege, collegeName, count } = props
  const [openAlert, setOpenAlert] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [selected, setSelected] = useState()

  let userInfoLocal = localStorage.getItem('userInfo')
  let userInfo = userInfoLocal && JSON.parse(userInfoLocal)
  const isEditAccess =
    userInfo?.contactNumber === '9663881439' ||
    userInfo?.contactNumber === '8553322965'

  const navigate = useRouter()

  const itemsPerPage = 10
  const itemsTotalLength = count
  const pageCount = Math.ceil(itemsTotalLength / itemsPerPage)

  let pagination =
    Number(props?.pagination) > pageCount ? 1 : Number(props?.pagination) - 1

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % itemsTotalLength
    if (props.location) {
      navigate.push(
        `/colleges/${(newOffset + 10) / 10}/${props?.category}/${
          props.location
        }`,
        {
          replace: true,
        },
      )
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate.push(`/colleges/${(newOffset + 10) / 10}/${props?.category}`, {
        replace: true,
      })
    }
  }

  let data = collegeData.filter((d) => (isEditAccess ? d : d?.isActive))

  return (
    <div className="college-list-cont">
      {loading && (
        <>
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
        </>
      )}
      {!loading && (
        <>
          <div className="cards-list-cont">
            {data
              ?.sort(function (x, y) {
                if (collegeName) {
                  return x?.collegeName === collegeName
                    ? -1
                    : y?.collegeName === collegeName
                    ? 1
                    : 0
                } else {
                  return Number(y?.votes) - x?.votes
                }
              })
              ?.map((d, index) => {
                var collegeImage = d?.collegeImages?.filter((ds) => {
                  var array = ds?.College_Image?.split('/')
                  var lastsegment = array[array.length - 1]
                  var key =
                    lastsegment.split('.')[0].split('_')[0] === 'collegeImage'
                  return key
                })[0]?.College_Image

                return (
                  <div className="cards" key={index}>
                    <div className="cards-first-cont">
                      <div
                        className="image-cont"
                        style={{
                          backgroundImage: `url(${collegeImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <div className="college-details-cont">
                        <Image
                          src={adminOpen}
                          className="admission-open-image"
                          alt="admission-open"
                          height="40"
                          width="150"
                        />
                        <div className="college-name-cont">
                          <span className="college-name">{d.collegeName}</span>
                          <span className="college-loc">
                            <FiMapPin className="me-2" />
                            {d.location}
                          </span>
                          <div className="mt-3 d-flex justify-contnet-center">
                            <span className="rating-text ms-0 me-2">
                              {d.rate}/5
                            </span>

                            <StarRatings
                              rating={Number(d.rate)}
                              numberOfStars={5}
                              name="rating"
                              starDimension="2.4rem"
                              starSpacing="0.5rem"
                              starRatedColor="var(--bg-success)"
                            />
                            <span
                              className="rating-text"
                              style={{ fontWeight: 600 }}
                            >
                              ( {d?.votes ? d?.votes : 0} Votes )
                            </span>
                          </div>
                        </div>

                        <div className="college-type-cont">
                          <div className="college-type">
                            <div className="d-flex align-items-center">
                              <IoIosSchool className="icon" />
                              <span className="college-type-header ms-2">
                                Course Offered
                              </span>
                            </div>

                            <span className="college-type-name">
                              {d.coursesOffered}
                            </span>
                          </div>

                          <div className="college-type">
                            <div className="d-flex align-items-center">
                              <HiBuildingLibrary className="icon" />
                              <span className="college-type-header ms-2">
                                Campus Type
                              </span>
                            </div>

                            <span className="college-type-name">
                              {d?.campusType}
                            </span>
                          </div>

                          <div className="college-type">
                            <div className="d-flex align-items-center">
                              <HiFlag className="icon" />
                              <span className="college-type-header ms-2">
                                Boarding Type
                              </span>
                            </div>

                            <span className="college-type-name">
                              {d?.collegeType}
                            </span>
                          </div>

                          <div className="college-type">
                            <a
                              className="default-nav-btn"
                              href={`/details/${d?.location?.toLowerCase()}/${d?.collegeName.replaceAll(
                                ' ',
                                '-',
                              )}`}
                            >
                              View Details
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isEditAccess && (
                      <div
                        className="confirm-popup-btn-cont"
                        style={{ justifyContent: 'flex-end' }}
                      >
                        <button
                          className="auth-btn"
                          onClick={() =>
                            navigate.push(
                              `/admin/register_college/${d?.collegeName.replaceAll(
                                ' ',
                                '-',
                              )}`,
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="close-btn"
                          onClick={() => {
                            setOpenDeleteAlert(true)
                            setSelected(
                              d?.collegeName
                                .replaceAll(' ', '-')
                                ?.toLowerCase(),
                            )
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
          <div className="pagination-cont">
            <ReactPaginate
              breakLabel="..."
              nextLabel={<FaAngleDoubleRight></FaAngleDoubleRight>}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel={<FaAngleDoubleLeft></FaAngleDoubleLeft>}
              renderOnZeroPageCount={null}
              className="pagination"
              initialPage={pagination}
            />
          </div>
        </>
      )}

      {openAlert && (
        <div className="confirm-popup-main-cont">
          <div className="confirm-popup">
            <div className="note">
              <IoMdWarning className="note-icon" />
              Please register / login to view more information.
            </div>

            <div className="confirm-popup-btn-cont">
              <a href={'/auth'} className="close-btn">
                Login
              </a>
              <button className="close-btn" onClick={() => setOpenAlert(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {openDeleteAlert && (
        <div className="confirm-popup-main-cont">
          <div className="confirm-popup">
            <div className="note">
              <IoMdWarning className="note-icon" />
              Are you sure ? You want to delete this college.
            </div>

            <div className="confirm-popup-btn-cont">
              <button
                onClick={() => deleteCollege(selected)}
                className="close-btn"
              >
                Delete
              </button>
              <button
                className="close-btn"
                onClick={() => setOpenDeleteAlert(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollegeList

import React from 'react'
import StarRatings from 'react-star-ratings'
import { HiBuildingLibrary, HiFlag } from 'react-icons/hi2'
import { IoIosSchool } from 'react-icons/io'
import { FiMapPin } from 'react-icons/fi'
import ReactHtmlParser from 'react-html-parser'
import Image from 'next/image'

const CollegeMainDetals = (props) => {
  const { selectedData } = props

  var collegeImage = selectedData?.collegeImages?.filter((ds) => {
    var array = ds?.College_Image?.split('/')
    var lastsegment = array[array.length - 1]
    var key = lastsegment.split('.')[0].split('_')[0] === 'collegeImage'
    return key
  })[0]?.College_Image

  return (
    <div className="college-header-data-cont">
      <div className="cards">
        <Image
          src={collegeImage}
          className="image-cont"
          alt=""
          width="100"
          height="300"
          priority={true}
        />
        <div className="college-details-cont">
          <div className="college-cont-1">
            <div className="college-name-cont">
              <span className="college-name">{selectedData.collegeName}</span>
              <span className="college-loc">
                <FiMapPin className="me-2" />
                {selectedData.location}
              </span>
              <div className="mt-3 d-flex justify-contnet-center">
                <span className="rating-text ms-0 me-2">
                  {selectedData?.rate}/5
                </span>

                <StarRatings
                  rating={Number(selectedData?.rate)}
                  numberOfStars={5}
                  name="rating"
                  starDimension="2.4rem"
                  starSpacing="0.5rem"
                  starRatedColor="var(--bg-success)"
                />
                <span className="rating-text" style={{ fontWeight: 600 }}>
                  ( {selectedData?.votes ? selectedData?.votes : 0} Votes )
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
                  {selectedData.coursesOffered}
                </span>
              </div>

              <div className="college-type">
                <div className="d-flex align-items-center">
                  <HiBuildingLibrary className="icon" />
                  <span className="college-type-header ms-2">Campus Type</span>
                </div>

                <span className="college-type-name">
                  {selectedData?.campusType}
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
                  {selectedData.collegeType}
                </span>
              </div>
            </div>
          </div>

          <div className="collegeDescription">
            {ReactHtmlParser(selectedData?.collegeDescription)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollegeMainDetals

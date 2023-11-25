import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'
import Image from 'next/image'

const Gallery = (props) => {
  const { resultGallery, title, description } = props
  const [openSlideShow, setOpenSlideShow] = useState(false)
  const [slide, setSelectedSlide] = useState(0)

  return (
    <div
      className="details"
      style={
        title?.length === 0 &&
        description?.length === 0 &&
        resultGallery?.length === 0
          ? { display: 'none' }
          : {}
      }
    >
      <div className="details-header">
        <span>{title}</span>{' '}
      </div>

      {!!resultGallery?.length && (
        <div className="gallery-cont">
          {resultGallery?.map((d, i) => (
            <Image
              key={i}
              src={d?.College_Image}
              alt=""
              className="second-cont-img"
              onClick={() => {
                setOpenSlideShow(true)
                setSelectedSlide(i)
              }}
              width="300"
              height="300"
            />
          ))}
        </div>
      )}

      {description && (
        <div className="details-header_description">
          {ReactHtmlParser(description)}
        </div>
      )}

      {openSlideShow && (
        <Modal
          show={openSlideShow}
          onHide={() => setOpenSlideShow(false)}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Body>
            <div className="h-100">
              <Image
                src={resultGallery[slide]?.College_Image}
                alt=""
                width="500"
                height="550"
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <div>
              <button
                className="btn btn-outline-secondary me-3"
                onClick={() => {
                  if (slide !== 0) {
                    setSelectedSlide(slide - 1)
                  }
                }}
                disabled={slide === 0}
              >
                Previous
              </button>
              <button
                className="btn btn-outline-secondary "
                onClick={() => {
                  if (slide !== resultGallery.length - 1) {
                    setSelectedSlide(slide + 1)
                  }
                }}
                disabled={slide === resultGallery.length - 1}
              >
                Next
              </button>
            </div>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setOpenSlideShow(false)}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  )
}

export default Gallery

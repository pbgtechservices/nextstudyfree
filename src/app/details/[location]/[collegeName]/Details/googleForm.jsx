import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

const GoogleForm = (props) => {
  const { externalLink, title } = props
  const [openSlideShow, setOpenSlideShow] = useState(false)

  return (
    <div className="details">
      <div className="details-header">
        <span>{title}</span>
      </div>

      <div style={{ filter: 'blur(8px)' }} className="suspense-content">
        ssss
      </div>
      <button className="view-btn" onClick={() => setOpenSlideShow(true)}>
        View
      </button>

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
              <iframe
                src={externalLink}
                title={title}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
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

export default GoogleForm

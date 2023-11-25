import React from 'react'
import { FaAngleDoubleDown } from 'react-icons/fa'

const Banner = (props) => {
  return (
    <div className="banner">
      <div className="content-overlay">
        <span className="b-content">
          Get upto
          <span className="b-content-highlighter b-content-highlighter-2">
            {' '}
            100%{' '}
          </span>
          fee concesion in most of the reputed
          <span className="b-content-highlighter b-content-highlighter-1">
            {' '}
            PU Science Colleges{' '}
          </span>
          based on
          <span className="b-content-highlighter b-content-highlighter-2">
            {' '}
            Entrance Exam or 10th Result{' '}
          </span>
        </span>

        <button
          className="online-exam-btn"
          onClick={() =>
            window.open('https://forms.gle/zWUD6UzqWqncTiXz9', '_blank').focus()
          }
        >
          Click Here To Write Online Exam
        </button>
      </div>

      <div onClick={props.handleBackClick} className="scroller-cont">
        <div className="scroll-animate-view">
          <div className="content">
            <span className="cont-1">Scroll down</span>
            <span className="cont-2">to discover more</span>
          </div>
          <FaAngleDoubleDown className="icon" />
        </div>
      </div>
    </div>
  )
}

export default Banner

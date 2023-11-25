import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

const Faq = (props) => {
  const { faqs } = props
  const [selectedIndex, setSelectedIndex] = useState(-1)
  return (
    <div className="details">
      <div className="details-header">
        <span>{'FAQ'}</span>
      </div>

      <div className="accordion" id="accordionExample">
        {faqs.map((d, index) => (
          <div className="accordion-item" key={index}>
            <div
              className="accordion-header"
              onClick={() =>
                setSelectedIndex(selectedIndex === index ? -1 : index)
              }
            >
              {d?.question}
              {selectedIndex === index ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {selectedIndex === index && (
              <div className="accordion-body">{d?.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faq

import React from 'react'
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from 'react-icons/bs'

const Contact = (props) => {
  const { selectedData } = props
  const isPhoneNumber = selectedData?.contactNumber
  const isAlternatePhoneNumber = selectedData?.alteratePhoneNumber
  const isAdress = selectedData?.address
  const isWebsiteLink = selectedData?.websiteLink
  const FB_Link = selectedData?.FB_Link
  const Insta_Link = selectedData?.Insta_Link
  const Linkedin_Link = selectedData?.Linkedin_Link
  const Twitter_Link = selectedData?.Twitter_Link

  return (
    <div
      className="details"
      style={
        !isPhoneNumber && !isAdress && !isWebsiteLink ? { display: 'none' } : {}
      }
    >
      <div className="details-header">
        <span>Contact Details</span>
      </div>
      <div className="details-content">
        Phone Number:{' '}
        <a href={`tel:${isPhoneNumber}`} style={{ color: '#52a7dc' }}>
          {isPhoneNumber}
        </a>
      </div>
      <div className="details-content">
        Alternate Contact Number:{' '}
        <a href={`tel:${isAlternatePhoneNumber}`} style={{ color: '#52a7dc' }}>
          {isAlternatePhoneNumber}
        </a>
      </div>
      {isAdress && (
        <div className="details-content">
          Address: <span style={{ color: '#52a7dc' }}>{isAdress}</span>
        </div>
      )}
      {isWebsiteLink && (
        <div className="details-content">
          Website Link:{' '}
          <span
            style={{ color: '#52a7dc', cursor: 'pointer' }}
            onClick={() => window.open(isWebsiteLink, '_blank').focus()}
          >
            {isWebsiteLink}
          </span>
        </div>
      )}

      {(FB_Link || Insta_Link || Twitter_Link || Linkedin_Link) && (
        <div className="details-content d-flex flex-row">
          Follow Us:{' '}
          {FB_Link && (
            <span
              style={{
                color: '#52a7dc',
                cursor: 'pointer',
                marginRight: '2rem',
                marginLeft: '2rem',
              }}
              onClick={() => window.open(FB_Link, '_blank').focus()}
            >
              <BsFacebook />
            </span>
          )}
          {Insta_Link && (
            <span
              style={{
                color: '#52a7dc',
                cursor: 'pointer',
                marginRight: '2rem',
              }}
              onClick={() => window.open(Insta_Link, '_blank').focus()}
            >
              <BsInstagram />
            </span>
          )}
          {Twitter_Link && (
            <span
              style={{
                color: '#52a7dc',
                cursor: 'pointer',
                marginRight: '2rem',
              }}
              onClick={() => window.open(Twitter_Link, '_blank').focus()}
            >
              <BsTwitter />
            </span>
          )}
          {Linkedin_Link && (
            <span
              style={{
                color: '#52a7dc',
                cursor: 'pointer',
                marginRight: '2rem',
              }}
              onClick={() => window.open(Linkedin_Link, '_blank').focus()}
            >
              <BsLinkedin />
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default Contact

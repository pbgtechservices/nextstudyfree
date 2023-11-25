import React from 'react'
import ReactPlayer from 'react-player'
import ReactHtmlParser from 'react-html-parser'

const YoutubeVideos = (props) => {
  const { videos, title, description } = props
  return (
    <div
      className="details"
      style={
        title?.length === 0 && description?.length === 0 && videos?.length === 0
          ? { display: 'none' }
          : {}
      }
    >
      <div className="details-header">
        <span>{title ? title : 'Videos'}</span>
      </div>

      {description && (
        <div className="details-header_description">
          {ReactHtmlParser(description)}
        </div>
      )}

      {!!videos?.filter((d) => d !== '').length && (
        <div className="videos-cont">
          {videos.map((d, index) => (
            <div className="video-card" key={index}>
              <ReactPlayer url={d} width="100%" height="100%" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default YoutubeVideos

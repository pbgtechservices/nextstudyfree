import React from 'react'
import Contact from './Details/contact'
import Gallery from './Details/gallery'
import YoutubeVideos from './Details/youtubeVideos'
import Faq from './Details/faq'
import GoogleForm from './Details/googleForm'
// import ReactHtmlParser from 'react-html-parser'

const CollegeSubDetails = (props) => {
  const { selectedData } = props

  var collegeImages = selectedData?.collegeImages?.filter((ds) => {
    var array = ds?.College_Image?.split('/')
    var lastsegment = array[array.length - 1]
    var key = lastsegment.split('.')[0].split('_')[0] === 'resultGallery'
    return key
  })

  var resultGallery = selectedData?.collegeImages?.filter((ds) => {
    var array = ds?.College_Image?.split('/')
    var lastsegment = array[array.length - 1]
    var key = lastsegment.split('.')[0].split('_')[0] === 'gallery'
    return key
  })

  var resultGallery1 = selectedData?.collegeImages?.filter((ds) => {
    var array = ds?.College_Image?.split('/')
    var lastsegment = array[array.length - 1]
    var key = lastsegment.split('.')[0].split('_')[0] === 'gallery1'
    return key
  })
  var resultGallery2 = selectedData?.collegeImages?.filter((ds) => {
    var array = ds?.College_Image?.split('/')
    var lastsegment = array[array.length - 1]
    var key = lastsegment.split('.')[0].split('_')[0] === 'gallery2'
    return key
  })
  var resultGallery3 = selectedData?.collegeImages?.filter((ds) => {
    var array = ds?.College_Image?.split('/')
    var lastsegment = array[array.length - 1]
    var key = lastsegment.split('.')[0].split('_')[0] === 'gallery3'
    return key
  })
  var resultGallery4 = selectedData?.collegeImages?.filter((ds) => {
    var array = ds?.College_Image?.split('/')
    var lastsegment = array[array.length - 1]
    var key = lastsegment.split('.')[0].split('_')[0] === 'gallery4'
    return key
  })

  var resultGallery5 = selectedData?.collegeImages?.filter((ds) => {
    var array = ds?.College_Image?.split('/')
    var lastsegment = array[array.length - 1]
    var key = lastsegment.split('.')[0].split('_')[0] === 'gallery4'
    return key
  })

  return (
    <div className="college-sub-details-cont">
      <div>
        <Gallery
          resultGallery={collegeImages}
          title="Results"
          description={selectedData?.resultDescription}
        />

        <GoogleForm
          externalLink={selectedData?.link}
          title={selectedData?.linkName}
        />

        {!!resultGallery.length && (
          <Gallery
            resultGallery={resultGallery}
            title="Gallery"
            description={selectedData?.galleryDescription}
          />
        )}

        {selectedData?.Gallery_One && selectedData?.Gallery_Description_One && (
          <Gallery
            resultGallery={resultGallery1}
            title={selectedData?.Gallery_One}
            description={selectedData?.Gallery_Description_One}
          />
        )}

        {selectedData?.Gallery_Two && selectedData?.Gallery_Description_Two && (
          <Gallery
            resultGallery={resultGallery2}
            title={selectedData?.Gallery_Two}
            description={selectedData?.Gallery_Description_Two}
          />
        )}

        {selectedData?.Gallery_Three &&
          selectedData?.Gallery_Description_Three && (
            <Gallery
              resultGallery={resultGallery3}
              title={selectedData?.Gallery_Three}
              description={selectedData?.Gallery_Description_Three}
            />
          )}

        {selectedData?.Gallery_Four &&
          selectedData?.Gallery_Description_Four && (
            <Gallery
              resultGallery={resultGallery4}
              title={selectedData?.Gallery_Four}
              description={selectedData?.Gallery_Description_Four}
            />
          )}

        {selectedData?.Gallery_Five &&
          selectedData?.Gallery_Description_Five && (
            <Gallery
              resultGallery={resultGallery5}
              title={selectedData?.Gallery_Five}
              description={selectedData?.Gallery_Description_Five}
            />
          )}

        {!!selectedData?.youtubeUrls?.filter((d) => d !== '')?.length && (
          <YoutubeVideos videos={selectedData?.youtubeUrls} />
        )}

        {selectedData?.YoutubeUrl_One && selectedData?.Video_Url_One && (
          <YoutubeVideos
            videos={selectedData?.YoutubeUrl_One}
            title={selectedData?.Video_Url_One}
            description={selectedData?.Video_Url_Description_One}
          />
        )}

        {selectedData?.YoutubeUrl_Two && selectedData?.Video_Url_Two && (
          <YoutubeVideos
            videos={selectedData?.YoutubeUrl_Two}
            title={selectedData?.Video_Url_Two}
            description={selectedData?.Video_Url_Description_Two}
          />
        )}

        {selectedData?.YoutubeUrl_Three && selectedData?.Video_Url_Three && (
          <YoutubeVideos
            videos={selectedData?.YoutubeUrl_Three}
            title={selectedData?.Video_Url_Three}
            description={selectedData?.Video_Url_Description_Three}
          />
        )}

        {selectedData?.YoutubeUrl_Four && selectedData?.Video_Url_Four && (
          <YoutubeVideos
            videos={selectedData?.YoutubeUrl_Four}
            title={selectedData?.Video_Url_Four}
            description={selectedData?.Video_Url_Description_Four}
          />
        )}

        {selectedData?.YoutubeUrl_Five && selectedData?.Video_Url_Five && (
          <YoutubeVideos
            videos={selectedData?.YoutubeUrl_Five}
            title={selectedData?.Video_Url_Five}
            description={selectedData?.Video_Url_Description_Five}
          />
        )}

        {!!selectedData?.FAQ?.length && <Faq faqs={selectedData?.FAQ} />}

        {/* <Contact selectedData={selectedData} />
        {selectedData?.College_Map_Location && (
          <div className="details" style={{ padding: '2rem' }}>
            {ReactHtmlParser(selectedData?.College_Map_Location)}
          </div>
        )} */}
      </div>
    </div>
  )
}

export default CollegeSubDetails

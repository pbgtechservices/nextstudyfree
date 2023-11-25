import React, { useState } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Form } from 'react-bootstrap'
import { callToBackendForFiles } from '../../controls/api'

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

export const ImageCroppper = (props) => {
  const {
    uploadedFiles,
    setUploadedFiles,
    isCollegeImage,
    isResultImage,
    onDeleteClick,
    isGallery1,
    isGallery2,
    isGallery3,
    isGallery4,
    isGallery5,
    isThumbnail,
  } = props
  const { setCropData, cropper, setCropper, cropData } = props
  const [image, setImage] = useState()

  const onChange = (e) => {
    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles]
    let limitExceeded = false
    uploaded.push(files)
    if (!limitExceeded) setUploadedFiles(uploaded)
  }

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      let data = cropData.concat([cropper.getCroppedCanvas().toDataURL()])
      var file = dataURLtoFile(
        cropper.getCroppedCanvas().toDataURL(),
        isCollegeImage
          ? `collegeImage_${new Date().getTime()}.jpeg`
          : isResultImage
          ? `resultGallery_${new Date().getTime()}.jpeg`
          : isGallery1
          ? `gallery1_${new Date().getTime()}.jpeg`
          : isGallery2
          ? `gallery2_${new Date().getTime()}.jpeg`
          : isGallery3
          ? `gallery3_${new Date().getTime()}.jpeg`
          : isGallery4
          ? `gallery4_${new Date().getTime()}.jpeg`
          : isGallery5
          ? `gallery5_${new Date().getTime()}.jpeg`
          : isThumbnail
          ? `thumbnail_${new Date().getTime()}.jpeg`
          : `gallery_${new Date().getTime()}.jpeg`,
      )
      var formData = new FormData()
      formData.append('College_Image', file)
      props.setIsFilesUploading(true)
      callToBackendForFiles(
        'college/college-image-list/',
        'POST',
        formData,
      ).then((d) => {
        handleUploadFiles(d)
        props.setIsFilesUploading(false)
      })
      setCropData(data)
      setImage()
    }
  }

  return (
    <div>
      <Form.Control
        type="file"
        onChange={onChange}
        placeholder="Enter Colege Name"
        accept="image/*"
        className="image-crop-input"
        onClick={(event) => {
          event.target.value = null
        }}
        disabled={props.disabled ? props.disabled : false}
      />
      {image && (
        <div className="my-5">
          <Cropper
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance)
            }}
            guides={true}
            className="image-cropper-cont"
          />
          <button onClick={getCropData} className="image-crop-btn">
            Crop Image
          </button>
        </div>
      )}

      {cropData && (
        <div className="cropped-images-cont">
          {cropData.map((d, index) => (
            <div className="d-flex flex-column me-3">
              <img className="croppped-img" src={d} alt="" />
              <button
                className="delete-btn"
                style={{ height: '4rem', width: '200px' }}
                onClick={(ev) => onDeleteClick(ev, index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

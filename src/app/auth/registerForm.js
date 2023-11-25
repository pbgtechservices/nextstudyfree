import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useRouter } from 'next/navigation'
import { phoneRegex } from './loginForm'
import { callToBackend } from '../controls/api'
import Loader from '../components/loader/loader'

export default function Register(props) {
  const [presentSchoolName, setPresentSchoolName] = useState('')
  const [studentName, setStudentName] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [mobile, setmobile] = useState('')
  const [city, setCity] = useState('')
  const [sslcPercentahe, setSSLCPercentage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useRouter()
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false)

  function validateForm() {
    return (
      studentName.length > 0 &&
      fatherName.length > 0 &&
      mobile.length > 0 &&
      city.length > 0 &&
      presentSchoolName.length > 0 &&
      sslcPercentahe.length > 0 &&
      !invalidPhoneNumber
    )
  }

  const handleSubmit = () => {
    setLoading(true)

    let expected = Number(sslcPercentahe).toFixed(2)

    let body = {
      studentName: studentName,
      fatherName: fatherName,
      presentSchoolName: presentSchoolName,
      district: city,
      expectedResultInTenth: Number(expected),
      contactNumber: mobile,
    }
    callToBackend('student/student-list/', 'POST', body)
      .then((d) => {
        localStorage.setItem('userInfo', JSON.stringify(d))
        setLoading(false)
        if (props.isFromHomeScreen) {
          window.location.reload()
        } else {
          navigate.push('/')
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div className="auth-form-cont">
      {loading && <Loader />}

      <Form className="form-cont">
        <Form.Group size="lg" controlId="email" className="form-group">
          <Form.Label>Student Name *</Form.Label>

          <Form.Control
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter Student Name"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email" className="form-group">
          <Form.Label>Father Name *</Form.Label>

          <Form.Control
            type="text"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            placeholder="Enter Father Name"
          />
        </Form.Group>

        <Form.Group size="lg" controlId="email" className="form-group">
          <Form.Label>
            Mobile Number * <small>(Username)</small>
          </Form.Label>

          <Form.Control
            type="text"
            value={mobile}
            onChange={(e) => {
              setmobile(e.target.value)
              if (e.target.value.match(phoneRegex)) {
                setInvalidPhoneNumber(false)
              } else {
                setInvalidPhoneNumber(true)
              }
            }}
            maxLength={10}
            placeholder="Enter Phone Number"
          />

          {mobile.length > 0 && invalidPhoneNumber && (
            <small
              className="ms-3 mt-3 text-danger"
              style={{ fontSize: '1.2rem', fontWeight: 600 }}
            >
              Please enter valid phone number.
            </small>
          )}
        </Form.Group>

        <Form.Group size="lg" controlId="email" className="form-group">
          <Form.Label>Present School Name *</Form.Label>

          <Form.Control
            type="text"
            value={presentSchoolName}
            onChange={(e) => setPresentSchoolName(e.target.value)}
            placeholder="Enter Present School Name"
          />
        </Form.Group>

        <Form.Group size="lg" controlId="email" className="form-group">
          <Form.Label>City *</Form.Label>

          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Select City"
          />
        </Form.Group>

        <Form.Group size="lg" controlId="email" className="form-group">
          <Form.Label>Expected sslc percentage *</Form.Label>

          <Form.Control
            type="text"
            value={sslcPercentahe}
            onChange={(e) => setSSLCPercentage(e.target.value)}
            placeholder="Enter Expected sslc percentage"
          />
        </Form.Group>

        {props.isFromHomeScreen ? (
          <div></div>
        ) : (
          <div className="w-100 d-flex justify-content-center">
            <span className="content">
              Already User ?{' '}
              <span
                className="highlight"
                onClick={() => props.setRegister(false)}
              >
                Login
              </span>{' '}
            </span>
          </div>
        )}

        <div className="w-100 d-flex justify-content-center">
          <Button
            disabled={!validateForm()}
            className="auth-btn"
            style={{ width: '30%' }}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </div>
      </Form>
    </div>
  )
}

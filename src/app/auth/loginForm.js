import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useRouter } from 'next/navigation'
import { FallingLines } from 'react-loader-spinner'
import Loader from '../components/loader/loader'
import { callToBackend } from '../controls/api'

export const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

export default function Login(props) {
  const [phoneNumber, setphoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useRouter()
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false)

  function validateForm() {
    return phoneNumber.length > 0 && !invalidPhoneNumber
  }

  const handleSubmit = () => {
    setLoading(true)
    let body = {
      contactNumber: phoneNumber,
    }
    callToBackend('student/student-login/', 'POST', body)
      .then((d) => {
        localStorage.setItem('userInfo', JSON.stringify(d))
        setLoading(FallingLines)
        navigate.push('/')
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div className="auth-form-cont">
      {loading && <Loader />}
      <Form
        className="form-cont"
        style={{ flexDirection: 'column', width: '60%' }}
      >
        <Form.Group size="lg" className="form-group" style={{ width: '100%' }}>
          <Form.Label>Mobile Number *</Form.Label>

          <Form.Control
            autoFocus
            type="text"
            value={phoneNumber}
            onChange={(e) => {
              setphoneNumber(e.target.value)
              if (e.target.value.match(phoneRegex)) {
                setInvalidPhoneNumber(false)
              } else {
                setInvalidPhoneNumber(true)
              }
            }}
            placeholder="Enter Mobile Number"
            autoComplete="new-password"
            maxLength={10}
          />
          {phoneNumber.length > 0 && invalidPhoneNumber && (
            <small
              className="ms-3 mt-3 text-danger"
              style={{ fontSize: '1.2rem', fontWeight: 600 }}
            >
              Please enter valid phone number.
            </small>
          )}
        </Form.Group>

        <div className="w-100 d-flex justify-content-center">
          <span className="content">
            New User ?{' '}
            <span className="highlight" onClick={() => props.setRegister(true)}>
              Register
            </span>{' '}
          </span>
        </div>

        <Button
          block
          disabled={!validateForm()}
          className="auth-btn"
          onClick={() => {
            handleSubmit()
          }}
        >
          Login
        </Button>
      </Form>
    </div>
  )
}

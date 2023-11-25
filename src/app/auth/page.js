'use client'
import React, { useState } from 'react'
import Login from './loginForm'
import Register from './registerForm'
import Header from '../components/header/header'

const Auth = (props) => {
  const { isDefaultRegister, registerHeaderText, isFromHomeScreen } = props
  const [resigetr, setRegister] = useState(
    isDefaultRegister !== undefined ? isDefaultRegister : false,
  )
  return (
    <>
      {!isFromHomeScreen && <Header showSearchCont={false} />}
      <div className="auth-cont">
        <div className="left-cont" />
        <div className="right-cont">
          <div className="welcome-header">
            <span className="b-header">Welcome</span>
            <span className="b-header-2">
              {!resigetr
                ? 'Please Login'
                : registerHeaderText !== undefined
                ? registerHeaderText
                : 'Please Register'}
            </span>
          </div>

          {!resigetr ? (
            <Login setRegister={setRegister} />
          ) : (
            <Register
              setRegister={setRegister}
              isFromHomeScreen={isFromHomeScreen}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Auth

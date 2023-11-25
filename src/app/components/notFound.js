import React from 'react'
import { notFound } from '../assets/index'
import Header from './header/header'

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 notfound-cont">
      <Header />
      <img src={notFound} alt="" style={{ height: '40rem', width: '40rem' }} />
    </div>
  )
}

export default NotFound

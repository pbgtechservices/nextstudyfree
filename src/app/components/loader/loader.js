import React from 'react'
import { Oval } from 'react-loader-spinner'
import './loader.scss'
const Loader = () => {
  return (
    <div className="loader-cont">
      <div className="loader-spin-cont">
        <Oval
          height={60}
          width={60}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    </div>
  )
}

export default Loader

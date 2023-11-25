'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/colleges/1/PUC Science', { scroll: false })
  }, [router])

  return (
    <div className="d-flex justify-content-center align-items-center w-100 notfound-cont"></div>
  )
}

export default Home

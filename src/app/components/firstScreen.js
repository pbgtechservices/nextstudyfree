import { useEffect } from 'react'
import { useRouter } from 'next/router'

const FirstScreen = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/colleges/1/PUC%20Science') // Use encoded space (%20) for the space in the URL
  }, [router])

  return (
    <div className="d-flex justify-content-center align-items-center w-100 notfound-cont"></div>
  )
}

export default FirstScreen

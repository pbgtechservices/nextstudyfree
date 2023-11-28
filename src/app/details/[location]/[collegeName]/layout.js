import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.collegeName

  // fetch data
  const selectedData = await fetch(
    `https://studyfree.herokuapp.com/college/college-detail/${id}/`,
  ).then((res) => res.json())

  var thumbnails = selectedData?.collegeImages
    ?.filter((ds) => {
      var array = ds?.College_Image?.split('/')
      var lastsegment = array[array.length - 1]
      var key = lastsegment.split('.')[0].split('_')[0] === 'thumbnail'
      return key
    })[0]
    ?.College_Image?.split('?')[0]

  var collegeImages = selectedData?.collegeImages
    ?.filter((ds) => {
      var array = ds?.College_Image?.split('/')
      var lastsegment = array[array.length - 1]
      var key = lastsegment.split('.')[0].split('_')[0] === 'collegeImage'
      return key
    })[0]
    ?.College_Image?.split('?')[0]

  const title = selectedData?.Open_Graph_Title || selectedData?.collegeName
  const description = selectedData?.Open_Graph_Description
  const canonicalURL = 'your_canonical_url_here' // Replace with your actual canonical URL
  const thumbnail = [thumbnails] || [collegeImages]

  return {
    title:
      title && description
        ? `${title} | ${description}`
        : 'Study | Get 100% Fee Concession In Reputed PU Science College Based on Entrance Exam or 10th Result',
    favicon: thumbnail,
    canonicalURL: 'your_canonical_url_here', // Replace with your actual canonical URL
    twitter: {
      url: canonicalURL,
      title: title,
      description: description,
      image: [...thumbnail],
    },
    openGraph: {
      url: canonicalURL,
      title: title,
      description: description,
      image: [...thumbnail],
      imageWidth: 1200,
      imageHeight: 630,
      type: 'website',
      siteName: title,
      imageAlt: description,
    },
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="body-light">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.collegeName

  // fetch data
  const selectedData = await fetch(
    `https://studyfree.herokuapp.com/college/college-detail/${id}/`,
  ).then((res) => res.json())

  var thumbnails = selectedData?.collegeImages[0]
  console.log(thumbnails)
    // ?.filter((ds) => {
    //   var array = ds?.College_Image?.split('/')
    //   var lastsegment = array[array.length - 1]
    //   var key = lastsegment.split('.')[0].split('_')[0] === 'thumbnail'
    //   return key
    // })[0]
    // ?.College_Image?.split('?')[0]

  var collegeImages = selectedData?.collegeImages[0]
    // ?.filter((ds) => {
    //   var array = ds?.College_Image?.split('/')
    //   var lastsegment = array[array.length - 1]
    //   var key = lastsegment.split('.')[0].split('_')[0] === 'collegeImage'
    //   return key
    // })[0]
    ?.College_Image?.split('?')[0]

  const title = selectedData?.Open_Graph_Title || selectedData?.collegeName
  const description = selectedData?.Open_Graph_Description
  const canonicalURL = 'your_canonical_url_here' // Replace with your actual canonical URL
  const thumbnail = [...'https://studyfree.s3.amazonaws.com/resultGallery_1698135247478.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5BDHIMAGXQUWF52K%2F20231128%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20231128T143641Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=249e03b9e3ede02a61f9f35f8ef08881b8f217cd499b6e451c1e559658654a60'] 

  return {
    title:
      title && description
        ? `${title} | ${description}`
        : 'Study | Get 100% Fee Concession In Reputed PU Science College Based on Entrance Exam or 10th Result',
    // favicon: thumbnail,
    icons: {
      icon: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=2048x2048&w=is&k=20&c=Xa_wH_pZFMWNX8EPtufv9KSvS1OzUPus7C0Br2ZIMDg=',
    },
    canonicalURL: 'your_canonical_url_here', // Replace with your actual canonical URL
    twitter: {
      url: canonicalURL,
      title: title,
      description: description,
      image: [...'https://studyfree.s3.amazonaws.com/resultGallery_1698135247478.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5BDHIMAGXQUWF52K%2F20231128%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20231128T143641Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=249e03b9e3ede02a61f9f35f8ef08881b8f217cd499b6e451c1e559658654a60'],
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

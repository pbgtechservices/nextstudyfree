import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title:
    'Study Free | Get 100% Fee Concesion In Reputed PU Science College Based on Entrance Exam or 10th Result',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="body-light">
      <body className={inter.className}>{children}</body>
    </html>
  )
}


{/* <html lang="en" className="body-light">
      <head>
        <title>
          {title && description
            ? `${title} | ${description}`
            : 'Study| Get 100% Fee Concession In Reputed PU Science College Based on Entrance Exam or 10th Result'}
        </title>
        <link rel="icon" href="./favicon.ico" />

        <meta name="twitter:url" content={canonicalURL} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={thumbnail} />

        <meta property="og:url" content={canonicalURL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={thumbnail} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={title} />
        <meta property="og:image:alt" content={description} />
      </head> */}
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, metadata }) {
  const defaultMetadata = {
    title:
      'Free | Get 100% Fee Concesion In Reputed PU Science College Based on Entrance Exam or 10th Result',
    favicon: '/default-favicon.ico',
    twitter: {
      url: 'default-twitter-url',
      title: 'Default Twitter Title',
      description: 'Default Twitter Description',
      image: '/default-twitter-image.jpg',
    },
    openGraph: {
      url: 'default-openGraph-url',
      title: 'Default OpenGraph Title',
      description: 'Default OpenGraph Description',
      image: '/default-opengraph-image.jpg',
      imageWidth: 1200,
      imageHeight: 630,
      type: 'website',
      siteName: 'Default Site Name',
      imageAlt: 'Default Image Alt',
    },
  }

  const mergedMetadata = { ...defaultMetadata, ...metadata }

  return (
    <html lang="en" className="body-light">
      <head>
        <title>{mergedMetadata.title}</title>
        <link rel="icon" href={mergedMetadata.favicon} />

        <meta name="twitter:url" content={mergedMetadata.twitter.url} />
        <meta name="twitter:title" content={mergedMetadata.twitter.title} />
        <meta
          name="twitter:description"
          content={mergedMetadata.twitter.description}
        />
        <meta name="twitter:image" content={mergedMetadata.twitter.image} />

        <meta property="og:url" content={mergedMetadata.openGraph.url} />
        <meta property="og:title" content={mergedMetadata.openGraph.title} />
        <meta
          property="og:description"
          content={mergedMetadata.openGraph.description}
        />
        <meta property="og:image" content={mergedMetadata.openGraph.image} />
        <meta
          property="og:image:width"
          content={mergedMetadata.openGraph.imageWidth}
        />
        <meta
          property="og:image:height"
          content={mergedMetadata.openGraph.imageHeight}
        />
        <meta property="og:type" content={mergedMetadata.openGraph.type} />
        <meta
          property="og:site_name"
          content={mergedMetadata.openGraph.siteName}
        />
        <meta
          property="og:image:alt"
          content={mergedMetadata.openGraph.imageAlt}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title:
    'PU Science College Based on Entrance Exam or 10th Result',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="body-light">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

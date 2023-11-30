import { Inter } from 'next/font/google'
import './styles/main.scss'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  // title:
  //   'Study Free | Get 100% Fee Concesion In Reputed PU Science College Based on Entrance Exam or 10th Result',
  // favicon: './favicon.ico',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="body-light">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

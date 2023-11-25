import { Inter } from 'next/font/google'
import './styles/main.scss'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="body-light">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import React from 'react'
import { logo } from '../../assets/index'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Footer = (props) => {
  const { locationData, selectedColleges } = props
  const route = usePathname()
  const pathName = route?.path
  const routeName = route?.name
  const navigate = useRouter()

  // usage example:
  const unique = [
    ...new Set(locationData?.map((item) => item.replace(' ', ''))),
  ]

  const hide =
    pathName === '/auth' ||
    routeName === 'College Details' ||
    routeName === 'Admin'
  return (
    <div className="footer-cont" style={hide ? { display: 'none' } : {}}>
      <div className="contact-cont">
        <Image src={logo} alt="" className="img" height="250" width="250" />
        <hr />
        <span className="co-content">
          Swami vivekananda badavane,1st main, 5th cross,near BIET
          college,Davangere - 577004
        </span>
      </div>

      <div className="links-cont">
        <span className="li-header">Top Colleges</span>
        <hr />

        <div className="colleges-list">
          {unique?.map((d) => (
            <span
              className={clsx(
                'li-content',
                selectedColleges?.location === d ? 'active-loc' : '',
              )}
              onClick={() => {
                navigate.push(`/collegesList/1/PUC Science/${d}`)
              }}
            >
              Colleges in {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer

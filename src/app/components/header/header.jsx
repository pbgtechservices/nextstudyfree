import React, { useState, useRef } from 'react'
import { FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { usePathname } from 'next/navigation'
import { FaUser, FaSearch, FaAngleDown } from 'react-icons/fa'
import { logo } from '../../assets/index'
import { callToBackend } from '../../controls/api'
import { HiBuildingLibrary } from 'react-icons/hi2'
import { BiMap } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { AiOutlineClose } from 'react-icons/ai'
import Image from 'next/image'

const Header = (props) => {
  const {
    selectedColleges,
    showSearchCont,
    collegeName,
    location,
    locationData,
  } = props
  const route = usePathname()
  const pathName = route?.path

  const [openCollegesearch, setOpenCollegesSearch] = useState(false)

  const wrapperRef = useRef(null)
  const [collegeData, setCollegeData] = useState()
  const [itemsSearching, setItemSearching] = useState('')

  React.useEffect(() => {
    if (collegeName) {
      setItemSearching(collegeName)
      setOpenCollegesSearch(false)
    } else if (location) {
      setItemSearching(location)
      setOpenCollegesSearch(false)
    } else {
      setItemSearching('')
      setOpenCollegesSearch(false)
    }
  }, [collegeName, location])

  let userInfoLocal
  if (typeof window !== 'undefined') {
    userInfoLocal = localStorage.getItem('userInfo')
  }

  let userInfo = userInfoLocal && JSON.parse(userInfoLocal)

  const isRegisterAccess =
    userInfo?.contactNumber === '9663881439' ||
    userInfo?.contactNumber === '8553322965'

  const navigate = useRouter()

  const unique = [
    ...new Set(locationData?.map((item) => item?.replace(' ', ''))),
  ]

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="header-container"
      fixed="top"
    >
      <div className="d-flex justify-content-between w-100 align-items-center">
        <div>
          <Nav.Link href="/">
            <Image
              src={logo}
              alt=""
              className="logo"
              width="60"
              height="40"
            ></Image>
          </Nav.Link>
        </div>

        {showSearchCont && (
          <div className="search-cont">
            <div className="search-bar-cont bg-light">
              <div className="school-search" ref={wrapperRef}>
                <label className="search-label">Location or College Name</label>
                <div className="d-flex justify-content-between align-items-center">
                  <FormControl
                    type="text"
                    value={itemsSearching}
                    onClick={() => {
                      setOpenCollegesSearch(true)
                    }}
                    placeholder="Please type college name or location"
                    onChange={(ev) => {
                      setItemSearching(ev.target.value)

                      callToBackend(
                        `college/search-college-detail/${ev.target.value}/`,
                        'GET',
                      )
                        .then((d) => {
                          if (Array.isArray(d?.college_list)) {
                            setCollegeData(d?.college_list)
                          } else {
                            setCollegeData([])
                          }
                        })
                        .catch(() => setCollegeData([]))
                    }}
                  />
                </div>

                {openCollegesearch && (
                  <div className="custom-dropdown">
                    <div className="searched-items">
                      <span className="li-header">Top Colleges</span>
                      <hr />

                      {!!itemsSearching.length &&
                      collegeData !== undefined &&
                      collegeData?.length ? (
                        collegeData?.map((d, index) => {
                          return (
                            <div
                              key={index}
                              className="dropdown-items"
                              onClick={() => {
                                navigate.push(
                                  `/colleges/1/PUC Science/${d?.location}/${d?.collegeName}`,
                                )
                                setItemSearching(d?.collegeName)
                                setOpenCollegesSearch(false)
                              }}
                            >
                              <div className="college-details">
                                <span style={{ width: '100%' }}>
                                  <HiBuildingLibrary className="me-2" />
                                  {d.collegeName}
                                </span>
                                <span style={{ width: '100%' }}>
                                  <BiMap className="me-2" />

                                  {d.location}
                                </span>
                              </div>
                            </div>
                          )
                        })
                      ) : (
                        <div>No Records Found, Please enter valid data.</div>
                      )}
                    </div>

                    <div className="links-cont">
                      <span className="li-header">Locations</span>
                      <hr />

                      {unique?.map((d, index) => (
                        <span
                          key={index}
                          className={clsx(
                            'li-content',
                            selectedColleges?.location === d
                              ? 'active-loc'
                              : '',
                          )}
                          onClick={() => {
                            navigate.push(`/colleges/1/PUC Science/${d}`)
                            setItemSearching(d)
                            setOpenCollegesSearch(false)
                          }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {openCollegesearch ? (
                <div
                  className="search-icon"
                  onClick={() => {
                    setOpenCollegesSearch(false)
                    setItemSearching('')
                    setCollegeData([])
                  }}
                >
                  <AiOutlineClose style={{ fontSize: '1.6rem' }} />
                </div>
              ) : (
                <div className="search-icon">
                  <FaSearch style={{ fontSize: '1.6rem' }} />
                </div>
              )}
            </div>
          </div>
        )}

        <Navbar>
          <Nav activeKey={pathName} className="ms-auto">
            {!userInfo && (
              <Nav.Link
                href="/auth"
                className="d-flex align-items-center justify-content-center login-btn"
              >
                <FaUser className="me-3" style={{ fontSize: '1.6rem' }} />
                {'Login'}
              </Nav.Link>
            )}

            {userInfo && (
              <NavDropdown
                title={
                  <div className="user-profile-info">
                    <div className="user-icon-cont me-3">
                      <FaUser className=" icon" />
                    </div>

                    <div className="username">{userInfo?.studentName}</div>
                    <FaAngleDown
                      className="me-3"
                      style={{ fontSize: '1.6rem', marginLeft: '1rem' }}
                    />
                  </div>
                }
                id="basic-nav-dropdown"
              >
                {isRegisterAccess && (
                  <NavDropdown.Item href="/admin/register_college">
                    Settings
                  </NavDropdown.Item>
                )}

                {isRegisterAccess && (
                  <NavDropdown.Item href="/admin/users">Users</NavDropdown.Item>
                )}

                <NavDropdown.Item
                  onClick={() => {
                    localStorage.clear()
                    window.location.reload()
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar>
      </div>
    </Navbar>
  )
}

export default Header

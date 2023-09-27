import { useState, useEffect } from 'react'
import { FaFileDownload } from 'react-icons/fa'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/VA.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { useRouter } from 'next/router'

const LayoutWrapper = ({ children }) => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState({ aero: false, cs: false })

  const handleDownload = () => {
    if (selectedOptions.aero) {
      // Download Aero resume
      window.open('/static/files/Vinamr-Arya-Resume-AERO.pdf', '_blank')
    }
    if (selectedOptions.cs) {
      // Download CS resume
      window.open('/static/files/Vinamr-Arya-Resume-CS.pdf', '_blank')
    }
    setShowModal(false)
  }

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  return (
    <SectionContainer className={`${showModal ? 'blur' : ''}`}>
      <div className="flex flex-col justify-between">
        <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-white py-5 dark:bg-gray-900">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3 flex h-10 w-10 items-center">
                  <div className="cont flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="he" viewBox="0 0 97.5 97.5">
                      <defs>
                        <clipPath id="a">
                          <path d="M0 78h78V0H0v78z" />
                        </clipPath>
                      </defs>
                      <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 97.5)">
                        <g stroke="currentColor" strokeWidth="1.00">
                          <path
                            className="v"
                            d="M23.154 51.435c.845 1.277 2.263 2.04 3.794 2.04 1.85 0 3.5-1.105 4.206-2.816l7.475-18.55c.034-.084.082-.14.208-.14.185.002.42.13.518.373L51.41 62.8c.692 1.75 2.355 2.88 4.233 2.88h.193c1.517 0 2.93-.752 3.776-2.013.848-1.262 1.013-2.855.443-4.262L41.615 14.01c-.438-1.082-1.467-1.785-2.62-1.79h-.01c-1.027 0-1.91.588-2.304 1.53L22.757 47.14c-.596 1.412-.447 3.017.398 4.295M17.61 60.99c0-2.646 2.143-4.79 4.784-4.79 2.643 0 4.784 2.144 4.784 4.79 0 2.645-2.14 4.79-4.784 4.79-2.64 0-4.783-2.145-4.783-4.79"
                            fill="none"
                            strokeWidth=".80033478"
                          />
                        </g>
                      </g>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="she" viewBox="0 0 97.5 97.5">
                      <defs>
                        <clipPath id="a">
                          <path d="M0 78h78V0H0v78z" />
                        </clipPath>
                      </defs>
                      <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 97.5)">
                        <g stroke="currentColor" strokeWidth="1.00">
                          <path
                            className="va"
                            d="M23.154 51.435c.845 1.277 2.263 2.04 3.794 2.04 1.85 0 3.5-1.105 4.206-2.816l7.475-18.55c.034-.084.082-.14.208-.14.185.002.42.13.518.373L51.41 62.8c.692 1.75 2.355 2.88 4.233 2.88h.193c1.517 0 2.93-.752 3.776-2.013.848-1.262 1.013-2.855.443-4.262L41.615 14.01c-.438-1.082-1.467-1.785-2.62-1.79h-.01c-1.027 0-1.91.588-2.304 1.53L22.757 47.14c-.596 1.412-.447 3.017.398 4.295M17.61 60.99c0-2.646 2.143-4.79 4.784-4.79 2.643 0 4.784 2.144 4.784 4.79 0 2.645-2.14 4.79-4.784 4.79-2.64 0-4.783-2.145-4.783-4.79"
                            fill="none"
                            strokeWidth=".80033478"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden text-2xl font-semibold sm:block md:text-3xl">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`p-1 font-bold text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400 lg:p-4 lg:text-lg ${
                    router.pathname === link.href ? 'text-primary-500 dark:text-primary-500 ' : ''
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div>
              <button
                onClick={() => setShowModal(true)}
                className="ml-2 flex items-center rounded-full border border-primary-500 px-3 py-0.5 text-primary-500 hover:border-primary-500 hover:bg-primary-500 hover:text-white dark:border-teal-500 dark:text-primary-500 dark:hover:text-gray-900 lg:text-lg"
              >
                <FaFileDownload className="mr-1" />
                Resume
              </button>

              {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70">
                  <div className="rounded-xl border bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
                    <h2 className="mx-2 text-center text-lg font-bold">
                      Please Select Resume Type
                    </h2>
                    <div className="mx-2 my-4 flex flex-col space-y-3">
                      {/* Aerospace Engineering */}
                      <div
                        className="flex w-full items-center"
                        onClick={() =>
                          setSelectedOptions({ ...selectedOptions, aero: !selectedOptions.aero })
                        }
                      >
                        <span className="cursor-pointer">
                          <svg
                            className={`h-6 w-6 text-${selectedOptions.aero ? 'teal' : 'gray'}-500`}
                          >
                            {selectedOptions.aero ? (
                              <circle cx="12" cy="12" r="10" fill="currentColor" />
                            ) : (
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            )}
                          </svg>
                        </span>
                        <label htmlFor="aero" className="ml-6">
                          Aerospace Engineering
                        </label>
                      </div>
                      {/* Computer Science */}
                      <div
                        className="flex items-center"
                        onClick={() =>
                          setSelectedOptions({ ...selectedOptions, cs: !selectedOptions.cs })
                        }
                      >
                        <span className="cursor-pointer">
                          <svg
                            className={`h-6 w-6 text-${selectedOptions.cs ? 'teal' : 'gray'}-500`}
                          >
                            {selectedOptions.cs ? (
                              <circle cx="12" cy="12" r="10" fill="currentColor" />
                            ) : (
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            )}
                          </svg>
                        </span>
                        <label htmlFor="cs" className="ml-6">
                          Computer Science
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-row justify-center">
                      <button
                        disabled={!selectedOptions.aero && !selectedOptions.cs}
                        onClick={handleDownload}
                        className="mx-1 w-1/2 rounded-lg bg-teal-400 py-2 text-white dark:bg-teal-500"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="mx-1 w-1/2 rounded-lg bg-gray-200 py-2 text-red-500 dark:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper

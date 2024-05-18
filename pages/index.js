import { MDXLayoutRenderer } from '@/components/MDXComponents'
import ContactForm from '@/components/Contact'
import { getFileBySlug } from '@/lib/mdx'
import projectsData from '@/data/projectsData'
import workData from '@/data/workData'
import ReactCardFlip from 'react-card-flip'
import { motion, useSpring } from 'framer-motion'
import siteMetadata from '@/data/siteMetadata'
import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import certData from '@/data/certData'
import eduData from '@/data/eduData'
import hobbyData from '@/data/hobbyData'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import FeaturedProject from '@/components/FeaturedProject'
import Image from 'next/image'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const authorDetails = await getFileBySlug('authors', ['default'])
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails
  const [selected, setSelected] = useState(0)
  const [indicatorPos, setIndicatorPos] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const tabsRef = useRef([])
  const sliderRef = useRef()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [flipped, setFlipped] = useState([false, false, false])
  const [currentHobbySlide, setCurrentHobbySlide] = useState([0, 0, 0])
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState([0, 0, 0])
  const [showSplash, setShowSplash] = useState(true)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const fadeOut = setTimeout(() => {
      setOpacity(0)
    }, 2500) // Start fading out after 2.5 seconds

    const removeSplash = setTimeout(() => {
      setShowSplash(false)
    }, 3000) // Completely remove after 3.5 seconds

    return () => {
      clearTimeout(fadeOut)
      clearTimeout(removeSplash)
    }
  }, [])

  const cardRefs = useRef([])
  const sliderRefs = useRef([])

  const handleClick = (index) => {
    const newFlipped = [false, false, false]
    newFlipped[index] = true
    setFlipped(newFlipped)
  }

  const handleClickOutside = (event) => {
    if (!cardRefs.current.some((ref) => ref.contains(event.target))) {
      setFlipped([false, false, false])
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const selectedTab = tabsRef.current[selected]
    if (selectedTab) {
      const vw = typeof window !== 'undefined' ? window.innerWidth : 0
      if (vw >= 640) {
        setIndicatorPos({
          top: selectedTab.offsetTop,
          right: 3 * selectedTab.offsetWidth, // adjust the right position
          width: 3,
          height: selectedTab.offsetHeight,
        })
      }
    }
  }, [selected])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHobbySlide((prevSlide) => {
        return prevSlide.map((slide, index) => {
          if (flipped[index]) {
            const imageArrayLength = hobbyData[index].img.length // Get the length of the images array for the current card
            const nextSlide = (slide + 1) % imageArrayLength // Use the length for the modulo operation
            sliderRefs.current[index].slickGoTo(nextSlide)
            return nextSlide
          }
          return slide
        })
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [flipped, hobbyData]) // Added hobbyData as a dependency

  const hobbyCards = [
    {
      title: 'FPV',
      img: ['/path/to/fpv-image1.jpg', '/path/to/fpv-image2.jpg', '/path/to/fpv-image3.jpg'],
    },
    {
      title: 'violin',
      img: ['/path/to/fpv-image1.jpg', '/path/to/fpv-image2.jpg', '/path/to/fpv-image3.jpg'],
    },
    {
      title: 'Sketching',
      img: ['/path/to/fpv-image1.jpg', '/path/to/fpv-image2.jpg', '/path/to/fpv-image3.jpg'],
    },
    // ... other cards
  ]
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current, index) =>
      setCurrentCaptionIndex((prev) => {
        const newIndices = [...prev]
        newIndices[index] = current
        return newIndices
      }),
    beforeChange: (current, next) =>
      setCurrentHobbySlide((prev) => prev.map((slide, index) => (flipped[index] ? next : slide))),
  }

  return (
    <>
      {showSplash && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-white transition-opacity duration-500 dark:bg-gray-900 ${
            showSplash ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            zIndex: 9999,
            opacity: opacity,
          }}
        >
          <div className="mr-3 flex h-1/4 w-1/4 items-center sm:h-1/6 sm:w-1/6">
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
        </div>
      )}
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
      <div className="mx-auto divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex flex-row justify-between space-y-2 py-8 md:space-y-5">
          <h1 className="project-header project-animated py-2 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Featured Projects
          </h1>
          <div className="hidden sm:flex">
            <Link href="/project">
              <button className=" biliboard electronic bg-white px-4 py-3 text-center font-bold text-primary-500 hover:bg-primary-500 hover:text-white dark:bg-gray-900 dark:hover:bg-primary-500 dark:hover:text-gray-900">
                View All Projects
              </button>
            </Link>
          </div>

          {/*<p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
  </p>*/}
        </div>
        <div className="py-12">
          <Slider
            ref={sliderRef}
            dots={false}
            infinite={true}
            autoplay={true}
            autoplaySpeed={4000}
            speed={500}
            slidesToShow={1}
            arrows={false}
            beforeChange={(oldIndex, newIndex) => setCurrentSlide(newIndex)}
          >
            {projectsData.map((d) => (
              <FeaturedProject
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </Slider>
          <div
            className="relative mx-auto my-4 h-2 w-3/4 cursor-pointer overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 sm:my-6 sm:w-1/2"
            onClick={(e) => {
              const rect = e.target.getBoundingClientRect()
              const x = e.clientX - rect.left
              const clickedSlide = Math.floor((x / rect.width) * projectsData.length)
              sliderRef.current.slickGoTo(clickedSlide)
            }}
          >
            <motion.div
              className="h-2 rounded-full bg-teal-500"
              initial={{ width: '0%' }}
              animate={{
                width: `${((currentSlide + 1) / projectsData.length) * 100}%`,
              }}
              transition={{
                duration: 0.5, // Adjust the duration as needed
                ease: 'linear', // Linear easing for a smooth transition
              }}
            />
          </div>
          <div className="flex justify-center py-4 sm:hidden">
            <button className="biliboard electronic bg-white px-4 py-3 text-center font-bold text-primary-500 hover:bg-primary-500 hover:text-gray-900 dark:bg-gray-900 dark:hover:bg-primary-500">
              View All Projects
            </button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 py-8 md:space-y-5">
          <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Work Experience
          </h2>
        </div>
        <div className=" w-full py-12">
          <Tab.Group defaultIndex={0}>
            <div className="relative flex flex-col sm:flex-row">
              <Tab.List className="flex flex-row overflow-x-auto  border-gray-500 dark:border-gray-700 sm:w-1/4 sm:flex-col sm:items-stretch sm:overflow-visible">
                {workData.map((project, index) => (
                  <Tab
                    as={Fragment}
                    key={index}
                    ref={(el) => (tabsRef.current[index] = el)}
                    onClick={() => setSelected(index)}
                    className={
                      'mb-4 whitespace-nowrap border-b-2 py-2 text-center  sm:mb-0 sm:border-r-2'
                    }
                  >
                    {({ selected }) => (
                      <div
                        id={`tab-${index}`}
                        className={`flex cursor-pointer items-center justify-center px-3 text-center 
                        hover:bg-gray-100 hover:text-teal-500 focus:outline-none dark:hover:bg-gray-700 sm:border-b-0 sm:p-4 ${
                          selected
                            ? 'border-teal-500 bg-gray-100 text-teal-500 dark:bg-gray-700 sm:border-gray-100 sm:dark:border-gray-700'
                            : 'dark:border-gray-700'
                        }`}
                      >
                        {project.title}
                      </div>
                    )}
                  </Tab>
                ))}

                <motion.div
                  className="absolute  bg-teal-500"
                  animate={{
                    right: indicatorPos.right, // change x to right
                    y: indicatorPos.top,
                    width: indicatorPos.width,
                    height: indicatorPos.height,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </Tab.List>
              <Tab.Panels className="w-full sm:w-3/4 sm:px-8">
                {workData.map((project, index) => (
                  <Tab.Panel key={index}>
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }} // start hidden
                      animate={{ opacity: 1 }} // animate in
                      exit={{ opacity: 0 }} // animate out
                      transition={{ duration: 1 }} // animation duration
                    >
                      <div className="flex flex-col pb-3 sm:flex-row sm:items-center">
                        <div className="relative mb-2 p-24 sm:mb-0 sm:mr-4 sm:w-1/3">
                          <Image
                            alt={project.title}
                            layout="fill"
                            objectFit="contain"
                            src={project.imgSrc}
                            className="h-full w-full object-cover object-center"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col sm:w-2/3">
                          <h2 className="py-1 text-xl font-bold leading-7 tracking-tight">
                            {project.companyName}
                          </h2>
                          <h1>{project.jobPosition}</h1>
                          <h1>
                            {project.startDate}
                            <span> - </span>
                            <span>{project.endDate}</span>
                          </h1>
                        </div>
                      </div>
                      <ul className="list-outside list-disc pl-5 text-gray-500 dark:text-gray-400">
                        {project.description.map((item, index) => (
                          <li className="py-1" key={index}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>
      </div>
      <div>
        <div className="mt-6 grid grid-cols-1 divide-gray-200 dark:divide-gray-700 md:grid-cols-2 md:divide-x">
          {/* Education Section */}
          <div className="mb-20 divide-y divide-gray-200 pb-24 dark:divide-gray-700 md:mb-6">
            <div className="space-y-2 py-8 md:space-y-5">
              <h1 className="text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                Education
              </h1>
            </div>
            {eduData.map((project, index) => (
              <div key={index} className="flex h-1/4 flex-row items-center md:p-4">
                <div className="relative flex w-1/4  items-center justify-center p-10">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    alt={project.title}
                    src={project.imgSrc}
                    className="ml-4 h-full w-full object-contain p-1 md:p-3"
                  />
                </div>
                <div className="flex w-3/4 flex-col justify-center p-1 text-center">
                  <h3 className="text-md font-semibold md:text-lg md:text-xl">{project.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{project.subTitle}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Certifications Section */}
          <div className="mb-6 divide-y divide-gray-200 pb-24 pb-4 dark:divide-gray-700">
            <div className="space-y-2 py-8 md:space-y-5">
              <h1 className="text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                Certifications
              </h1>
            </div>
            {certData.map((project, index) => (
              <div key={index} className="flex h-1/4 flex-row items-center md:p-4 ">
                <div className="relative flex w-1/4 items-center  justify-center p-10">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    alt={project.title}
                    src={project.imgSrc}
                    className="ml-4 h-full w-full object-contain p-1 md:p-3"
                    loading="lazy"
                  />
                </div>
                <div className="flex w-3/4  flex-col justify-center p-1 text-center">
                  <h3 className="text-lg font-semibold md:text-xl">{project.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{project.subTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700 md:mt-12">
        <div className="space-y-2 py-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Hobbies
          </h1>
        </div>
        <div className="flex flex-row flex-wrap justify-between py-12 sm:py-4">
          {hobbyData.map((card, index) => (
            <div
              key={index}
              className="mb-4 w-full  sm:mb-0  sm:px-3 sm:py-6 md:w-1/3 lg:w-1/4 lg:px-0"
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => handleClick(index)}
            >
              <ReactCardFlip isFlipped={flipped[index]} flipDirection="horizontal">
                {/* Front of the card */}
                <div className="rounded-md border-2 border-gray-200 border-opacity-60 pb-2 dark:border-gray-700 ">
                  <div className="relative h-48 w-full rounded-t-lg">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={card.imgSrc}
                      alt={card.title}
                      className="h-48 w-full rounded-t-lg object-cover"
                      loading="lazy"
                    />
                  </div>

                  <h2 className="mx-4 mt-2 text-xl font-bold leading-7 tracking-tight">
                    {card.title}
                  </h2>
                  <div className="px-4 py-2">
                    <p className="text-gray-500 dark:text-gray-400">
                      {card.description}
                      <span className="pl-2 leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        {' '}
                        Gallery &rarr;
                      </span>
                    </p>
                  </div>
                </div>

                {/* Back of the card */}
                <div
                  className="rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700"
                  style={{ visibility: flipped[index] ? 'visible' : 'hidden' }}
                >
                  <Slider
                    ref={(slider) => (sliderRefs.current[index] = slider)}
                    {...settings}
                    arrows={false}
                  >
                    {card.img.map((img, i) => (
                      <div key={i}>
                        <div
                          className={`relative rounded-t-md ${
                            card.title === 'FPV' ? 'object-fit p-24' : 'object-contain py-56'
                          }`}
                        >
                          <Image
                            layout="fill"
                            objectFit={`${card.title === 'FPV' ? 'cover' : 'cover'}`}
                            src={img}
                            alt={`Back ${i}`}
                            loading="lazy"
                          />
                        </div>

                        <div className="p-4">
                          <p className="text-center text-teal-500 dark:text-teal-400">
                            {card.captions[i]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </ReactCardFlip>
            </div>
          ))}
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 py-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Contact
          </h1>
        </div>
        <div
          id="contact-form"
          className="flex flex-wrap justify-center divide-gray-200 dark:divide-gray-700 sm:divide-x "
        >
          <div className="mt-8 w-full px-6 sm:w-2/3">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}

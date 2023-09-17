import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import projectsData from '@/data/projectsData'
import workData from '@/data/workData'
import { motion, useSpring } from 'framer-motion'
import Card from '@/components/Card'
import Image from '@/components/Image'
import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import { useEffect, useState, useRef } from 'react'
import certData from '@/data/certData'
import hobbyData from '@/data/hobbyData'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import FeaturedProject from '@/components/FeaturedProject'

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

  return (
    <>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
      <div className="mx-auto divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-6 pt-4 md:space-y-5">
          <h1 className="project-header project-animated py-2 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Featured Projects
          </h1>
          {/*<p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
  </p>*/}
        </div>
        <div className="py-8 sm:py-12">
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
              style={{
                width: useSpring(`${((currentSlide + 1) / projectsData.length) * 100}%`, {
                  stiffness: 0.5,
                  damping: 0.2,
                  mass: 0.1,
                  restSpeed: 0.1,
                  restDelta: 0.01,
                }),
              }}
              initial={{ width: '0%' }}
              animate={{
                width: `${((currentSlide + 1) / projectsData.length) * 100}%`,
              }}
              transition={{
                duration: 0.2, // This is now faster than before
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            />
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
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
                        <div className="mb-2 sm:mb-0 sm:mr-4 sm:w-1/3">
                          <Image
                            alt={project.title}
                            src={project.imgSrc}
                            className="w-full object-cover object-center"
                            layout="responsive"
                            width={100}
                            height={100 * (306 / 544)} // maintaining the aspect ratio
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
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Certifications
          </h1>
        </div>
        <div className="flex flex-row justify-between py-2 sm:py-4">
          {certData.map((project, index) => (
            <div key={index} className="mb-2 w-full p-4 sm:mb-0 sm:mr-4 sm:w-1/5">
              <Image
                alt={project.title}
                src={project.imgSrc}
                className="object-fit w-full object-center"
                layout="responsive"
                width={110}
                height={100} // maintaining the aspect ratio
              />
            </div>
          ))}
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Hobbies
          </h1>
        </div>
        <div className="flex flex-row flex-wrap justify-between py-2 sm:py-4">
          {hobbyData.map((project, index) => (
            <div key={index} className="mb-2 w-full py-2 sm:mb-0 sm:mr-4 sm:w-1/4 sm:py-6">
              <Image
                alt={project.title}
                src={project.imgSrc}
                className="object-fit w-full object-center"
                layout="responsive"
                width={100}
                height={100 * (306 / 544)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

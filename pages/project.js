import React, { useState, useEffect, useRef } from 'react'
import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import { motion, AnimatePresence } from 'framer-motion'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'

const colors = ['FF6B6B', 'FFD93D', '6BCB77', '4D96FF']
const Card = ({ title, description, imgSrc, href, skills, date }) => (
  <div className="flex min-w-full flex-col p-2">
    <div
      className={`grid-rows-card grid ${
        imgSrc && 'h-full'
      } overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      style={{ gridTemplateRows: 'auto 1fr auto' }} // 1fr allocates remaining space to the middle row
    >
      {/* Image Section */}
      {imgSrc && (
        <div className="pl-2 pr-2 pt-2">
          <Image
            alt={title}
            src={imgSrc}
            className="block max-w-full object-cover object-center md:h-24 lg:h-32"
            layout="responsive"
            width={100}
            height={100 * (306 / 544)}
          />
        </div>
      )}

      {/* Text Section */}
      <div className="overflow-hidden p-2">
        <h2 className="mb-3 text-xl font-bold leading-7 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-1 max-w-none overflow-hidden overflow-ellipsis text-gray-500 dark:text-gray-400">
          {description}
        </p>
        {href && (
          <Link
            href={href}
            className="mb-3 text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>

      {/* Skills Pills and Learn More */}
      <div className="px-2">
        <div className="mb-3 flex flex-wrap">
          {skills.slice(0, Math.min(7, skills.length)).map((skill, index) => (
            <span
              key={index}
              className={`my-1 mr-2 rounded-full px-2 py-0.5 text-white`}
              style={{ backgroundColor: `#${colors[index % colors.length]}` }} // Dynamic background color
            >
              {skill}
            </span>
          ))}
          {skills.length > 7 && (
            <span className="my-1 mr-2 pt-1 font-semibold text-teal-500">
              + {skills.length - 7} <span className="font-bold">more</span>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default function Projects() {
  const [filteredSkills, setFilteredSkills] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [filterByField, setFilterByField] = useState(null)
  const [isOpenSkills, setIsOpenSkills] = useState(false)
  const [isOpenSort, setIsOpenSort] = useState(false)
  const [isOpenField, setIsOpenField] = useState(false)

  // Extract unique skills from projectsData
  const uniqueSkills = projectsData.reduce((acc, project) => {
    project.skills.forEach((skill) => {
      if (!acc.includes(skill)) {
        acc.push(skill)
      }
    })
    return acc
  }, [])

  const handleFilter = (skill) => {
    setFilteredSkills((prevSkills) =>
      prevSkills.includes(skill) ? prevSkills.filter((s) => s !== skill) : [...prevSkills, skill]
    )
  }

  const filteredProjects = projectsData
    .filter((project) =>
      filteredSkills.length === 0
        ? true
        : filteredSkills.every((skill) => project.skills.includes(skill))
    )
    .filter((project) => (filterByField ? project.field === filterByField : true))
    .sort((a, b) => {
      if (sortBy === 'new') return new Date(b.date) - new Date(a.date)
      if (sortBy === 'old') return new Date(a.date) - new Date(b.date)
      return 0
    })
  // Animate dropdown
  const variants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0 },
  }
  const skillsRef = useRef(null)
  const sortRef = useRef(null)
  const fieldRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        skillsRef.current &&
        !skillsRef.current.contains(event.target) &&
        sortRef.current &&
        !sortRef.current.contains(event.target) &&
        fieldRef.current &&
        !fieldRef.current.contains(event.target)
      ) {
        setIsOpenSkills(false)
        setIsOpenSort(false)
        setIsOpenField(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>

          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            {/* Skills Dropdown */}
            <div
              className="relative w-full rounded border p-2 dark:border-gray-400 dark:bg-gray-800 md:w-1/3"
              ref={skillsRef}
              onClick={() => setIsOpenSkills(!isOpenSkills)}
            >
              <div className="text-center">
                <span className="text-black dark:text-white">Skills: </span>
                <span className={filteredSkills.length > 0 ? 'text-teal-500' : 'text-gray-400'}>
                  {filteredSkills.length > 0 ? `(${filteredSkills.length})` : 'Filter Skills'}
                </span>
              </div>
              <AnimatePresence>
                {isOpenSkills && (
                  <motion.div className="absolute left-1/2 z-10 mt-2 w-full -translate-x-1/2 transform rounded border border-gray-300 bg-white dark:border-gray-400 dark:bg-gray-800">
                    <div className="flex flex-col">
                      {uniqueSkills.map((skill, index) => (
                        <button
                          key={index}
                          onClick={() => handleFilter(skill)}
                          className={`py-2 text-center ${
                            filteredSkills.includes(skill)
                              ? 'bg-gray-100 text-teal-500 dark:bg-gray-700'
                              : ''
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sort Dropdown */}
            <div
              className="relative w-full rounded border p-2 dark:border-gray-400 dark:bg-gray-800 md:w-1/3"
              ref={sortRef}
              onClick={() => setIsOpenSort(!isOpenSort)}
            >
              <div className="text-center">
                <span className="text-black dark:text-white">Sort: </span>
                <span className={sortBy ? 'text-teal-500' : 'text-gray-400'}>
                  {sortBy ? (sortBy === 'new' ? 'New First' : 'Old First') : 'By Date'}
                </span>
              </div>
              <AnimatePresence>
                {isOpenSort && (
                  <motion.div className="absolute left-1/2 z-10 mt-2 w-full -translate-x-1/2 transform rounded border border-gray-300 bg-white dark:border-gray-400 dark:bg-gray-800">
                    <div className="flex flex-col">
                      <button
                        className={
                          sortBy === 'new'
                            ? 'bg-gray-100 py-2 text-center text-teal-500 dark:bg-gray-700'
                            : 'py-2 text-center'
                        }
                        onClick={() => setSortBy(sortBy === 'new' ? null : 'new')}
                      >
                        New First
                      </button>
                      <button
                        className={
                          sortBy === 'old'
                            ? 'bg-gray-100 py-2 text-center text-teal-500 dark:bg-gray-700'
                            : 'py-2 text-center'
                        }
                        onClick={() => setSortBy(sortBy === 'old' ? null : 'old')}
                      >
                        Old First
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Field Dropdown */}
            <div
              className="relative w-full rounded border p-2 dark:border-gray-400 dark:bg-gray-800 md:w-1/3"
              ref={fieldRef}
              onClick={() => setIsOpenField(!isOpenField)}
            >
              <div className="text-center">
                <span className="text-black dark:text-white">Field:</span>
                <span className={filterByField ? 'text-teal-500' : 'text-gray-400'}>
                  {filterByField
                    ? filterByField === 'aero'
                      ? '  Aerospace'
                      : '  Computer Science'
                    : '  Filter by Field'}
                </span>
              </div>
              <AnimatePresence>
                {isOpenField && (
                  <motion.div className="z-9 absolute left-1/2 mt-2 w-full -translate-x-1/2 transform rounded border border-gray-300 bg-white dark:border-gray-400 dark:bg-gray-800">
                    <div className="flex flex-col">
                      <button
                        className={
                          filterByField === 'aero'
                            ? 'bg-gray-100 py-2 text-center text-teal-500 dark:bg-gray-700'
                            : 'py-2 text-center'
                        }
                        onClick={() => setFilterByField(filterByField === 'aero' ? null : 'aero')}
                      >
                        Aerospace
                      </button>
                      <button
                        className={
                          filterByField === 'cs'
                            ? 'bg-gray-100 py-2 text-center text-teal-500 dark:bg-gray-700'
                            : 'py-2 text-center'
                        }
                        onClick={() => setFilterByField(filterByField === 'cs' ? null : 'cs')}
                      >
                        Computer Science
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mx-auto flex justify-center py-12">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:w-auto lg:grid-cols-3">
            {filteredProjects.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                skills={d.skills}
                date={d.date}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

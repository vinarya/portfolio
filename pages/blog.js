import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { getAllTags } from '@/lib/tags'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { useState, useEffect } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import { motion } from 'framer-motion'
import kebabCase from '@/lib/utils/kebabCase'
import Image from 'next/image'
export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const tags = await getAllTags('blog')
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  return { props: { initialDisplayPosts, posts, totalPages, tags, sortedTags } }
}

export default function Blog({
  posts,
  initialDisplayPosts,
  totalPages: initialTotalPages,
  tags,
  sortedTags,
}) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const [filteredPageCount, setFilteredPageCount] = useState(initialTotalPages) // Added this line
  const [title, setTitle] = useState('All Posts')
  const [currentPage, setCurrentPage] = useState(1)
  const [displayPosts, setDisplayPosts] = useState(initialDisplayPosts)
  const [prevSearchValue, setPrevSearchValue] = useState('')
  const [prevSelectedTag, setPrevSelectedTag] = useState(null)
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  }

  useEffect(() => {
    const filtered = posts.filter((frontMatter) => {
      const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
      const matchesSearch = searchContent.toLowerCase().includes(searchValue.toLowerCase())
      const matchesTag = selectedTag ? frontMatter.tags.includes(selectedTag) : true
      return matchesSearch && matchesTag
    })

    setFilteredPosts(filtered)

    const newTotalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
    setFilteredPageCount(newTotalPages)

    if (searchValue !== prevSearchValue || selectedTag !== prevSelectedTag) {
      setCurrentPage(1)
      setDisplayPosts(filtered.slice(0, POSTS_PER_PAGE))
    } else {
      const newDisplayPosts = filtered.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
      )
      setDisplayPosts(newDisplayPosts)
    }

    setPrevSearchValue(searchValue)
    setPrevSelectedTag(selectedTag)
  }, [searchValue, selectedTag, currentPage])

  const goToPreviousPage = () => setCurrentPage((prev) => prev - 1)
  const goToNextPage = () => setCurrentPage((prev) => prev + 1)

  // the rest of your component

  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => {
                setSearchValue(e.target.value)
                setCurrentPage(1) // Resetting the current page to 1 when a new search is made
              }}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />

            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center divide-gray-400 py-2 sm:flex-row sm:divide-x">
            <div className="text-left sm:text-center">
              <span className="mr-2 font-bold uppercase">Tags</span>
              <div className="w-11 border-b border-gray-400 sm:w-auto sm:border-b-0"></div>
            </div>
            <div className="mt-2 flex flex-wrap px-2 sm:mt-0">
              {sortedTags.map((tag) => (
                <div className="mr-3" key={tag}>
                  <button
                    onClick={() => {
                      setSelectedTag(selectedTag !== tag ? tag : null)
                      setTitle(selectedTag !== tag ? `${tag}` : 'All Posts')
                      setCurrentPage(1) // Resetting the current page to 1 when a tag is clicked
                    }}
                    className={`text-sm font-medium uppercase ${
                      selectedTag === tag
                        ? 'text-orange-500 dark:text-orange-400'
                        : 'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    {tag}
                  </button>
                  <span className="-ml text-sm font-semibold uppercase text-gray-600 dark:text-gray-300">{` (${tags[tag]})`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*<ul className="space-y-4" variants={listVariants} initial="hidden" animate="visible">*/}
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="space-y-4"
        >
          {!displayPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags, image } = frontMatter
            return (
              <motion.li key={slug} variants={itemVariants} className="py-6">
                <article className="space-y-2 xl:grid xl:grid-cols-6 xl:items-center xl:space-y-2">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-4 xl:pr-2">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag
                            key={tag}
                            text={tag}
                            onClick={() => {
                              setSelectedTag(selectedTag !== tag ? tag : null)
                              setTitle(selectedTag !== tag ? `${tag}` : 'All Posts')
                              setCurrentPage(1) // Resetting the current page to 1 when a tag is clicked
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {summary}
                    </div>
                  </div>
                  <div className="relative h-full w-full p-36 pt-2 md:p-64 xl:col-start-6 xl:p-0 xl:pt-2">
                    <Image
                      alt={title}
                      src={image}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </article>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
      {filteredPageCount > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={filteredPageCount}
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
        />
      )}
    </>
  )
}

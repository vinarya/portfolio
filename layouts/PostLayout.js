import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Image from 'next/image'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, fileName, date, title, image, tags, type } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-6 xl:gap-x-7 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className="pb-8 pt-6 xl:sticky xl:top-0 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li
                      className=" flex flex-col items-center space-x-2 xl:flex-row xl:pb-9"
                      key={author.name}
                    >
                      {author.avatar && (
                        <div className="relative p-6">
                          <Image
                            layout="fill"
                            alt="avatar"
                            objectFit="contain"
                            src={author.avatar}
                            className="w-1/6 rounded-full lg:w-1/5"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.twitter.replace('https://twitter.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                  <li className="hidden py-4 text-sm font-medium xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div className="flex flex-col items-center">
                        <Link href={`/${type.toLowerCase()}/${prev.slug}`}>
                          <h2 className="text-center text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {`Previous ${type === 'project' ? 'Project' : 'Article'}`}
                          </h2>
                          <div className="relative py-16 pt-2">
                            <Image
                              alt={prev.title}
                              src={prev.image}
                              objectFit="contain"
                              layout="fill"
                              className="h-full w-full rounded-md object-cover object-center"
                              loading="lazy"
                            />
                          </div>
                          <div className="text-center text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            {prev.title}
                          </div>
                        </Link>
                      </div>
                    )}
                  </li>
                  <li className="hidden xl:block">
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${type.toLowerCase()}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        &larr; {`Back to ${type === 'project' ? 'Projects' : 'Blogs'}`}
                      </Link>
                    </div>
                  </li>
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-4 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-dark">{children}</div>
              {/*<div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(slug)} rel="nofollow">
                  {'Discuss on Twitter'}
                </Link>
                {` • `}
                <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
              </div>*/}
              <Comments frontMatter={frontMatter} />
            </div>
            <footer className="xl:sticky xl:top-0">
              <div className=" text-sm font-medium leading-5 xl:col-start-1  xl:row-start-2 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
                {(next || prev) && (
                  <div className="flex justify-between py-4 text-center xl:block xl:space-y-8 xl:pb-8 xl:pt-96">
                    {prev && (
                      <div className="flex flex-col items-center sm:block xl:hidden">
                        <Link href={`/${type.toLowerCase()}/${prev.slug}`}>
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {`Previous ${type === 'project' ? 'Project' : 'Article'}`}
                          </h2>
                          <div className="relative p-16 pt-2">
                            <Image
                              alt={prev.title}
                              layout="fill"
                              objectFit="contain"
                              src={prev.image}
                              className="h-full w-full rounded-md object-cover object-center"
                              loading="lazy"
                            />
                          </div>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            {prev.title}
                          </div>
                        </Link>
                      </div>
                    )}
                    {next && (
                      <div className="flex flex-col items-center text-center">
                        <Link href={`/${type.toLowerCase()}/${next.slug}`}>
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {`Next ${type === 'project' ? 'Project' : 'Article'}`}
                          </h2>
                          <div className="relative p-16 pt-2">
                            <Image
                              alt={next.title}
                              src={next.image}
                              layout="fill"
                              objectFit="contain"
                              className="h-full w-full rounded-md object-cover object-center"
                              loading="lazy"
                            />
                          </div>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            {next.title}
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                {tags && (
                  <div className="py-4 xl:pt-11">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap xl:pb-6">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-4 sm:block xl:hidden xl:pt-8">
                <Link
                  href={`/${type.toLowerCase()}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; {`Back to ${type === 'project' ? 'Projects' : 'Blogs'}`}
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

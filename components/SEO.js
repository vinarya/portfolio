import Head from 'next/head'
import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'

const CommonSEO = ({
  title,
  description,
  ogType = 'website',
  ogImage,
  twImage,
  canonicalUrl,
  noindex = false,
}) => {
  const router = useRouter()

  const fullTitle = title ? `${title} | ${siteMetadata.title}` : siteMetadata.title

  const url = canonicalUrl || `${siteMetadata.siteUrl}${router.asPath}`

  // Normalize ogImage to an array of absolute URLs
  const ogImages = Array.isArray(ogImage) ? ogImage : [ogImage]
  const ogImageUrls = ogImages
    .filter(Boolean)
    .map((img) =>
      typeof img === 'string'
        ? img.startsWith('http')
          ? img
          : `${siteMetadata.siteUrl}${img}`
        : img.url.startsWith('http')
        ? img.url
        : `${siteMetadata.siteUrl}${img.url}`
    )

  const twitterImageUrl =
    twImage && twImage.startsWith('http')
      ? twImage
      : twImage
      ? `${siteMetadata.siteUrl}${twImage}`
      : ogImageUrls[0]

  return (
    <Head>
      <title>{fullTitle}</title>

      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      {description && <meta name="description" content={description} />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      {siteMetadata.locale && <meta property="og:locale" content={siteMetadata.locale} />}
      {ogImageUrls.map((imgUrl) => (
        <meta property="og:image" content={imgUrl} key={imgUrl} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {siteMetadata.twitter && <meta name="twitter:site" content={siteMetadata.twitter} />}
      {siteMetadata.twitter && <meta name="twitter:creator" content={siteMetadata.twitter} />}
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {twitterImageUrl && <meta name="twitter:image" content={twitterImageUrl} />}

      {/* General metadata */}
      {siteMetadata.author && <meta name="author" content={siteMetadata.author} />}

      <link rel="canonical" href={url} />
    </Head>
  )
}

export const PageSEO = ({ title, description, canonicalUrl, noindex }) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const twImageUrl = ogImageUrl

  // Optional basic WebPage schema
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title || siteMetadata.title,
    description,
    url: canonicalUrl || siteMetadata.siteUrl,
  }

  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        twImage={twImageUrl}
        canonicalUrl={canonicalUrl}
        noindex={noindex}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
    </>
  )
}

export const TagSEO = ({ title, description }) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const twImageUrl = ogImageUrl
  const router = useRouter()
  const url = `${siteMetadata.siteUrl}${router.asPath}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url,
  }

  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        twImage={twImageUrl}
        canonicalUrl={url}
      />
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${description} - RSS feed`}
          href={`${url}/feed.xml`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
    </>
  )
}

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
  canonicalUrl,
}) => {
  const router = useRouter()
  const pageUrl = url || `${siteMetadata.siteUrl}${router.asPath}`

  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()

  let imagesArr =
    images.length === 0
      ? [siteMetadata.socialBanner]
      : typeof images === 'string'
      ? [images]
      : images

  const featuredImages = imagesArr.map((img) => ({
    '@type': 'ImageObject',
    url: img.includes('http') ? img : siteMetadata.siteUrl + img,
  }))

  const authorList = authorDetails
    ? authorDetails.map((author) => ({
        '@type': 'Person',
        name: author.name,
      }))
    : {
        '@type': 'Person',
        name: siteMetadata.author,
      }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    description: summary,
  }

  const twImageUrl = featuredImages[0].url

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType="article"
        ogImage={featuredImages}
        twImage={twImageUrl}
        canonicalUrl={canonicalUrl || pageUrl}
      />
      <Head>
        {date && <meta property="article:published_time" content={publishedAt} />}
        {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
    </>
  )
}

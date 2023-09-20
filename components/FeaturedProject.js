import Link from './Link'

const FeaturedProject = ({ title, description, imgSrc, href }) => (
  <div className="md flex h-full justify-center p-2 md:w-full" style={{ minWidth: '50%' }}>
    <div
      className={`${
        imgSrc && 'h-full'
      } flex flex-col  items-center overflow-hidden rounded-xl p-3  sm:p-4 md:flex-row`}
    >
      <div
        className="magic sm:w-1/2"
        style={{
          '--color1': '#5ddcff',
          '--color2': '#05D6D9',
          '--color3': '#F907FC',
        }}
      >
        {imgSrc &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <div className="flex w-full flex-shrink-0 justify-center py-1 ">
                <img
                  alt={title}
                  src={imgSrc}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </Link>
          ) : (
            <div className="pr-2s w-full flex-shrink-0 pl-2 pt-2">
              <img
                alt={title}
                src={imgSrc}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          ))}
      </div>

      <div className="flex flex-grow justify-center pb-2 pt-4 sm:w-1/2 sm:px-4 sm:py-0">
        <div className="flex flex-col justify-center sm:w-4/5">
          <h2 className="mb-2 text-2xl font-bold leading-7 tracking-tight sm:text-3xl lg:text-7xl">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          {href && (
            <Link
              href={href}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              Learn more &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default FeaturedProject

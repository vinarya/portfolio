import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href, skills }) => (
  <div className="w-full p-2 md:w-1/2" style={{ maxWidth: '400px' }}>
    <div
      className={`${
        imgSrc && 'h-full'
      }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <div className="pl-2 pr-2 pt-2">
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-24 lg:h-32"
                layout="responsive"
                width={100}
                height={100 * (306 / 544)} // maintaining the aspect ratio
              />
            </div>
          </Link>
        ) : (
          <div className="pl-2 pr-2 pt-2">
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-24 lg:h-32"
              layout="responsive"
              width={100}
              height={100 * (306 / 544)} // maintaining the aspect ratio
            />
          </div>
        ))}
      <div className="p-2">
        <h2 className="mb-3 text-xl font-bold leading-7 tracking-tight">
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
        {/* Skills Pills */}
        <div className="my-3 flex flex-wrap">
          {skills.slice(0, Math.min(6, skills.length)).map((skill, index) => (
            <span
              key={index}
              className={`my-1 mr-2 rounded-full px-2 py-0.5 text-white ${
                index % 2 === 0 ? 'bg-blue-500' : 'bg-green-500'
              }`}
            >
              {skill}
            </span>
          ))}
          {skills.length > 6 && (
            <span className="my-1 mr-2 rounded-full bg-red-500 px-2 py-0.5 text-white">
              +{skills.length - 6} more
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default Card

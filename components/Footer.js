import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { BsGithub, BsFacebook, BsYoutube, BsMailbox2, BsLinkedin } from 'react-icons/bs'
import { FaXTwitter } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer>
      <div className="mb-2 mt-8 flex flex-col items-center border-t border-gray-300 dark:border-gray-500 sm:mt-16">
        <div className="my-3 flex items-center justify-between text-3xl text-primary-500 sm:text-4xl ">
          <a href={`mailto:${siteMetadata.email}`} target="_blank" rel="noopener noreferrer">
            <BsMailbox2 className="mx-2 hover:text-primary-600 dark:hover:text-primary-400 sm:mx-4" />
          </a>
          <a href={siteMetadata.github} target="_blank" rel="noopener noreferrer">
            <BsGithub className="mx-2 hover:text-primary-600 dark:hover:text-primary-400 sm:mx-4" />
          </a>
          <a href={siteMetadata.facebook} target="_blank" rel="noopener noreferrer">
            <BsFacebook className="mx-2 hover:text-primary-600 dark:hover:text-primary-400 sm:mx-4" />
          </a>
          <a href={siteMetadata.youtube} target="_blank" rel="noopener noreferrer">
            <BsYoutube className="mx-2 hover:text-primary-600 dark:hover:text-primary-400 sm:mx-4" />
          </a>
          <a href={siteMetadata.linkedin} target="_blank" rel="noopener noreferrer">
            <BsLinkedin className="mx-2 hover:text-primary-600 dark:hover:text-primary-400 sm:mx-4" />
          </a>
          <a href={siteMetadata.twitter} target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="mx-2 hover:text-primary-600 dark:hover:text-primary-400 sm:mx-4" />
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div className="text-primary-500">{` • `}</div>
          <div className="text-primary-500">{`© ${new Date().getFullYear()}`}</div>
          <div className="text-primary-500">{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )
}

import SocialIcon from '@/components/social-icons'
import { FaLaptopCode } from 'react-icons/fa'
import { GiViolin, GiRobotGrab, GiDeliveryDrone } from 'react-icons/gi'
import { MdDesignServices } from 'react-icons/md'
import React, { useState } from 'react'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import FlipCard from 'react-card-flip'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = frontMatter
  const [isFlipped1, setIsFlipped1] = useState(false)
  const [isFlipped2, setIsFlipped2] = useState(false)
  const [isFlipped3, setIsFlipped3] = useState(false)

  const handleFlip1 = () => setIsFlipped1(!isFlipped1)
  const handleFlip2 = () => setIsFlipped2(!isFlipped2)
  const handleFlip3 = () => setIsFlipped3(!isFlipped3)

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/*<div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
  </div>*/}
        <div className=" flex flex-col items-center space-y-2  xl:gap-x-8 xl:space-y-0">
          <div className="relative flex flex-col items-center pt-8">
            <div className="my-16 ">
              <Image
                src={avatar}
                alt="avatar"
                width="192px"
                height="192px"
                className="z-10 h-48 w-48 rounded-full"
              />
              <div className="imgContainer">
                <GiViolin size="2.7em" className="nodeLogo text-teal-500 " />
                <GiDeliveryDrone size="3em" className="reactLogo text-teal-500 " />
                <FaLaptopCode size="2.5em" className="babelLogo text-teal-500 " />
                <MdDesignServices size="3em" className="sassLogo text-teal-500 " />
                <GiRobotGrab size="3em" className="webpackLogo text-teal-500 " />
              </div>
            </div>

            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
          </div>
          <div className="flex flex-col items-center py-5 md:flex-row xl:w-5/6">
            <div className="mx-2 w-full p-2 xl:w-1/3">
              <FlipCard
                isFlipped={isFlipped1}
                flipDirection="vertical"
                containerStyle={{
                  margin: 'auto',
                  perspective: 1000,
                  paddingTop: '0.5em',
                  paddingBottom: '0.5em',
                  opacity: 0.9,
                }}
              >
                <div
                  onMouseEnter={handleFlip1}
                  className="flex h-14 w-full items-center justify-start  rounded-md border-2 bg-gray-200 p-4 pl-2 dark:border-gray-800 dark:bg-gray-800"
                >
                  <img src="/static/images/edu/umich.png" alt="Logo 1" className="w-13 h-10 p-1" />
                  <div className=" flex flex-grow items-center justify-center">
                    <h3 className="text-center text-lg font-bold">University of Michigan</h3>
                  </div>
                </div>
                <div
                  onMouseLeave={handleFlip1}
                  className="magic flex h-14 w-full items-center justify-center rounded-md border-2 bg-gray-200 p-4 dark:border-gray-800 dark:bg-gray-800"
                  style={{
                    '--color1': '#FFCB05',
                    '--color2': '#00274C',
                    '--color3': '#FFCB05',
                  }}
                >
                  <p className="text-lg font-bold">BSE Aerospace & Computer Science</p>
                </div>
              </FlipCard>
            </div>
            <div className="mx-2 w-full p-2 xl:w-1/3">
              <FlipCard
                isFlipped={isFlipped2}
                flipDirection="vertical"
                containerStyle={{
                  margin: 'auto',
                  perspective: 1000,
                  paddingTop: '0.5em',
                  paddingBottom: '0.5em',
                }}
              >
                <div
                  onMouseEnter={handleFlip2}
                  className="flex h-14 w-full items-center justify-start rounded-md border-2 bg-gray-200 p-4 pl-2 dark:border-gray-800 dark:bg-gray-800"
                >
                  <img src="/static/images/edu/ohs.png" alt="Logo 1" className="w-15 h-10 p-1" />
                  <div className=" flex flex-grow items-center justify-center">
                    <h3 className="text-center text-lg font-bold">Oxford High School</h3>
                  </div>
                </div>
                <div
                  onMouseLeave={handleFlip2}
                  className="magic flex h-14 w-full items-center justify-center  rounded-md border-2 bg-gray-200 p-4 dark:border-gray-800 dark:bg-gray-800"
                  style={{
                    '--color1': '#FFCB05',
                    '--color2': '#00274C',
                    '--color3': '#FFCB05',
                  }}
                >
                  <p className="font-bold">High School</p>
                </div>
              </FlipCard>
            </div>
            <div className="mx-2 w-full p-2 xl:w-1/3">
              <FlipCard
                isFlipped={isFlipped3}
                flipDirection="vertical"
                containerStyle={{
                  margin: 'auto',
                  perspective: 1000,
                  paddingTop: '0.5em',
                  paddingBottom: '0.5em',
                }}
              >
                <div
                  onMouseEnter={handleFlip3}
                  className=" flex h-14 w-full items-center justify-start rounded-md border-2 bg-gray-200 p-4 pl-2 dark:border-gray-800 dark:bg-gray-800"
                >
                  <img src="/static/images/edu/mayo-logo.png" alt="Logo 1" className="h-9 w-9" />
                  <div className=" flex flex-grow items-center justify-center">
                    <h3 className="text-center text-lg font-bold">Mayo College</h3>
                  </div>
                </div>
                <div
                  onMouseLeave={handleFlip3}
                  className="magic flex h-14 w-full items-center justify-center  rounded-md border-2 bg-gray-200 p-4 dark:border-gray-800 dark:bg-gray-800"
                  style={{
                    '--color1': 'green',
                    '--color2': 'red',
                    '--color3': 'blue',
                  }}
                >
                  <p className=" font-bold">Middle School</p>
                </div>
              </FlipCard>
            </div>
          </div>

          <div className="prose max-w-none pb-8 pt-8 dark:prose-dark">{children}</div>
        </div>
      </div>
    </>
  )
}

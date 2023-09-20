import { FaLaptopCode } from 'react-icons/fa'
import { GiViolin, GiRobotGrab, GiDeliveryDrone } from 'react-icons/gi'
import { MdDesignServices } from 'react-icons/md'
import React, { useState } from 'react'
import { PageSEO } from '@/components/SEO'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className=" flex flex-col items-center space-y-2  xl:gap-x-8 xl:space-y-0">
          <div className="relative flex flex-col items-center pt-8">
            <div className="my-16 ">
              <img
                alt="avatar"
                src={avatar}
                className="z-10 h-1/2 h-48 w-1/2 w-48 rounded-full"
                loading="lazy"
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
            <div className="text-center text-gray-500 dark:text-gray-400">{occupation}</div>
            {/*<div className="text-gray-500 dark:text-gray-400">{company}</div>*/}
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-dark">{children}</div>
        </div>
      </div>
    </>
  )
}

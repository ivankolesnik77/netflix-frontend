import React, { useEffect, useState } from 'react'
import facebookIcon from '@/icons/facebook.svg'
import instagramIcon from '@/icons/instagram.svg'
import twitterIcon from '@/icons/twitter.svg'
import youtubeIcon from '@/icons/youtube.svg'
import Image from 'next/image'
const links = [
    {
        title: 'Audio Description',
        link: '/',
    },
    { title: 'Help Center', link: '/' },
    { title: 'Gift Cards', link: '/' },
    { title: 'Media Center', link: '/' },
    { title: 'Investor Relations', link: '/' },
    { title: 'Jobs', link: '/' },
    { title: 'Terms of Use', link: '/' },
    { title: 'Privacy', link: '/' },
    { title: 'Legal Notices', link: '/' },
    { title: 'Cookie Preferences', link: '/' },
    { title: 'Corporate Information', link: '/' },
    { title: 'Contact Us', link: '/' },
    { title: 'Ad Choices', link: '/' },
]

const icons = [facebookIcon, instagramIcon, twitterIcon, youtubeIcon]
const Footer = () => {
    return (
        <div className={`bg-[#141414]`}>
            <div
                className={
                    'z-10 mx-auto mt-[100px] box-content flex max-w-[980px] flex-col px-[4%] py-8'
                }
            >
                <div className="mb-4 flex gap-[15px]">
                    {icons.map((icon, index) => (
                        <Image
                            src={icon}
                            width={24}
                            height={24}
                            className="h-[25px] w-[36px]"
                            alt={'Footer icon'}
                            key={`footer-icon-${index}`}
                        />
                    ))}
                </div>

                <ul className="flex flex-wrap">
                    {links.map((link, index) => (
                        <li
                            className="mb-4 basis-1/4 pr-[22px] text-[13px] text-gray-500"
                            key={`footer-link-${index}`}
                        >
                            <a href={link.link} className="text-gray">
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Footer

import Link from 'next/link'
import React, { FC, useState } from 'react'

import { useTimer } from '../../../utils/hooks'
import { DefaultCarousel } from '@/components/layout/carousel'

interface IProps {
    items: any[]
}

const Popular: FC<IProps> = ({ items }) => {
    const [isClick, setIsClick] = useState(false)
    const isUpdate = useTimer(isClick)

    const handleMouseDown = () => {
        setIsClick(true)
    }

    const handleMouseLeave = () => {
        setIsClick(false)
    }

    return (
        <div className="relative mt-6 pt-6 font-semibold">
            <h2 className="mb-3 text-2xl text-white ">Popular on Netflix</h2>
            <div>
                <DefaultCarousel isUpdate={isUpdate}>
                    {items.map((item, key) => (
                        <div
                            onMouseLeave={handleMouseLeave}
                            onMouseDown={handleMouseDown}
                            key={'carousel-item-' + item.title}
                            className="w-[240px]"
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                width={280}
                                className="rounded-sm"
                            />
                        </div>
                    ))}
                </DefaultCarousel>
            </div>
        </div>
    )
}

export default Popular

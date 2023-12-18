import Link from "next/link";
import React, { FC, useState } from "react";
import { DefaultCarousel } from "../../layout/Carousel";
import { useTimer } from "../../../utils/hooks";

interface IProps {
  items: any[];
}

const Popular: FC<IProps> = ({ items }) => {
  const [isClick, setIsClick] = useState(false);
  const isUpdate = useTimer(isClick);

  const handleMouseDown = () => {
    setIsClick(true);
  };

  const handleMouseLeave = () => {
    setIsClick(false);
  };

  return (
    <div className="font-semibold relative mt-6 pt-6">
      <h2 className="text-white mb-3 ">Popular on Netflix</h2>
      <div>
        <DefaultCarousel isUpdate={isUpdate}>
          {items.map((item, key) => (
            <Link
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              key={"carousel-item-" + item.title}
              href={item.href}
              className="w-[240px]"
            >
              <img src={item.src} alt={item.title} width={280} className="rounded-sm" />
            </Link>
          ))}
        </DefaultCarousel>
      </div>
    </div>
  );
};

export default Popular;

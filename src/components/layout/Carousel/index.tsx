import { useEffect, useRef, useState } from "react";
import { setInterval } from "timers";

const slideWidth = 240;
const gapWidth = 5;

export const DefaultCarousel = ({ children, isUpdate }: any) => {
  const slider = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (isUpdate && slider.current) {
      slider.current.scrollLeft += slideWidth + gapWidth;
    }
  }, [isUpdate]);

  useEffect(() => {
    if (slider && slider.current) {
      let sliderRef = slider.current;
      sliderRef.addEventListener("mousedown", onMouseClick);
      sliderRef.addEventListener("mouseleave", onMouseLeave);
      sliderRef.addEventListener("mouseup", onMouseUp);
      sliderRef.addEventListener("mousemove", onMouseMove);

      return () => {
        sliderRef.removeEventListener("mousedown", onMouseClick);
        sliderRef.removeEventListener("mouseleave", onMouseLeave);
        sliderRef.removeEventListener("mouseup", onMouseUp);
        sliderRef.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, []);

  function onMouseClick(e: any) {
    if (!slider.current) return;
    isDown.current = true;
    setStartX(e.pageX - slider.current.offsetLeft);
    setScrollLeft(slider.current.scrollLeft);
  }

  function onMouseLeave() {
    isDown.current = false;
  }

  function onMouseUp() {
    isDown.current = false;
  }

  function onMouseMove(e: any) {
    if (!isDown.current || !slider.current) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = x - startX;

    slider.current.scrollLeft = scrollLeft - walk;
  }

  return (
    <div
      className="ml no-scrollbar relative grid w-[730px] max-w-[100vw] cursor-pointer grid-flow-col gap-2 overflow-hidden overflow-x-scroll scroll-smooth transition-all will-change-transform"
      ref={slider}
    >
      {children}
    </div>
  );
};

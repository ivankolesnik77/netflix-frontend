import { useEffect, useRef, useState } from "react";
import { setInterval } from "timers";

const slideWidth = 240;
const gapWidth = 5;

export const DefaultCarousel = ({ children, isUpdate }: any) => {
  const slider = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(null);
  const scrollLeft = useRef(null);

  useEffect(() => {
    if (isUpdate) {
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

  function onMouseClick(e) {
    isDown.current = true;
    startX.current = e.pageX - slider.current.offsetLeft;
    scrollLeft.current = slider.current.scrollLeft;
  }

  function onMouseLeave() {
    isDown.current = false;
  }

  function onMouseUp() {
    isDown.current = false;
  }

  function onMouseMove(e) {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = x - startX.current;
    console.log(scrollLeft.current - walk);
    slider.current.scrollLeft = scrollLeft.current - walk;
  }

  return (
    <div
      className="scroll-smooth max-w-[100vw] ml overflow-hidden relative w-[730px] overflow-x-scroll transition-all will-change-transform cursor-pointer grid grid-flow-col no-scrollbar gap-2"
      ref={slider}
    >
      {children}
    </div>
  );
};

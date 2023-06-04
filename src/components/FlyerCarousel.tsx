import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import style from "./FlyerCarousel.module.css";
import { slides } from "../data/carouselData.json";

const FlyerCarousel: React.FC<{
  selectPreviewFlyer: (flyerId: number) => void;
}> = (props) => {
  const [slide, setSlide] = useState<number>(0);
  const nextSlide = () => {
    setSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const onSelectFlyer = (flyerId: number) => {
    props.selectPreviewFlyer(flyerId);
  };

  return (
    <div className={style.carousel}>
      <BsArrowLeftCircleFill
        className={[style.arrow, style.arrowLeft].join(" ")}
        onClick={prevSlide}
      />
      {slides.map((item, idx) => {
        return (
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            className={
              slide === idx
                ? style.slide
                : [style.slide, style.slideHidden].join(" ")
            }
            onClick={onSelectFlyer.bind(null, item.id)}
          />
        );
      })}
      <BsArrowRightCircleFill
        className={[style.arrow, style.arrowRight].join(" ")}
        onClick={nextSlide}
      />
      <span className={style.indicators}>
        {slides.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx
                  ? style.indicator
                  : [style.indicator, style.indicatorInactive].join(" ")
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default FlyerCarousel;

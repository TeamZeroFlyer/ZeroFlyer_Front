import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import style from "./FlyerCarousel.module.css";
import { slides } from "../data/carouselData.json";
import { FlyerInf } from "../pages/qr/CreateQRCode";
import { Link } from "react-router-dom";

const FlyerCarousel: React.FC<{
  flyers: FlyerInf[];
  selectPreviewFlyer: (flyerId: number) => void;
}> = (props) => {
  const [slide, setSlide] = useState<number>(0);
  const nextSlide = () => {
    setSlide((prev) => (prev === props.flyers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlide((prev) => (prev === 0 ? props.flyers.length - 1 : prev - 1));
  };

  const onSelectFlyer = (flyerId: number) => {
    props.selectPreviewFlyer(flyerId);
  };

  return (
    <div className={style.carousel}>
      {props.flyers.length > 1 && (
        <BsArrowLeftCircleFill
          className={[style.arrow, style.arrowLeft].join(" ")}
          onClick={prevSlide}
        />
      )}
      {props.flyers.length > 0 ? (
        props.flyers.map((flyer, idx) => {
          return (
            <img
              src={flyer.flyerUrl}
              alt="전단지 이미지"
              key={flyer.idx}
              className={
                slide === idx
                  ? style.slide
                  : [style.slide, style.slideHidden].join(" ")
              }
              onClick={onSelectFlyer.bind(null, flyer.idx)}
            />
          );
        })
      ) : (
        <Link to="/flyer/new">
          <div className={style.placeHolder}>
            <p>전단지 등록하러가기!</p>
          </div>
        </Link>
      )}
      {props.flyers.length > 1 && (
        <BsArrowRightCircleFill
          className={[style.arrow, style.arrowRight].join(" ")}
          onClick={nextSlide}
        />
      )}
      {props.flyers.length > 1 && (
        <span className={style.indicators}>
          {props.flyers.map((_, idx) => {
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
      )}
    </div>
  );
};

export default FlyerCarousel;

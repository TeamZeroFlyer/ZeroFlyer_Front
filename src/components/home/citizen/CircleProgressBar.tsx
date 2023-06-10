import React, {useEffect, useRef } from "react";

import style from "./CircleProgressBar.module.css";

const CircleProgressBar: React.FC<{
  progress: number;
  strokeWidth: number;
  circleRadius: number;
  children: React.ReactNode;
}> = ({ progress, strokeWidth, circleRadius, children }) => {
  const normalizedRadius = circleRadius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progressOffset = (progress / 100) * circumference;

  const circleX =
    circleRadius + Math.cos((2 * Math.PI * progress) / 100) * normalizedRadius;
  const circleY =
    circleRadius + Math.sin((2 * Math.PI * progress) / 100) * normalizedRadius;

  return (
    <div className={style.circleProgressBarWrapper}>
      {children}
      <svg
        className={style.circleProgressBar}
        height={circleRadius * 2}
        width={circleRadius * 2}
      >
        <circle
          className={style.circleProgressBarBackground}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={normalizedRadius}
          cx={circleRadius}
          cy={circleRadius}
        />
        <circle
          className={style.circleProgressBarProgress}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={normalizedRadius}
          cx={circleRadius}
          cy={circleRadius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progressOffset}
        />
        <circle
          className={style.circleProgressBarEndMarker}
          r={strokeWidth}
          cx={circleX}
          cy={circleY}
        />
      </svg>
    </div>
  );
};

export default CircleProgressBar;

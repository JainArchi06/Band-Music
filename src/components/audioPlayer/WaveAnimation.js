import React from "react";
import "./WaveAnimation.css";

export default function WaveAnimation({ isPlaying }) {
  const WaveClass = isPlaying ? "box active" : "box";

  return (
    <div className="box-container flex">
      <div className={`${WaveClass} box1`}></div>
      <div className={`${WaveClass} box2`}></div>
      <div className={`${WaveClass} box3`}></div>
      <div className={`${WaveClass} box4`}></div>
      <div className={`${WaveClass} box5`}></div>
      <div className={`${WaveClass} box6`}></div>
      <div className={`${WaveClass} box7`}></div>
      <div className={`${WaveClass} box2`}></div>
      <div className={`${WaveClass} box3`}></div>
      <div className={`${WaveClass} box4`}></div>
      <div className={`${WaveClass} box5`}></div>
      <div className={`${WaveClass} box6`}></div>
      <div className={`${WaveClass} box7`}></div>
    </div>
  );
}

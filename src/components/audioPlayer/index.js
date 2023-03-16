import React, { useState, useRef, useEffect } from 'react'
import './audioPlayer.css';
import ProgressCircle from './ProgressCircle';
import WaveAnimation from './WaveAnimation';
import Controls from './controls';

export default function AudioPlayer({ currentTrack, currentIndex, setCurrentIndex, total }) {
  const [isplaying, setIsPlaying] = useState(true);
  const [trackProgress, setTrackProgress] = useState(0);
  var audioSrc = total[currentIndex]?.track.preview_url;
  const audioRef = useRef(new Audio(total[0]?.track.preview_url));

  const IntervalRef = useRef();

  const isReady = useRef(false);

  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;
  console.log(currentPercentage);

  const startTimer = () => {
    clearInterval(IntervalRef.current);
    IntervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);

      }
    }, [1000]);
  };
  useEffect(() => {
    if (isplaying && audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(IntervalRef.current.currentTime);
      audioRef.current.pause();
    }
  }, [isplaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(IntervalRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    else setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
    else currentIndex(currentIndex - 1);
  }

  const artists = [];
  currentTrack?.album?.artists.forEach((artist) => {
    artists.push(artist.name);
  });

  return (
    <div className="player-body flex" >
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isplaying={true}
          image={currentTrack?.album?.images[0]?.url}
          size={300}
          color="red"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists.join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{Math.round(trackProgress)}</p>
            <WaveAnimation isplaying={true} />
            <p className="duration">0:30</p>
          </div>
          <Controls
            isplaying={isplaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>

  );
}

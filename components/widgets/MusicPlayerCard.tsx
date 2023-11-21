"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import cardStyle from "./music-player-card.module.css";
import PlaybackSpeedIcon from "../images/entries/musicPlayerCard/PlaybackSpeedIcon";
import BackToStartIcon from "../images/entries/musicPlayerCard/BackToStartIcon";
import AdjustSpeedIcon from "../images/entries/musicPlayerCard/AdjustSpeedIcon";
import PauseTrackIcon from "../images/entries/musicPlayerCard/PauseTrackIcon";
import PlayTrackIcon from "../images/entries/musicPlayerCard/PlayTrackIcon";
import LoopTrackOffIcon from "../images/entries/musicPlayerCard/LoopTrackOffIcon";
import LoopTrackIcon from "../images/entries/musicPlayerCard/LoopTrackIcon";

interface Props {
  url: string;
  title?: string;
  author?: string;
  coverUrl?: string;
}

function formatTime(time: number, duration: number) {
  time = Math.floor(time);
  duration = Math.floor(duration);

  const partsTime = [
    Math.floor(time / 86400),
    Math.floor((time % 86400) / 3600),
    Math.floor((time % 3600) / 60),
    time % 60,
  ];

  const maxIdxDuration = [86400, 3600, 60, 1].findIndex(
    (t, i, a) => duration >= t
  );

  const sliceIndex = Math.max(2, maxIdxDuration);

  return partsTime
    .slice(sliceIndex)
    .map((t) => t.toString().padStart(2, "0"))
    .join(":");
}

const defaultCover = "/util/placeholder-audio-cover.svg";

export default function MusicPlayerCard({
  url,
  title,
  author,
  coverUrl,
}: Props) {
  const trackTitle = title || "Audio Track";

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>(url);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekBarRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState<boolean>(false);

  function calculateSeekPosition(clientX: number) {
    if (seekBarRef.current) {
      const rect = seekBarRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = x / rect.width;
      seek(percentage * duration);
    }
  }

  const handleStart = (clientX: number) => {
    setIsInteracting(true);
    calculateSeekPosition(clientX);
  };

  const handleMove = (clientX: number) => {
    if (isInteracting) {
      calculateSeekPosition(clientX);
    }
  };

  const handleEnd = () => {
    setIsInteracting(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleMouseUp = () => handleEnd();

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };
    const handleTouchEnd = () => handleEnd();

    if (isInteracting) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isInteracting]);

  function getAudioMetaData(src: string): Promise<HTMLAudioElement> {
    setIsMetadataLoaded(false);
    return new Promise((resolve, reject) => {
      let audio = new Audio();

      audio.addEventListener("loadedmetadata", () => {
        resolve(audio);
      });

      audio.addEventListener("error", (e) => {
        reject(e);
      });

      audio.preload = "metadata";
      audio.src = src;
    });
  }

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio?.addEventListener("play", handlePlay);
    audio?.addEventListener("pause", handlePause);

    return () => {
      audio?.removeEventListener("play", handlePlay);
      audio?.removeEventListener("pause", handlePause);
    };
  }, [audioRef]);

  useEffect(() => {
    const audioElement = audioRef.current;
    const updateCurrentTime = () => setCurrentTime(audioElement!.currentTime);

    audioElement?.addEventListener("timeupdate", updateCurrentTime);
    return () =>
      audioElement?.removeEventListener("timeupdate", updateCurrentTime);
  }, [audioRef]);

  useEffect(() => {
    getAudioMetaData(url).then((audio) => {
      setIsMetadataLoaded(true);
      setDuration(audio.duration);
    });
  }, [url]);

  const seek = (timeInSeconds: number): void => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeInSeconds;
    }
  };

  const changeRate = (newRate: number): void => {
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
      setPlaybackRate(newRate);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  };

  const toggleIsLooping = (): void => {
    setIsLooping(!isLooping);
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
    }
  };

  const handleUrlChange = (newUrl: string): void => {
    setAudioUrl(newUrl);
    setCurrentTime(0);
    getAudioMetaData(newUrl).then((audio) => {
      setIsMetadataLoaded(true);
      setDuration(audio.duration);
    });
  };

  const progressBarPercentage = useMemo(() => {
    return (currentTime / duration) * 100;
  }, [currentTime, duration]);

  return (
    <section className="bg-widget-60 text-primary p-2.5 md:p-4 shadow-lg w-full backdrop-blur-xl rounded-xl flex">
      <audio ref={audioRef} src={audioUrl} loop={isLooping} />
      <div className="w-24 self-center md:w-32 h-auto aspect-square rounded-xl overflow-hidden bg-pastel bg-opacity-90 shrink-0 mr-2.5 md:mr-3">
        <Image
          src={coverUrl || defaultCover}
          alt={`Cover of ${trackTitle}`}
          className="w-full h-auto object-cover"
          width={128}
          height={128}
        />
      </div>
      <div className="flex-grow flex flex-col justify-center">
        <h2 className="text-lg md:text-xl font-bold">{trackTitle}</h2>
        {author && (
          <h3 className="text-base md:text-xl -mt-1 md:mt-0">{author}</h3>
        )}
        <div className="flex-grow select-none pointer-events-none" />
        <div
          className={`flex w-full mb-1 transition-opacity duration-300 ease-in-out ${
            isMetadataLoaded
              ? "opacity-100"
              : "opacity-0 pointer-events-none select-none"
          }`}
        >
          <div className="w-0 relative">
            <div
              className={`hidden whitespace-nowrap left-0 absolute ${cardStyle["small-screen"]} items-center`}
            >
              <button
                className="w-4 md:w-5 mr-0.5 h-auto aspect-squar"
                onClick={() => {
                  changeRate(1);
                }}
              >
                <PlaybackSpeedIcon className="w-full h-auto aspect-square" />
              </button>
              <div className="text-saturated text-sm md:text-base">{`x${playbackRate}`}</div>
            </div>
          </div>
          <div className="flex items-center justify-end md:justify-center flex-grow space-x-2.5 md:space-x-6">
            <button
              className=""
              onClick={() => {
                seek(0);
                changeRate(1);
              }}
            >
              <BackToStartIcon className="w-5 md:w-6 h-auto aspect-square transition-transform duration-300 ease-in-out hover:scale-110" />
            </button>
            <button
              className=""
              onClick={() => changeRate(Math.max(0.25, playbackRate - 0.25))}
            >
              <AdjustSpeedIcon className="w-5 md:w-6 h-auto aspect-square transition-transform duration-300 ease-in-out hover:scale-110" />
            </button>
            <button className="" onClick={handlePlayPause}>
              {isPlaying ? (
                <PauseTrackIcon className="w-5 md:w-6 h-auto aspect-square transition-transform duration-300 ease-in-out hover:scale-110" />
              ) : (
                <PlayTrackIcon className="w-5 md:w-6 h-auto aspect-square transition-transform duration-300 ease-in-out hover:scale-110" />
              )}
            </button>
            <button
              className=""
              onClick={() => changeRate(Math.min(2, playbackRate + 0.25))}
            >
              <AdjustSpeedIcon className="w-5 md:w-6 h-auto aspect-square rotate-180 transition-transform duration-300 ease-in-out hover:scale-110" />
            </button>
            <button className="relative group" onClick={toggleIsLooping}>
              <LoopTrackOffIcon className="w-5 md:w-6 h-auto aspect-square transition-transform duration-300 ease-in-out group-hover:scale-110" />
              <LoopTrackIcon
                className={`select-none pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 md:w-6 h-auto aspect-square transition-all duration-300 ease-in-out group-hover:scale-110 ${
                  isLooping ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          </div>
        </div>
        <div
          className={`flex items-center transition-opacity duration-300 ease-in-out ${
            isMetadataLoaded
              ? "opacity-100"
              : "opacity-0 pointer-events-none select-none"
          }`}
        >
          <span className="text-sm md:text-base">
            {formatTime(Math.max(Math.floor(currentTime), 0), duration)}
          </span>
          <div
            ref={seekBarRef}
            className="mx-2 flex-grow h-6 py-2 cursor-pointer"
            onMouseDown={(e) => handleStart(e.clientX)}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onMouseUp={handleEnd}
            onTouchEnd={handleEnd}
          >
            <div className="bg-pastel bg-opacity-90 rounded-full h-full overflow-hidden">
              <div
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(0, progressBarPercentage)
                  )}%`,
                }}
                className="bg-soft rounded-r-full h-2"
              />
            </div>
          </div>
          <span className="text-sm md:text-base">{`-${formatTime(
            Math.max(0, duration - Math.floor(currentTime)),
            duration
          )}`}</span>
        </div>
      </div>
    </section>
  );
}

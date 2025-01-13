"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
const Skeleton = dynamic(() => import("./../skelton/page"), {
  ssr: false,
});

interface VideoProps {
  src: any;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  showPlayButton?: boolean;
  clickPause?: Boolean;
  thumbnail?: any; // Add a thumbnail prop
}

const VideoPlayer: React.FC<VideoProps> = ({
  src,
  className,
  autoPlay,
  muted,
  loop,
  clickPause = true,
  showPlayButton,
  thumbnail,
}) => {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showButton, setShowButton] = useState(showPlayButton ?? !autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoSrc, setVideoSrc] = useState<any | null>(null);

  useEffect(() => {
    const fetchVideoBlob = async () => {
      if (src) {
        try {
          const response = await fetch(`${src}`);
          if (!response.ok)
            throw new Error("Network response was not ok");
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setVideoSrc(url);
        }
        catch (error) {
          console.log(error);
          // console.error("Error fetching video:", error);
        }
      }
    };
    fetchVideoBlob();
    // Clean up the Blob URL on component unmount 
    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [src]);


  useEffect(() => {
    const videoElement = videoRef.current;

    const handleCanPlay = () => {
      setLoading(false);
    };

    if (videoElement) {
      videoElement.addEventListener("loadeddata", handleCanPlay);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadeddata", handleCanPlay);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setShowButton(true);
      } else {
        videoRef.current.play();
        setShowButton(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  return (
    <div
      className="relative"
      onClick={clickPause ? handleVideoClick : undefined}
    >
      {/* {loading && <Skeleton className="absolute inset-0 w-full h-full" />} */}

      {/* Overlay with background color */}
      {/* <div className="absolute inset-0 bg-black opacity-40 z-10 pointer-events-none"></div> */}

      <video
        ref={videoRef}
        src={videoSrc}
        className={`${className} relative z-0`} // Ensures the video is layered below the overlay
        autoPlay={autoPlay}
        poster={thumbnail}
        muted={muted}
        loop={loop}
        preload="metadata" // Preload metadata only
        onCanPlay={() => setLoading(false)}
      ></video>

      {showButton && (
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 m-auto bg-white text-black p-2 rounded-full h-12 w-12 flex items-center justify-center z-20"
        >
          {isPlaying ? (
            "❚❚"
          ) : (
            <svg
              version="1.1"
              id="Capa_1"
              width={13}
              height={13}
              className="text-center"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 109.126 109.126"
            >
              <g>
                <path d="M98.901,47.663L18.197,1.068c-2.467-1.424-5.502-1.424-7.972,0C7.762,2.491,6.243,5.124,6.243,7.971v93.188 c0,2.848,1.522,5.479,3.982,6.9c1.236,0.713,2.61,1.067,3.986,1.067c1.374,0,2.751-0.354,3.983-1.067l80.704-46.594 c2.466-1.422,3.984-4.054,3.984-6.9C102.887,51.719,101.366,49.088,98.901,47.663z" />
              </g>
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;

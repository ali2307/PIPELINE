"use client";
import React, { useState, useEffect } from "react";
import ImageCarousel from "../imgCarousel/page";
import ImageCarouselAbout from "../imgCarouselAbout/page";
import VideoPlayer from "../videoPlayer/page";
import ImageCarouselExplorer from "../imgCarouselExplorer/page";
import ImgCarouselTestimonial from "../imgCarouselTestimonial/page";

interface MediaDisplayProps {
  isImage?: boolean;
  isVideo?: boolean;
  thumbnail?: any;
  imageCarouselType?: string; // Add more types as needed
  slides?: Array<{
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }>;
  video?: Array<{ img_md_url: string }>;
  className?: string;
  videoClassName?: string;
}

const MediaDisplay: React.FC<MediaDisplayProps> = ({
  isImage,
  isVideo,
  imageCarouselType,
  slides = [],
  video = [],
  className = "",
  videoClassName = "",
  thumbnail,
}) => {
  const [renderVideo, setRenderVideo] = useState<boolean>(!!isVideo);

  // Set render priority for video if `isVideo` is true initially
  useEffect(() => {
    if (isVideo) {
      setRenderVideo(true);
    }
  }, [isVideo]);

  const renderImageCarousel = () => {
    switch (imageCarouselType) {
      case "home":
        return (
          <ImageCarousel
            className="brightness-50"
            slides={slides}
            width={1920}
            height={1080}
          />
        );
      case "about":
        return <ImageCarouselAbout slides={slides} width={1464} height={717} />;
      case "explore":
        return (
          <ImageCarouselExplorer
            slides={slides}
            width={1920}
            height={646}
            className="relative w-full md:h-[610px] h-[345px] bg-cover bg-no-repeat object-cover brightness-50"
          />
        );
      case "testimonial":
        return (
          <ImgCarouselTestimonial slides={slides} width={1920} height={1080} />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isImage && renderImageCarousel()}
      {renderVideo && isVideo && (
        <VideoPlayer
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL_S3}${video[0]?.img_md_url}`}
          autoPlay={true}
          muted={true}
          loop={true}
          clickPause={false}
          showPlayButton={false}
          className={`${videoClassName} `}
          thumbnail={`${process.env.NEXT_PUBLIC_STORAGE_URL_S3}${thumbnail?.[0]?.img_md_url}`}
        />
      )}
    </div>
  );
};

export default MediaDisplay;

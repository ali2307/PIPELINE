"use client";
import React from "react";
import { useStore } from "./../../../store/index";
import dynamic from "next/dynamic";
import VideoPlayer from "../videoPlayer/page";

const ImageCarouselExplorer = dynamic(
  () => import("../imgCarouselExplorer/page"),
  { ssr: false }
);

const Explore: React.FC = () => {
  const { title, content, slides, isImage, isVideo, video, thumbnail } = useStore(
    (state) => state.homeExplore
  );
  return (
    <>
      <div className="flex items-center flex-col justify-end relative">
        <div className="absolute flex items-center md:mb-32 justify-center z-20 sm:bottom-10">
          <div className="text-center">
            <h2 className="lg:text-4xl md:text-3xl text-2xl leading-tight font-bold text-white mb-1">
              {title}
            </h2>
            <p
              className="text-[16px] md:text-[25px] 2xl:text-3xl xl:text-2xl md:text-xl leading-[26px] max-w-4xl lg:max-h-[4.8rem] max-h-20 px-3 overflow-hidden font-md  text-white"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            ></p>
          </div>
        </div>
        <div className="relative w-full md:h-[646px] h-full inset-0 z-10">
          {/* <ImageCarouselExplorer slides={slides} width={1440} height={850} /> */}
          {isImage && (
            <ImageCarouselExplorer
              slides={slides}
              width={1920}
              height={1080}
              className="relative w-full md:h-[610px] h-[345px]  bg-cover bg-no-repeat object-cover brightness-50"
            />
          )}
          {isVideo && (
            <VideoPlayer
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL_S3}${video?.[0]?.img_md_url}`}
              autoPlay={false}
              muted={true}
              loop={true}
              clickPause={true}
              showPlayButton={true}
              thumbnail={`${process.env.NEXT_PUBLIC_STORAGE_URL_S3}${thumbnail?.[0]?.img_md_url}`}
              className="w-full md:h-[646px] min-h-[250px] object-cover bg-cover bg-no-repeat"
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Explore;

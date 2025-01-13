"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useStore } from "./../../../store/index";
import MediaDisplay from "../commonMedia/page";

const VideoPlayer = dynamic(() => import("../videoPlayer/page"), {
  ssr: false,
  // loading: () => <p>Loading...</p>,
});

const BannerSelecterTwo = dynamic(() => import("../bannerSelectTwo/page"), {
  ssr: false,
});
const ImageCarousel = dynamic(() => import("../imgCarousel/page"), {
  ssr: false,
});

const Banner: React.FC = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { title, content, slides, isImage, isVideo, video } = useStore(
    (state) => state.homeBanner
  );
  const t = useTranslations("Index");

  const toggleMobileFilterClose = () => {
    setIsMobileFilterOpen(false);
  };

  return (
    <section className="md:h-screen flex justify-center flex-col items-center h-[700px]">
      <div className="container z-20 relative gap-5 h-auto p-6 md:p-6 lg:p-10 mx-auto pt-24">
        <div
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 col-span-1"
          onClick={toggleMobileFilterClose}
        >
          <div className="flex md:flex-row flex-col justify-end text-center items-center lg:text-start">
            <h1 className="relative 2xl:text-[80px] lg:text-[50px] text-3xl md:font-medium font-bold 2xl:leading-[100%] lg:leading-[111%] md:leading-[44px] leading-12  md:text-left text-white drop-shadow-2xl lg:max-h-96  overflow-hidden text-dark-grey-900 xl:max-w-[75%] z-0 md:text-[38px] max-w-[90%] pb-4">
              {title}
            </h1>
          </div>

          <div className="md:flex items-center md:justify-start col-span-1 lg:mt-0 px-3">
            <div className="absolute w-1.5 bg-sky-700 rounded-[1px] 2xl:h-[257px] lg:h-[180px] md:h-[131px] mr-3 z-0 "></div>
            <p
              className="text-center md:text-left font-light text-white max-w-[28rem] max-h-48 opacity-0.4 md:text-xl overflow-hidden drop-shadow-2xl md:pl-8 sm:pb-16"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            ></p>
          </div>
          {/* <div className="sm:w-[256px] h-[70px] flex flex-1 bg-black/50 md:hidden justify-between items-center mx-auto px-10">
            <div className="text-white text-base font-medium font-['Roboto'] uppercase flex justify-start items-start">
              Find Properties
            </div>

            <div className="sm:w-[23px] h-[23px] text-white relative">
              <svg
                width="18"
                height="18"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_7373_5218)">
                  <path
                    d="M21.8499 10.35H12.6501V1.14993C12.6501 0.515268 12.1348 0 11.4999 0C10.8653 0 10.35 0.515268 10.35 1.14993V10.35H1.14993C0.515268 10.35 0 10.8653 0 11.4999C0 12.1348 0.515268 12.6501 1.14993 12.6501H10.35V21.8499C10.35 22.4848 10.8653 23.0001 11.4999 23.0001C12.1348 23.0001 12.6501 22.4848 12.6501 21.8499V12.6501H21.8499C22.4848 12.6501 23.0001 12.1348 23.0001 11.4999C23.0001 10.8653 22.4848 10.35 21.8499 10.35Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7373_5218">
                    <rect width="23" height="23" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div> */}
        </div>
      </div>
      <BannerSelecterTwo
        isMobileFilterOpen={isMobileFilterOpen}
        setIsMobileFilterOpen={setIsMobileFilterOpen}
      />

      {/* Overlay with background color */}
      <div
        className="absolute inset-x-0 top-0 z-0 w-full bg-cover object-cover bg-no-repeat"
        onClick={toggleMobileFilterClose}
      >
        {/* {isImage && (
          <ImageCarousel
            className={"brightness-50"}
            slides={slides}
            width={1920}
            height={1080}
          />
        )}
       
        {isVideo && (
          <VideoPlayer
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL_S3}${video[0]?.img_md_url}`}
            autoPlay={true}
            muted={true}
            loop={true}
            clickPause={false}
            showPlayButton={false}
            className="w-full md:h-screen h-[700px] object-cover bg-cover brightness-50 bg-no-repeat"
          />
        )} */}
        <MediaDisplay
          isVideo={isVideo}
          isImage={isImage}
          imageCarouselType="home"
          slides={slides}
          className="mb-10"
          videoClassName="w-full md:h-screen h-[700px] object-cover bg-cover brightness-50 bg-no-repeat"
          video={video}
        />
      </div>
    </section>
  );
};
export default Banner;

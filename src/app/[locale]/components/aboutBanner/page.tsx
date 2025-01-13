"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "./../../../store/index";
import { ZERO } from "../../../utils/constants";
import dynamic from "next/dynamic";
import MediaDisplay from "../commonMedia/page";

const ImageCarouselAbout = dynamic(() => import("../imgCarouselAbout/page"), {
  ssr: false, // Disable server-side rendering for this component
});
interface NewArray {
  [key: string]: string | undefined; // Key is a string, value is a string or undefined
}

const AboutBanner: React.FC = () => {
  const { title, content, slides, subtitle, isImage, isVideo, video } =
    useStore((state) => state.aboutBanner);
  const [newArray, setNewArray] = useState<NewArray>({});
  useEffect(() => {
    if (subtitle && subtitle.length > ZERO) {
      const tempArray: NewArray = {}; // Provide type information
      subtitle.forEach((item: any, index: number) => {
        tempArray[`text${index + 1}`] = item.subheading;
      });
      setNewArray(tempArray);
    }
  }, [subtitle]);

  return (
    <>
      <section className="relative 2xl:pt-24">
        <div className="absolute -inset-y-20 h-auto z-10 w-full">
          {/* <ImageCarouselAbout slides={slides} width={1464} height={717} /> */}
          <MediaDisplay
            isVideo={isVideo}
            isImage={isImage}
            imageCarouselType="about"
            slides={slides}
            className=""
            videoClassName=""
            video={video}
          />
        </div>
        <div className="mx-auto container z-20 relative grid grid-cols-1 my-auto md:grid-cols-1 2xl:grid-cols-2  xl:gap-1 md:gap-5 h-auto md:p-10 p-4">
          {/* ***About-banner*** */}
          <div className="flex flex-col lg:ml-56 md:flex-row  xl:mt-[20rem] mt-[28rem]">
            <div className="bg-white z-10 md:p-10  p-4 2xl:h-[606px] lg:w-[693px]  md:w-[670px] w-full">
              <div className="flex items-center">
                <div className="w-40 h-[57px] text-black lg:text-[45px] md:text-[38px] text-[24px] font-medium font-optima uppercase leading-[43.29px]">
                  {title}
                </div>
                <div className="flex-grow h-[0px] w-[294px] border-b-1 border-gray-600 ml-2 mx-[35rem]" />
              </div>
              <div className="text-justify text-black lg:text-[40px] md:text-[32px] text-[20px] mb-2 font-medium font-optima ">
                {newArray.text1}
              </div>
              {/* <div className="md:w-[294px] w-[100px] h-[0px] border absolute xl:top-[27em] md:top-[17rem] xl:left-[29rem] md:left-[15rem] border-gray-500"></div> */}
              <div
                className="font-optima md:max-h-[446px] max-h-[222px] text-justify text-black md:text-lg text-md max-w-[60rem] font-medium leading-8 overflow-hidden"
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AboutBanner;

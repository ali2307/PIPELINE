"use client";

import React from "react";
import { useStore } from "./../../../store/index";
import { ZERO } from "@/app/utils/constants";
import dynamic from "next/dynamic";

const ImageCarouselExplorer = dynamic(
  () => import("../../components/imgCarouselExplorer/page")
  // { loading: () => <div>Loading carousel...</div> }
);
const VideoPlayer = dynamic(() => import("../videoPlayer/page"), {
  ssr: false,
  // loading: () => <p>Loading...</p>,
});
const ProjectViewBanner: React.FC = () => {
  const { title, content, slides, isImage, isVideo, video } = useStore(
    (state) => state.projectViewBanner
  );
  return (
    <>
      <section className="relative">
        <div className="relative inset-0 h-full w-full z-10">
          {isImage && (
            <ImageCarouselExplorer
              slides={slides}
              width={1440}
              height={585}
              className="relative w-full md:h-[610px] h-[345px]  bg-cover bg-no-repeat object-cover brightness-50"
            />
          )}
          {isVideo && (
            <VideoPlayer
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL_S3}${video?.[0]?.img_md_url}`}
              className="relative w-full 2xl:h-[1080px] md:h-[610px] h-[372px] object-cover bg-cover bg-no-repeat"
            />
          )}

          {slides?.length > ZERO && (
            <div className="items-center justify-center h-full sm:h-auto md:mt-[58px] mt-6 mx-auto">
              <div className="container absolute flex flex-col text-center inset-y-0 inset-x-0 md:top-[33%] left-0 top-[10.5rem] mx-auto md:w-[614px]">
                <div className=" md:h-[205px] md:w-[205px] flex items-center item md:border-2 md:border-[#005c62]">
                  <div className="flex justify-center items-center md:w-[700px] w-full mx-auto">
                    <h3 className="md:w-[618px]  text-white md:text-[40px] text-[20px]  md:text-start font-normal font-optima lg:leading-[3.5rem] md:leading-[3rem] leadng-[1.5rem] mx-8 my-5 shadow">
                      WELCOME TO
                      <div className="absolute md:left-[19rem] md:top-[3.4rem] md:w-[349px] uppercase h-[0px] md:border md:border-white">
                        <span className="absolute right-[-4.75rem] -top-8 w-[65px] h-[65px] bg-[#005c62] rounded-full hidden 2xl:block shadow" />
                      </div>
                      <br />
                      <span className="h-[86px] overflow-hidden w-full text-white md:text-[46px] lg:text-[74px] text-[22px] uppercase text-start font-bold font-optima shadow ">
                        {title}
                      </span>
                      {/* <h2 className="md:w-[614px] md:h-[86px] h-auto w-full text-white md:text-[74px] text-[22px] overflow-hidden uppercase text-start font-bold font-optima shadow mb-5 ">
                   
                    {title}
                    </h2> */}
                      <p
                        className="text-white lg:text-[40px] md:text-[32px] text-[20px] sm:max-w-[270px] overflow-hidden  sm:leading-6 uppercase "
                        dangerouslySetInnerHTML={{
                          __html: content,
                        }}
                      ></p>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default ProjectViewBanner;

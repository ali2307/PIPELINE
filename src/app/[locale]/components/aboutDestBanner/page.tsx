"use client";
import React from "react";
import { useStore } from "./../../../store/index";
import dynamic from "next/dynamic";
import { ZERO } from "@/app/utils/constants";

const ImageCarouselExplorer = dynamic(
  () => import("../imgCarouselExplorer/page"),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);
const AboutDestBanner: React.FC = () => {
  const { title, content, slides } = useStore(
    (state) => state.aboutDestinationBanner
  );

  return (
    <>
      <section
        className="flex flex-grow h-full flex-col justify-center items-center pt-5 lg:pt-12 md:pt-10 pb-4 mt-0 w-full relative"
        id="image-section"
      >
        <div className="absolute z-20 flex lg:top-[32rem] md:top-[32rem] top-[16rem] justify-center items-center mx-auto sm:shadow">
          <div className="w-full md:max-w-[670px] bg-white flex flex-col justify-center items-center p-4">
            <div className="text-center text-black text-2xl pt-4 lg:text-[35px] md:text-[28px] font-medium font-optima uppercase leading-tight max-w-xl max-h-24 overflow-hidden md:leading-[38.48px]">
              {title}
            </div>
            <div className="w-[96%] h-0.5 bg-zinc-300/50 mx-auto my-4"></div>
            <div className="text-center text-stone-600 text-lg lg:text-3xl md:text-2xl font-normal font-optima uppercase leading-tight max-w-2xl max-h-24 overflow-hidden md:leading-[28.86px]">
              <p
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              ></p>
            </div>
          </div>
        </div>
        {slides.length > ZERO ? (
          <div className="relative w-full h-full z-0  mb-10">
            <ImageCarouselExplorer
              slides={slides}
              width={1920}
              height={646}
              className="relative w-full md:h-[610px] h-[345px]  bg-cover bg-no-repeat object-cover"
            />
          </div>
        ) : (
          <div className="w-full md:h-[646px] h-full"></div>
        )}
      </section>
    </>
  );
};
export default AboutDestBanner;

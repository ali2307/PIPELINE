"use client";
import React from "react";
import ImageCarouselExplorer from "../imgCarouselExplorer/page";
import { useStore } from "./../../../store/index";

const PropertyBanner: React.FC = () => {
  const { title, content, slides } = useStore((state) => state.propertyBanner);
  return (
    <>
      <section>
        <div className="flex justify-center items-center">
          <div className="relative h-auto z-0 w-full">
            {/* <div className="bg-[#aaa5a5] h-[585px] w-full"></div> */}
            <ImageCarouselExplorer
              slides={slides}
              width={1920}
              height={585}
              className="relative w-full md:h-[610px] h-[345px]  bg-cover bg-no-repeat object-cover brightness-50"
            />
          </div>
          <div className="absolute pt-4 2xl:pt-24 z-10 mx-auto md:top-[30%] top-[25%]">
            <h6
              className="font-normal lg:text-md text-sm  text-white grid justify-center items-center text-center uppercase"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            ></h6>
            <h2 className="lg:text-5xl md:text-3xl leading-tight font-bold  text-2xl text-center text-white flex justify-center items-center mb-6 md:mb-10">
              {title}
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};
export default PropertyBanner;

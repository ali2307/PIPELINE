"use client";
import React from "react";
import Image from "next/image";
import Serchbanner from "./../../../assets/img/search-prop.jpg";

const SearchBanner: React.FC = () => {
  return (
    <>
      <div className="relative mx-auto  w-full title  pb-4">
        <div className="flex flex-row g-4 ">
          <Image
            src={Serchbanner}
            className="w-full md:h-[589px] h-[250px] bg-cover relative object-cover "
            alt=""
            width={1920}
            height={589}
          />
        </div>
        <div className="absolute text-center text-white 2xl:text[80px] xl:text-[64px] lg:text-[45px] md:text-[50px] text-[24px] max-w-[30.5rem] font-normal font-optima lg:leading-[60px] md:leading-[52px] leading-[24px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Properties for Rent in UAE
        </div>
      </div>
    </>
  );
};
export default SearchBanner;

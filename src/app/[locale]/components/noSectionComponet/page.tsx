"use client";
import React from "react";

const NoSection: React.FC = () => {
  return (
    <>
      <section
        className="flex flex-col justify-center items-center pt-5 lg:pt-10 md:pt-40 mt-0 w-full relative"
        id="image-section"
      >
        <div className="relative z-20 flex lg:top-[20rem] md:top-[10rem] top-[22rem] justify-center items-center mx-auto">
          <div className="w-full max-w-[750px] bg-white flex flex-col justify-center items-center p-4">
            <div className="text-center text-black text-[16px] pt-4 md:text-[30px] font-medium font-optima leading-tight max-h-24 overflow-hidden md:leading-[38.48px]">
              <h2>Sections are inactive</h2>
              <p>No sections available to display at the moment</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default NoSection;

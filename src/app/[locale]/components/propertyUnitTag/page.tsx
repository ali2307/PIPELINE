"use client";
import React from "react";

const PropertyUnitTag: React.FC = () => {
  return (
    <>
      <div className="lg:w-[540px] w-full h-[0px] border border-[#f1f1f1] my-3" />
      <div className="property-tags">
        <h4 className="text-black text-sm text-start font-medium  pb-4">
          Property Tags
        </h4>
        <div className="flex gap-4">
          <div className="lg:w-[101px] w-full  h-[22px] relative">
            <div className="lg:w-[101px] w-full  h-[22px] left-0 top-0 absolute rounded border border-[#575656]"></div>
            <h4 className=" top-[2px] absolute text-[#2d2d2d] text-sm font-normal md:px-6 px-1">
              Building
            </h4>
          </div>
          <div className="lg:w-[101px] w-full  h-[22px] relative">
            <div className="lg:w-[101px] w-full h-[22px] left-0 top-0 absolute rounded border border-[#575656]"></div>
            <h4 className="top-[2px] absolute text-[#2d2d2d] text-sm font-normal md:px-6 px-1">
              Building
            </h4>
          </div>
          <div className="lg:w-[101px] w-full  h-[22px] relative">
            <div className="lg:w-[101px] w-full  h-[22px] left-0 top-0 absolute rounded border border-[#575656]"></div>
            <h4 className="top-[2px] absolute text-[#2d2d2d] text-sm font-normal md:px-6 px-1">
              Building
            </h4>
          </div>
          <div className="lg:w-[101px] w-full h-[22px] relative">
            <div className="lg:w-[101px] w-full  h-[22px] left-0 top-0 absolute rounded border border-[#575656]"></div>
            <h4 className="top-[2px] absolute text-[#2d2d2d] text-sm font-normal md:px-6 px-1">
              Building
            </h4>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="lg:w-[540px] w-full h-[0px] border border-[#f1f1f1] my-3" />
    </>
  );
};
export default PropertyUnitTag;

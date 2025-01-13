"use client";
import React from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";
import { ZERO } from "@/app/utils/constants";
import bgImage from "./../../../assets/img/com-view-bg.svg";

const CommunityViewAbout: React.FC = () => {
  const { title, content, slides } = useStore(
    (state) => state.communityViewAbout
  );

  return (
    <>
      <div className="flex flex-col md:flex-row  md:px-0 px-3 md:mb-12">
        {/* Left Section: Text Content */}
        <h1 className="lg:min-w-[480px] lg:max-w-[480px] w-full overflow-hidden text-black lg:text-[38px] text-[25px] font-normal font-optima md:text-start text-center uppercase lg:leading-[47.30px] leading-[35px] hidden sm:block my-6">
          {title}
        </h1>
        <div className="relative lg:w-1/2 w-full flex lg:justify-end sm:order-2 ">
          <div className="relative w-full inset-0 h-auto z-0 hidden md:block">
            <Image
              alt=""
              src={bgImage}
              id="dynamic-image"
              className="w-full lg:h-[786px] bg-cover object-cover pointer-events-none"
            />
          </div>
          <div className="relative md:absolute xl:mx-16 md:my-36 my-4 mx-0 sm:order-2">
            <h1 className="lg:min-w-[480px] lg:max-w-[480px] w-full overflow-hidden text-black lg:text-[38px] text-[24px] font-normal font-optima md:text-start text-center uppercase lg:leading-[47.30px] leading-[35px] sm:hidden mx-4">
              {title}
            </h1>
            {/* <div className="md:w-[175px]  w-full h-[18px] bg-black my-4">
              <span className=" mx-44 md:w-[416px] h-[0px] w-full border border-b rotate-180 border-black" />
            </div> */}
            <span className="lg:flex items-center my-4 sm:hidden md:hidden mx-4">
              <hr className="lg:w-28 md:h-5 bg-black"></hr>
              <hr className="lg:w-60 h-[2.5px] bg-black" />
            </span>

            {/* <span class="flex items-center my-4"><hr class="lg:w-28 h-5 bg-black"><hr class="lg:w-60 h-[2.5px] bg-black"></span> */}
            <p
              className="lg:min-w-[511px] lg:max-w-[511px]  md:min-h-[340px] md:max-h-[340px] overflow-hidden text-justify text-black text-[15px] font-normal font-['DM Sans'] mx-4"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            ></p>
          </div>
        </div>

        <div className="md:w-1/2 w-full h-full sm:px-3 sm:order-1">
          {slides?.length > ZERO && (
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${slides[0].img_md_url}`}
              className="w-full md:min-h-[786px] md:max-h-[786px] min-h-[365px] max-h-[365px] overflow-hidden  bg-cover object-cover"
              alt=""
              width={1048}
              height={786}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default CommunityViewAbout;

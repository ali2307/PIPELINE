"use client";

import React from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";

const ProjectViewNeighbourhood: React.FC = () => {
  const { title, content, slides } = useStore(
    (state) => state.projectViewUpcoming
  );

  return (
    <>
      <section>
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="container relative bg-white md:py-8 pt-10 pb-16 mx-auto">
            <div className="2xl:w-[1373px] w-full p-4 mx-auto">
              <div className="flex flex-wrap flex-col xl:flex-row sm:flex-nowrap relative">
                <div className="lg:col-span-10 col-span-12 relative">
                  <div className="absolute w-[92px] h-[649px] top-[39rem] left-16 origin-top-left rotate-180 border border-black hidden 2xl:block" />
                  <Image
                    width={1058}
                    height={596}
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${slides?.[0]?.img_md_url}`}
                    alt="Beachfront"
                    className="md:w-[1058px] md:min-h-[596px] md:max-h-[596px] overflow-hidden relative w-[335px] h-auto object-cover"
                  />
                  <div className="absolute md:w-[822px] w-full h-[89px] md:right-[-1136px] right-0 bottom-[-7rem] origin-top-left rotate-180 border border-black hidden 2xl:block" />
                  <div className="relative top-[50%] left-[50%] transform -translate-y-1/2 -translate-x-1/2">
                    <div className="absolute lg:w-[368px] w-full h-[155px] xl:right-[-32rem] xl:top-[-34rem] lg:top-[-19em] lg:right-[-24rem] origin-top-left rotate-180 border border-black hidden xl:block" />
                    <Image
                      width={661}
                      height={367}
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${slides?.[1]?.img_md_url}`}
                      alt="Family on Beach"
                      className="md:hidden lg:block 2xl:w-[661px] lg:left-[30rem]  md:min-h-[367px] md:max-h-[367px] absolute xl:top-[-42.5rem] lg:top-[-25.5rem] md:top-[40%] 2xl:left-[56.5rem] xl:left-[45.5rem] z-10 w-full h-auto object-cover overflow-hidden max-w-lg "
                    />
                  </div>
                </div>
                <div className="lg:col-span-2 col-span-12 relative">
                  <div className="absolute top-[19%] lg:left-[25%] left-[2%]">
                    <div className="flex md:flex-row flex-col">
                      <h2 className="lg:w-[400px] lg:-top-[5rem] xl:right-[-8rem]  2xl:right-[-18rem] lg:absolute sm:relative 2xl:min-w-[274px] 2xl:max-w-[274px] xl:min-w-[204px] xl:max-w-[205px]  text-black lg:text-xl xl:text-xl 2xl:text-3xl md:text-2xl text-start font-normal font-optima uppercase 2xl:ml-[2rem] overflow-hidden">
                        {title}
                      </h2>
                      <div className="absolute md:w-[92px] w-full 2xl:right-[-372px] right-[-180px] -top-[108px] h-[92px] bg-[#eff6fa] hidden xl:block">
                        <div className="absolute md:w-[92px] w-full h-[92px] top-28 left-16 origin-top-left rotate-180 border border-black hidden xl:block" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}

        <div className="sm:block hidden">
          <div className="container relative bg-white py-4 mx-auto">
            <div className="w-full p-1">
              {/* First Image */}
              <Image
                width={600}
                height={340}
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${slides?.[0]?.img_md_url}`}
                alt="Beachfront"
                className="w-[445px] min-h-[190px] max-h-[199px] overflow-hidden object-cover mb-4"
              />
              {/* Second Image */}
              <div className="absolute top-24 right-0">
                <Image
                  width={600}
                  height={340}
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${slides?.[1]?.img_md_url}`}
                  alt="Family on Beach"
                  className="min-w-[210px] max-w-[210px] min-h-[122px] max-h-[122px] overflow-hidden object-cover mb-4"
                />
              </div>
              {/* Title and Content */}
              <div className="absolute top-32 left-5 text-start mt-4">
                <h2 className="left-4 min-w-5 max-w-[15rem] overflow-hidden text-md font-bold uppercase">
                  {title}
                </h2>
                {/* <p className="mt-2 text-gray-600">{content}</p> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectViewNeighbourhood;

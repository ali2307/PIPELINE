"use client";
import React, { Fragment } from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";
const CommunityViewSustanability: React.FC = () => {
  const { title, content, slides } = useStore(
    (state) => state.communityViewSustanability
  );

  return (
    <div className="2xl:w-[1320px] xl:w-[1263px] lg:w-[998px]  w-full  mx-auto  ">
      <div className="grid md:grid-cols-3 gap-2 grid-rows-1  md:h-[816px] h-auto px-3">
        <div className="relative  grid md:gap-2 md:grid-rows-2 grid-rows-2">
          {slides?.slice(0, 2).map((image: any, index: number) => (
            <div className="flex-1 relative bg-white grid-cols-1" key={index}>
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`}
                className="md:w-[442px] md:h-[202px] object-cover absolute h-full w-full"
                layout="fill"
                alt="errr.png"
              />
            </div>
          ))}
        </div>
        {slides?.slice(2, 3).map((image: any, index: number) => (
          <div className="relative grid-cols-1" key={index}>
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`}
              className="!w-[393px] object-cover absolute h-full"
              layout="fill"
              alt="errr.png"
            />
          </div>
        ))}
        <div className="mt-8">
          <h1 className="xl:w-[400px] lg:w-[300px] w-full md:min-h-[156px] max-h-[156px] overflow-hidden text-center md:text-start text-black lg:text-[38px]  text-[25px] font-normal font-optima uppercase lg:leading-[39.7px] xl:leading-[45.70px]">
            {title}
          </h1>
          <span className="flex items-center">
            <hr className="w-28 h-5 bg-black"></hr>
            <hr className="md:w-56 w-full h-[2.5px] bg-black" />
          </span>
          <p
            className=" w-full  md:min-h-[236px] md:max-h-[236px] overflow-hidden text-justify text-black md:text-[22px] text-[18px] font-normal font-optima mt-5 leading-[23.70px]"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></p>
        </div>
        <div className="h-80 grid gap-2 md:grid-cols-2 grid-cols-2">
          <div className="flex-1 relative ">
            {slides?.slice(3, 4).map((image: any, index: number) => (
              <Fragment key={index}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`}
                  className="md:w-[226px] md:h-[356px] object-cover absolute h-full w-full"
                  layout="fill"
                  alt="errr.png"
                />
              </Fragment>
            ))}
          </div>
          <div className="flex-1 h-80 grid gap-2 md:grid-rows-3 grid-rows-3">
            {slides?.slice(4, 7).map((image: any, index: number) => (
              <div className="relative" key={index}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`}
                  className="md:w-[208px] md:h-[156px] bg-cover object-cover absolute h-full w-full"
                  layout="fill"
                  alt="errr.png"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="h-80 grid gap-2 md:grid-rows-2 grid-rows-2">
          {slides?.slice(7, 9).map((image: any, index: number) => (
            <div className="flex-1 relative bg-white" key={index}>
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`}
                className="md:w-[387px] md:h-[184px] object-cover absolute h-full w-full"
                layout="fill"
                alt="errr.png"
              />
            </div>
          ))}
        </div>

        <div className="h-80 relative min-w-full grid-cols-1 ">
          {slides?.slice(9, 10).map((image: any, index: number) => (
            <Fragment key={index}>
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`}
                className="md:w-[475px] md:h-[356px] object-cover absolute h-full w-full"
                layout="fill"
                alt="errr.png"
              />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityViewSustanability;

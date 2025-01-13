"use client";
import React from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";
import { ZERO } from "@/app/utils/constants";

const AboutChairman: React.FC = () => {
  const { title, content, slides } = useStore((state) => state.aboutChairman);
  return (
    <>
      <section className="container mx-auto md:pb-4 pb-24 mt-2 mb-10">
        <div className="flex xl:w-[1252px] justify-center items-center md:justify-start md:items-start w-full lg:py-6 lg:grid-cols-12 mx-auto ">
          <div className="lg:mt-0 lg:flex lg:justify-center mx-0 lg:mx-10 relative">
            {slides.length > ZERO ? (
              slides?.map((image: any) => (
                <div key={image.id}>
                  <Image
                    alt=""
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image.img_md_url}`}
                    width={833}
                    height={516}
                    className="md:w-[833px] md:h-[516px] h-full w-full md:-left-10 left-full"
                  />
                </div>
              ))
            ) : (
              <div className="md:w-[833px] md:h-[516px] h-full w-full md:-left-10 left-full" />
            )}
            {/* actual-img-size: w-[834px] h-[557px] */}
            <div className="md:w-[600px]  absolute bottom-0 2xl:left-72 lg:right-[300px] text-center transform lg:translate-x-96  translate-4 md:translate-y-24 translate-y-32 md:h-[232px] h-100 bg-white md:pb-36 pb-0 md:pt-8 pt-2 md:px-8 px-4">
              <div className=" text-black lg:text-[26px] md:text-[24px] text-lg tracking-normal font-medium text-justify  md:max-w-[558px]  font-optima max-h-[136px] uppercase leading-[28.86px] pb-2">
                <p
                  className="font-pop"
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                ></p>
              </div>
              <div className="text-neutral-500 text-base font-normal font-optima uppercase md:pt-3  text-start leading-none mt-2">
                {title}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AboutChairman;

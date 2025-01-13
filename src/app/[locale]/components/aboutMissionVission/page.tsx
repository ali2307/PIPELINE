"use client";
import React from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";
import { ZERO } from "@/app/utils/constants";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Define the AboutMissionVission component
const AboutMissionVission: React.FC = () => {
  const { final } = useStore((state) => state.aboutMissionVission);
  const mission = final?.mission;
  const vision = final?.vision;

  // Embla carousel initialization for mobile view
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true, // Enable looping
    },
    [Autoplay()]
  );

  return (
    <section className="py-30">
      <div className="container relative justify-center items-center bg-white py-12 sm:py-8 mx-auto md:px-2">
        <div className="flex md:flex-row flex-col gap-8 w-full justify-center items-center mx-auto">
          {/* Carousel for Mobile */}
          <div className="sm:block hidden">
            <div className="embla" ref={emblaRef}>
              <div className="embla__container flex">
                {mission && (
                  <div className="embla__slide w-[100%] flex-shrink-0">
                    <div className="h-30 rounded-lg flex flex-col justify-center lg:items-end">
                      {mission?.section_images?.length > ZERO &&
                        mission?.section_images?.map((image: any) => (
                          <div key={image.id}>
                            <Image
                              alt=""
                              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image.img_md_url}`}
                              width={603}
                              height={545}
                              className="lg:max-w-[603px] overflow-hidden w-full h-full lg:h-[545px]"
                            />
                          </div>
                        ))}
                      <div className="2xl:w-[603px] lg:h-[255px] bg-neutral-600 w-full flex flex-col lg:p-12 p-8">
                        <div className="text-white lg:text-[40px] md:text-3xl text-lg font-normal text-start font-optima max-w-xl min-h-12 max-h-12 uppercase overflow-hidden leading-[43.29px] ">
                          {mission?.section_heading}
                        </div>
                        <div
                          className="text-justify text-white md:text-lg text-md font-normal font-['DM Sans'] max-w-2xl md:max-h-[192px] md:min-h-[192px] min-h-[138px] max-h-[138px] overflow-hidden tracking-tighter capitalize leading-tight"
                          dangerouslySetInnerHTML={{
                            __html: mission?.content,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {vision && (
                  <div className="embla__slide w-[100%] flex-shrink-0">
                    <div className="h-30 rounded-lg flex flex-col justify-center lg:items-start">
                      {vision?.section_images?.length > ZERO &&
                        vision?.section_images?.map((image: any) => (
                          <div key={image.id}>
                            <Image
                              alt=""
                              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image.img_md_url}`}
                              width={603}
                              height={545}
                              className="lg:max-w-[603px] overflow-hidden w-full h-full lg:h-[545px]"
                            />
                          </div>
                        ))}
                      <div className="2xl:w-[603px] lg:h-[255px] w-full bg-neutral-600 flex flex-col lg:p-12 p-8">
                        <div className="text-white lg:text-[40px] md:text-3xl text-lg font-normal font-optima text-start uppercase max-w-xl min-h-12 max-h-12 overflow-hidden leading-[43.29px]">
                          {vision?.section_heading}
                        </div>
                        <div
                          className="text-justify text-white md:text-lg text-md font-normal font-['DM Sans'] tracking-tighter capitalize max-w-2xl md:max-h-[192px] md:min-h-[192px] min-h-[138px] max-h-[138px] overflow-hidden leading-tight"
                          dangerouslySetInnerHTML={{
                            __html: vision?.content,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Layout (Grid View) */}
          <div className="container relative justify-center items-center bg-white py-12 sm:py-8 mx-auto hidden md:block">
            <div className="flex md:flex-row flex-col gap-8 w-full justify-center items-center mx-auto">
              {mission && (
                <div className="h-30 rounded-lg flex flex-col justify-center">
                  {mission?.section_images?.length > ZERO &&
                    mission?.section_images?.map((image: any) => (
                      <div key={image.id}>
                        <Image
                          alt=""
                          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image.img_md_url}`}
                          width={603}
                          height={545}
                          className="xl:max-w-[645px] overflow-hidden w-full h-full lg:h-[545px]"
                        />
                      </div>
                    ))}
                  <div>
                    <div className="2xl:w-[603px] lg:h-[255px] bg-neutral-600 w-full flex  flex-col xl:p-12 p-8">
                      <div className="text-white lg:text-[40px] md:text-3xl text-lg font-normal text-start font-optima max-w-xl min-h-[62px] max-h-20 uppercase overflow-hidden leading-[43.29px] ">
                        {mission?.section_heading}
                      </div>
                      <div
                        className="text-justify text-white md:text-lg text-md font-normal font-['DM Sans'] max-w-2xl md:max-h-[190px] md:min-h-[190px] max-h-[140px] overflow-hidden tracking-tighter capitalize leading-tight"
                        dangerouslySetInnerHTML={{
                          __html: mission?.content,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              {vision && (
                <div className="h-30 rounded-lg flex flex-col justify-center ">
                  {vision?.section_images?.length > ZERO &&
                    vision?.section_images?.map((image: any) => (
                      <div key={image.id}>
                        <Image
                          alt=""
                          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image.img_md_url}`}
                          width={603}
                          height={545}
                          className="xl:max-w-[645px] overflow-hidden w-full h-full lg:h-[545px]"
                        />
                      </div>
                    ))}
                  <div>
                    <div className="2xl:w-[603px] lg:h-[255px] w-full bg-neutral-600 flex flex-col xl:p-12 p-8">
                      <div className="text-white  lg:text-[40px] md:text-3xl text-lg font-normal font-optima text-start uppercase max-w-xl min-h-[62px] max-h-20 overflow-hidden leading-[43.29px] pb-7">
                        {vision?.section_heading}
                      </div>
                      <div
                        className="text-justify text-white  md:text-lg text-md font-normal font-['DM Sans'] tracking-tighter capitalize max-w-2xl md:max-h-[190px] md:min-h-[190px] max-h-[140px] overflow-hidden leading-tight"
                        dangerouslySetInnerHTML={{
                          __html: vision?.content,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMissionVission;

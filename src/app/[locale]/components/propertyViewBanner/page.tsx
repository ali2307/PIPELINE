"use client";
import React, { Fragment, useCallback, useEffect } from "react";
import { useStore } from "./../../../store/index";
import { ZERO } from "@/app/utils/constants";
import ImageCarouselExplorer from "../imgCarouselExplorer/page";
import Link from "next/link";
import GridImageBanner from "../gridImageBanner/page";
import EmblaCarouselReact from "embla-carousel-react";
import PropBanner from "./../../../assets/img/prty-img.jpg";
import Image from "next/image";
import GridImageBannerWithCrousel from "../gridImageBannerWithCarousel/page";

const PropertyViewBanner: React.FC = () => {
  const { title, content, slides } = useStore(
    (state) => state.propertyViewBanner
  );
  const [emblaRef, emblaApi] = EmblaCarouselReact({
    loop: true,
    slidesToScroll: 1, // Move one slide at a time
    dragFree: false, // Disable free dragging
  });

  const nextClick = () => {
    if (emblaApi) emblaApi.scrollNext(); // Scroll to the next slide
  };
  const prevClick = () => {
    if (emblaApi) emblaApi.scrollPrev(); // Scroll to the previous slide
  };

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit(); // Reinitialize the carousel if needed
    }
  }, [emblaApi]);
  return (
    <>
      <div className="container relative mx-auto  w-full title p-20 pb-4 md:pl-24 pl-10">
        <h2 className="lg:text-[40px] md:text-[32px]  text-xl font-normal uppercase md:leading-[38.48px] leading-[22.48px] text-start font-optima md:max-h-[2.5rem] max-h-[4-5rem] mt-5 md:max-w-[50rem] overflow-hidden text-black 2xl:pl-20">
          {title}
        </h2>

        <div className="flex 2xl:pl-20">
          <h3 className="text-justify text-[18px] font-normal lg:text-4xl md:text-2xl pt-2 font-optima text-black min-w-0 grow md:max-h-[2.9rem] max-h-full overflow-hidden md:max-w-[35rem] max-w-[18rem] pr-4">
            <span
              className="relative inline-block"
              dangerouslySetInnerHTML={{
                __html: content || "Abu Dhabi United",
              }}
            />
            <span className="absolute bottom-6 sm:w-0 md:w-0 lg:w-[294px] h-[1px] bg-black mx-2"></span>
          </h3>
        </div>
      </div>
      {/* <div className="emblap" ref={emblaRef}>
        <div className="embla__containerp">
          {slides?.map((item: any, index: number) => (
            <div
              className="embla__slidep relative mt-32 group"
              key={index}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.img_md_url}`}
                alt=""
                className="relative w-full bg-cover object-cover"
                width={560}
                height={440}
              />
            </div>
          ))}
        </div>
    
        <button
          className="embla__prevp"
          onClick={prevClick}
          aria-label="Previous slide"
        >
          Prev
        </button>
        <button
          className="embla__nextp"
          onClick={nextClick}
          aria-label="Next slide"
        >
          Next
        </button>
      </div> */}
      <GridImageBannerWithCrousel slides={slides} />
      <div className="container mx-auto">
        <nav
          className="lg:pl-[18%] relative flex opacity-1 mx-auto md:py-0 md:pb-4 py-4 md:pt-4"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-optima font-normal text-[#807c7c] hover:text-sky-600 dark:text-gray-400 dark:hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  href="/property"
                  // href={`/project-view/${projectSlug}`}
                  className="hover:text-sky-600 font-optima text-sm font-normal text-[#807c7c]"
                >
                  Properties
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="text-sm font-normal font-optima text-[#807c7c]">
                  {title}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
};
export default PropertyViewBanner;

"use client";
import React from "react";
import { useStore } from "./../../../store/index";
import ImageCarouselAbout from "../imgCarouselAbout/page";
import Link from "next/link";
import GridImageBanner from "../gridImageBanner/page";
import GridImageBannerWithCrousel from "../gridImageBannerWithCarousel/page";

const UnitViewBanner: React.FC = () => {
  const { name, slides, propertyId } = useStore(
    (state) => state.unitViewBanner
  );
  return (
    <>
      <section className="relative lg:py-52 py-20">
        {/* <div className="mx-auto container z-20 relative grid grid-cols-1 my-auto  mb-8 md:grid-cols-1 2xl:grid-cols-2  xl:gap-1 md:gap-5 h-auto p-10  "> */}
        <div className="w-full md:mt-10 2xl:mt-16 mt-0 flex md:flex-col lg:flex-col 2xl:flex-row grid-cols-2 flex-col 2xl:gap-5 text-cyan-500 justify-center 2xl:mx-80 lg:mx-3  border-pink-900"></div>
        {/* </div> */}
        <div className="absolute inset-0 h-auto z-10 w-full">
          <GridImageBannerWithCrousel slides={slides} />
          {/* <GridImageBanner
            className={"lg:min-h-[584px] h-[304px]"}
            slides={slides}
          /> */}

          {/* <ImageCarouselAbout slides={slides} width={1464} height={717} /> */}
        </div>
      </section>
      <div className="container mx-auto">
        <nav
          className="xl:pl-[18.5%] lg:pl-[1.5%] relative flex opacity-1 mx-auto lg:py-2 pt-10 mt-36 2xl:mt-28"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center  md:text-sm text-xs font-optima font-normal text-[#807c7c] hover:text-sky-600 dark:text-gray-400 dark:hover:text-white"
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
                  href={`/property`}
                  className=" hover:text-sky-600 font-optima  md:text-sm text-xs font-normal text-[#807c7c]"
                >
                  Property
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
                <Link
                  href={`/property-view/${propertyId}`}
                  className="hover:text-sky-600  font-optima md:text-sm text-xs font-normal text-[#807c7c]"
                >
                  {name}
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
                <Link
                  href={``}
                  className=" hover:text-sky-600 font-optima  md:text-sm text-xs font-normal text-[#807c7c]"
                >
                  Unit
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
};
export default UnitViewBanner;

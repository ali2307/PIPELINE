"use client";
import React from "react";
import { useStore } from "./../../../store/index";
import { ONE } from "@/app/utils/constants";
import dynamic from "next/dynamic";
import Link from "next/link";

const VideoPlayer = dynamic(() => import("../videoPlayer/page"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const ImageCarouselExplorer = dynamic(
  () => import("../../components/imgCarouselExplorer/page")
  // { loading: () => <div>Loading carousel...</div> }
);
const CommunityViewBanner: React.FC = () => {
  const { title, slides, carditem, isImage, isVideo, video, projectSlug } =
    useStore((state) => state.communityViewBanner);
  return (
    <>
      <section className="relative">
        <div className="relative inset-0 h-full w-full z-10">
          {isImage && (
            <ImageCarouselExplorer
              slides={slides}
              width={1440}
              height={646}
              className="relative w-full md:h-[610px] h-[345px]  bg-cover bg-no-repeat object-cover brightness-50"
            />
          )}
          {isVideo && (
            <VideoPlayer
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL_S3}${video?.[0]?.img_md_url}`}
              className="w-full 2xl:h-[1080px] md:h-[610px] h-[372px] object-cover bg-cover bg-no-repeat"
            />
          )}

          <div className="items-center justify-center h-full sm:h-auto ">
            <div className="container absolute flex flex-col text-start h-[200px] inset-y-0 inset-x-0 md:top-[56%] xl:left-[-46rem] lg:left-[-22rem] top-[10rem] md:w-[614px] mx-auto ">
              <h2 className="text-white md:text-start text-center lg:text-[85px] md:text-[40px] text-[24px] font-semibold font-['DM Sans'] uppercase lg:leading-[78px] md:leading-[65px] md:pl-10">
                {title}
              </h2>
            </div>
          </div>
        </div>
        {/* Breadcrumbs */}
        <div className="bg-[#e5ebf1] relative">
          <nav
            className="container md:w-[1269px] w-full flex opacity-1 mx-auto py-3 relative"
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
                  {/* <span className="text-gray-500">/</span> */}
                  <Link
                    href={`/project-view/${projectSlug}`}
                    className="hover:text-sky-600 font-optima text-sm font-normal text-[#807c7c]"
                  >
                    Projects
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
                  {/* <span className="text-gray-500">/</span> */}
                  <span className="text-sm font-normal font-optima text-[#807c7c]">
                    {title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="h-auto bg-[#e5ebf1] flex items-center justify-center py-4">
          <div className="lg:w-[1130px] xl:w-[1263px] md:mx-8">
            <div className=" xl:w-[1260px]  w-full mx-auto">
              <div className="flex md:flex-row gap-16 sm:gap-4">
                {carditem?.length > ONE &&
                  carditem?.map((item: any, index: number) => (
                    <>
                      <div
                        className="xl:w-[615px] lg:w-[300px] md:w-[260px] sm:py-4"
                        key={index}
                      >
                        <div className="col-span-6">
                          <div className="w-full grid lg:grid-cols-3 grid-cols-1 lg:gap-x-8 items-center">
                            <div className="flex-row mb-5 border-right border">
                              <h3 className="text-black lg:text-[20px] text-[17px] font-bold font-['DM Sans']">
                                {item.property_type}
                                <br />
                              </h3>
                              <span className="md:text-lg text-sm">
                                Property Type
                              </span>
                              <div className="relative md:left-[9rem] top-[-15px] w-[27px] h-[0px] origin-top-right rotate-90 border border-white hidden  2xl:block"></div>
                            </div>
                            <div className="flex-col mb-5">
                              <h3 className=" text-black lg:text-[20px]  text-[17px]  text-left font-bold font-['DM Sans'] left-5">
                                {item.total_units}
                                <br />
                              </h3>
                              <span className="md:text-lg text-sm">
                                Total Units
                              </span>
                              <div className="relative md:left-[9rem] top-[-15px] w-[27px] h-[0px] origin-top-right rotate-90 border border-white hidden  2xl:block"></div>
                            </div>
                            <div className="flex flex-col mb-5">
                              <h3 className="text-black lg:text-[20px] text-[17px] font-bold font-['DM Sans']">
                                {item.unit_available}
                                <br />
                              </h3>
                              <span className="md:text-lg text-sm">
                                Unit Available
                              </span>
                            </div>
                            <div className="flex-row col-span-1 ">
                              <h3 className="text-black lg:text-[20px] text-[17px] font-bold font-['DM Sans']">
                                {item.property_size}
                                <br />
                              </h3>
                              <span className="md:text-lg text-sm">
                                Property Size
                              </span>
                              {/* <div className="relative md:left-[12rem] top-[-15px] w-[27px] h-[0px] origin-top-right rotate-90 border border-white hidden  2xl:block"></div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {carditem?.length - ONE !== index && (
                        <div className="flex justify-center items-center">
                          {/* <div className="w-0 lg:h-[172px] h-auto border-l border-black" /> */}
                          <div className="inline-block h-[278px] lg:h-[172px] min-h-[1em] w-0.5 self-stretch bg-gray-600 my-4"></div>
                        </div>
                      )}
                    </>
                  ))}
                {carditem?.length === ONE &&
                  carditem?.map((item: any, index: number) => (
                    <div className="w-full" key={index}>
                      <div className="col-span-12">
                        <div className="flex justify-between items-center">
                          <div className="relative w-full flex md:flex-row justify-center items-center sm:grid lg:grid-cols-12 grid-cols-3 md:gap-12 gap-x-4 gap-y-3">
                            <div className="flex-col ">
                              <h3 className="text-black lg:text-[22px] font-bold font-['DM Sans']">
                                {item.property_type}
                                <br />
                              </h3>
                              <span className="md:text-lg text-sm">
                                Property Type
                              </span>
                              <div className="relative md:left-[8rem] top-[-15px] w-[27px] h-[0px] origin-top-right rotate-90 border border-white hidden  2xl:block"></div>
                            </div>
                            <div className="flex-col flex ">
                              <h3 className="text-black lg:text-[22px] md:text-left font-bold font-['DM Sans']">
                                {item.total_units}
                                <br />
                              </h3>
                              <span className="md:text-lg text-sm">
                                Total Units
                              </span>
                              <div className="relative md:left-[5rem] top-[-15px] w-[27px] h-[0px] origin-top-right rotate-90 border border-white hidden  2xl:block"></div>
                            </div>
                            <div className="flex-col">
                              <h3 className="text-black lg:text-[22px] md:text-left  font-bold font-['DM Sans']">
                                {item.unit_available}
                                <br />
                              </h3>
                              <span className="md:text-lg text-sm">
                                Unit Available
                              </span>
                            </div>
                            <div className="flex-col col-span-2 ">
                              <h3 className="text-black lg:text-[22px] md:text-left  font-bold font-['DM Sans']">
                                {item.property_size}
                                <br />
                              </h3>
                              <span className="md:text-lg text-sm">
                                Property Size
                              </span>
                              <div className="relative md:left-[12rem] top-[-15px] w-[27px] h-[0px] origin-top-right rotate-90 border border-white hidden  2xl:block"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-b-2"></div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CommunityViewBanner;

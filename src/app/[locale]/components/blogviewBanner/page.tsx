"use client";
import React, { lazy, useEffect, useState } from "react";
import { useStore } from "@/app/store";
import Link from "next/link";
const ImageCarouselExplorer = lazy(() => import("../imgCarouselExplorer/page"));

interface NewArray {
  [key: string]: string | undefined; // Key is a string, value is a string or undefined
}

const BlogviewBanner: React.FC = ({}) => {
  const { title, created_at, subtitle, content, slides } = useStore(
    (state) => state.blogViewBanner
  );

  const [newArray, setNewArray] = useState<NewArray>({});

  useEffect(() => {
    if (subtitle && subtitle.length > 0) {
      const tempArray: NewArray = {}; // Provide type information
      subtitle.forEach((item: any, index: number) => {
        tempArray[`text${index + 1}`] = item.subheading;
      });
      setNewArray(tempArray);
    }
  }, [subtitle]);
  return (
    <>
      <main className="container bg-white mx-auto mt-24">
        <article className="w-full text-start lg:pl-20 pl-5 ml-0 p-3">
          <p className="text-sky-600 font-normal md:text-md text-sm custom-lg:mx-20 custom-3xl:mx-0 mx-auto">
            {created_at ? created_at : "June 13, 2024"}
          </p>
          <h1 className="text-2xl lg:text-[38px] md:text-[30px] font-normal uppercase text-black custom-3xl:mx-0 custom-lg:mx-20 mx-auto md:max-h-24 overflow-hidden md:leading-[44.78px] leading-[35.78px] mt-2 mb-3">
            {title}
          </h1>
          <div className="relative top-[21%]">
            <nav
              className="custom-lg:mx-20 container w-full flex opacity-1 relative"
              aria-label="Breadcrumb"
            >
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link
                    href="/"
                    className="inline-flex items-center text-xs font-optima font-normal text-[#474747] drop-shadow hover:text-sky-600 dark:text-gray-400 dark:hover:text-white"
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
                      href={`/blog`}
                      className="hover:text-sky-600 font-optima text-xs font-normal [text-[#474747] drop-shadow"
                    >
                      Blogs
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
                    <span className="text-xs font-normal font-optima text-[#474747] drop-shadow">
                      Blog view
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </article>
      </main>

      <section className="relative">
        <div className="mx-auto container z-20 relative grid grid-cols-1 my-auto  md:grid-cols-1 2xl:grid-cols-2 xl:gap-1 md:gap-5 h-auto"></div>

        <div className="inset-0 md:h-[610px] h-full z-10 w-full">
          <ImageCarouselExplorer
            slides={slides}
            width={1920}
            height={821}
            className="relative w-full md:h-[610px] h-[345px]  bg-cover bg-no-repeat object-cover"
          />
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 mx-auto">
          <div className="flex justify-center items-center md:min-h-0 h-full grow">
            <div className="lg:w-[960px] w-full xl:w-[1156px] flex-wrap  relative 2xl:bottom-28 lg:bottom-28 md:bottom-44 2xl:right-44 right-0 flex flex-col bg-white z-0 md:px-16 md:pt-10 px-4 pt-6 pb-6">
              <div className="flex-col">
                <div className="w-full flex-col">
                  <p className="text-black text-xl md:text-2xl lg:text-3xl xl:text-3xl max-h-md max-w-6xl font-normal font-optima leading-snug md:leading-10">
                    {newArray.text1}
                  </p>
                </div>

                <p
                  className="w-full pt-4 text-justify text-black text-md md:max-h-[942px] overflow-hidden max-h-full lg:text-lg font-normal md:max-w-4xl 2xl:max-w-6xl font-optima z-0"
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogviewBanner;

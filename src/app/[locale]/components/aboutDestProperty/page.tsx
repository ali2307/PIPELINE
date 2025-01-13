"use client";
import React from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";
import { ZERO } from "@/app/utils/constants";

const AboutDestProperty: React.FC = () => {
  const { title, content, carditem } = useStore(
    (state) => state.aboutDestination
  );
  return (
    <>
      <section className="container mx-auto p-4 md:p-6 lg:p-8 w-full max-w-[1390px] my-4">
        <div
          className="text-neutral-500 lg:text-3xl md:text-xl text-lg font-normal px-2 font-optima uppercase max-w-[28rem] md:ml-10 lg:ml-12 2xl:ml-10 leading-[20.86px]  overflow-hidden md:leading-[28.86px] "
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
        <div className="text-black lg:text-[45px] md:text-[28px] text-[20px] font-normal px-2 font-optima md:mb-10 mb-16 uppercase max-w-[31rem] max-h-20 md:ml-10 lg:ml-12 2xl:ml-10 overflow-hidden leading-[43.29px]">
          {title}
        </div>
        <div className="grid 2xl:w-[1335px] md:grid-cols-1 lg:grid-cols-2 grid-cols-1 w-full 2xl:gap-3 mx-auto">
          {carditem &&
            carditem.length > ZERO &&
            carditem.map((item: any, index: number) => (
              <div
                className="flex xl:justify-center xl:items-center lg:justify-start lg:items-start md:mb-32 mb-12"
                key={item.id}
              >
                <div className="relative w-full max-w-[642px] mx-auto">
                  <div className="overflow-hidden w-full h-full md:h-[390px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                      alt=""
                      className="w-full h-auto md:max-w-[645px] md:min-h-[390px] md:max-h-[390px]"
                      width={645}
                      height={390}
                    />
                  </div>
                  <div
                    className={`absolute top-[-4.5rem] md:top-6 ${
                      index % 2 === ZERO
                        ? "2xl:-left-6 lg:-left-6"
                        : "lg:-right-[1.5rem] "
                    }  w-full lg:w-[434px] h-[350px] md:h-[440px] bg-gray-100 bg-opacity-70 p-4 md:p-6 -z-10`}
                  >
                    <h1
                      className={`lg:text-[45px] md:text-[30px] text-[20px] absolute md:bottom-5 font-normal uppercase mt-2 text-center pb-0 pt-3 leading-[43.29px] max-w-[310px] max-h-14 overflow-hidden font-optima text-black ${
                        index % 2 === ZERO
                          ? "md:left-12 left-0"
                          : "md:right-12 right-0"
                      }`}
                    >
                      {item?.title}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};
export default AboutDestProperty;

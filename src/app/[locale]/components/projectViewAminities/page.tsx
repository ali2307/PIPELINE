"use client";
import React from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";

const ProjectViewAminities: React.FC = () => {
  const { title, carditem } = useStore((state) => state.projectViewAminities);
  return (
    <>
      <section className="relative w-full">
        <div className="inset-0  xl:w-[1230px] w-full mx-auto z-20 flex-wrap sm:flex-nowrap">
          <div className="flex flex-col items-center justify-center ">
            {/* Specifications */}
            <div className="relative flex flex-col justify-center items-center w-full ">
              <h2 className="text-black md:text-3xl text-[24px] font-normal font-optima  uppercase text-center mx-4 ">
                {title}
              </h2>
              <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-12 md:gap-x-[5rem] md:gap-y-[3.5rem] mb-[3.5rem] md:mt-20 mt-8 px-4 h-auto ">
                {carditem?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex md:flex-row flex-col items-center sm:justify-start"
                  >
                    <div className="md:w-44 h-12">
                      <Image
                        width={78}
                        height={41}
                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                        className="md:w-[78px] md:h-[41px] h-12  object-contain bg-cover"
                        alt={item?.name || "Icon"}
                      />
                    </div>
                    <div className="text-black md:min-w-[136px] md:max-w-[136px] w-full overflow-hidden text-base  md:text-start text-center font-normal font-optima">
                      {item.title}
                    </div>
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
export default ProjectViewAminities;

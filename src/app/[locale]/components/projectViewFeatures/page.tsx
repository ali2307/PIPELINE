"use client";

import React from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";

const ProjectViewFeatures: React.FC = () => {
  const { content, title, carditem, slides } = useStore(
    (state) => state.projectViewFeatures
  );
  return (
    <>
      <section className="container md:w-[1240px] flex-wrap sm:flex-nowrap mx-auto mb-6 ">
        <div className=" w-full flex md:flex-row flex-col mx-auto items-center justify-center md:gap-12 gap-6">
          <div className="">
            {/* Section Header */}
            <div className="flex items-center justify-center flex-col text-center md:pb-8">
              <h1 className="font-medium font-optima md:min-w-[38rem] md:max-w-[38rem] min-w-full uppercase overflow-hidden md:text-3xl text-xl leading-snug mx-3">
                {title}
              </h1>
              <p
                className="my-3 max-w-[80%] text-justify"
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              ></p>
            </div>

            {/* Icon Section */}
            <div className="lg:w-[920px] flex flex-col md:flex-row justify-between items-center mt-16 mx-auto">
              {/* Icon Box 1 */}

              {carditem?.slice(0, 3).map((item: any) => (
                <>
                  <div className="relative flex flex-col items-center  text-center md:p-5 p-8 lg:w-72 w-64 custom-border mb-12">
                    <Image
                      alt="city"
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                      width={130}
                      height={130}
                      className="move-image lg:w-[130px] w-24 h-24 md:h-[130px] top-5"
                    />
                    <p className="font-medium mt-8 md:min-w-44 md:max-w-48 min-h-12 max-h-12 overflow-hidden">
                      {item.title}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProjectViewFeatures;

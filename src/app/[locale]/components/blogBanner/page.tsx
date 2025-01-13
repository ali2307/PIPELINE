"use client";
import React from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";

const BlogBanner: React.FC = () => {
  const { title, slides } = useStore((state) => state.blogBanner);
  return (
    <>
      <section className="relative py-44 md:py-72 2xl:py-72">
        <div className="absolute inset-0 h-full w-full z-10">
          {slides?.map((image: any) => (
            <div key={image.id} className="h-full">
              <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
              <Image
                alt=""
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image.img_md_url}`}
                width={1920}
                height={625}
                className="md:h-[635px] h-[410px]  w-full object-cover bg-cover bg-no-repeat"
              />
            </div>
          ))}
        </div>
        <div className="relative flex items-center justify-center h-full sm:h-auto mt-[58px]">
          <h1 className="text-[25px] lg:text-6xl md:text-4xl font-normal text-white mb-3 font-optima text-center md:mt-20 mt-[100px] absolute inset-0 flex items-center justify-center z-20">
            {title}
          </h1>
        </div>
      </section>
    </>
  );
};
export default BlogBanner;

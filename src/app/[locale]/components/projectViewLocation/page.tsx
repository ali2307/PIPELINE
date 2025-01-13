"use client";
import React from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";

const ProjectViewLocation: React.FC = () => {
  const { title, content, carditem, slides } = useStore(
    (state) => state.projectViewLocation
  );
  return (
    <>
      <section className="my-6">
        <h2 className="text-black lg:text-[40px] md:text-[30px] text-[24px] text-center font-normal font-optima uppercase mb-3">
          {title}
        </h2>
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${slides?.[0]?.img_md_url}`}
          className="md:h-[1080px] h-[264px] w-full bg-cover object-cover"
          width={1080}
          height={1080}
          alt=""
        />
      </section>
    </>
  );
};
export default ProjectViewLocation;

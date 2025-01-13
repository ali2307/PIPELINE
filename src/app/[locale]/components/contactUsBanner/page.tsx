"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";

const ContactUsBanner: React.FC = ({}) => {
  const contactUsBanner = useStore((state) => state.contactUsBanner);

  return (
    <section className="relative bg-white">
      <Image
        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${contactUsBanner.slides[0]?.img_md_url}`}
        alt="Contact Us Banner"
        className="w-full h-auto md:max-h-[700px] md:min-h-[700px] min-h-[400px] opacity-50 object-cover"
        width={1920} // Use a more standard width for responsiveness
        height={1080} // Adjust height to maintain aspect ratio
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-opacity-50 text-gray-500 text-center p-4">
        <h1 className="text-center text-[#404040] text-xl md:text-4xl lg:text-5xl font-bold font-['DM Sans'] uppercase leading-tight">
          Contact Us
        </h1>
      </div>
    </section>
  );
};

export default ContactUsBanner;

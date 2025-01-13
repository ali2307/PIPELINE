"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface Specification {
  id: number;
  icon: string;
  value: string;
}

interface Item {
  id: number;
  file?: { img_md_url: string }[];
  rate: string;
  title: string;
  content: string;
  unit_specifications?: Specification[];
  area: string;
  redirection_url: string;
}

interface Item {
  item: [];
  slug: string;
  // Add other properties of Item as needed
}

interface Props {
  item: Item;
}

const PropertyCard: React.FC<Props> = ({ item }) => {
  return (
    <>
      {/* <motion.div
        className="flex-row relative"
        initial={{ opacity: 0, y: -100, rotateY: 90 }} // Start off-screen and rotated
        whileInView={{ opacity: 1, y: 0, rotateY: 0 }} // Fade in and reset rotation when in view
        transition={{
          duration: 1.5, // Duration for smooth transition
          ease: "easeInOut", // Smooth easing
        }}
      > */}
      <Link href={`${item?.redirection_url}/${item.id}`} key={item.id}>
        <div className="relative overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
            className="relative lg:w-[241px] w-full md:min-h-[470px] md:max-h-[470px] min-h-[300px] max-h-[300px] bg-cover object-cover transition-transform duration-500 hover:scale-110 overflow-hidden"
            alt=""
            width={500}
            height={400}
          />

          <div className="bg-gradient-to-b from-[#868b957a] to-black absolute md:bottom-0 bottom-[-1.25rem]">
            <svg
              width="900"
              height="108"
              viewBox="0 0 241 108"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hover:text lg:w-[241px] w-full"
            >
              <rect
                width="241"
                height="108"
                fill="url(#paint0_linear_7709_4479)"
              />
              <defs>
                {/* <linearGradient
                  id="paint0_linear_7709_4479"
                  x1="120"
                  y1="11.5"
                  x2="120.578"
                  y2="108"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-opacity="0" />
                  <stop offset="1" />
                </linearGradient> */}
              </defs>
            </svg>

            <div className="absolute md:bottom-8 bottom-[2.8rem]  mb-10 md:left-5 lg:left-2 2xl:text-xl  text-white  md:drop-shadow-md md:text-start text-start  overflow-hidden  md:max-w-60 font-bold md:text-lg text-[12px] sm:mx-1 ">
              {item?.title}
            </div>
            <span className="absolute bottom-0 sm:bottom-5 md:left-50 lg:mx-2 md:mb-12 mb-12 md:mx-5  text-white md:text-start text-start font-normal w-full md:max-h-[1.5rem] max-h-[1rem] max-w-52 overflow-hidden 2xl:text-base text-xs capitalize mx-1">
              <p
                dangerouslySetInnerHTML={{
                  __html: item?.content,
                }}
              ></p>
            </span>
            <a
              href=""
              className="absolute md:-bottom-16 -bottom-[3rem] left-50 lg:mx-2 mb-20  text-cyan font-normal md:leading-4 pt-1 2xl:text-sm text-xs md:mx-5 mx-1"
            >
              Click Here To View More
            </a>
          </div>
        </div>
      </Link>
      {/* </motion.div> */}
    </>
  );
};
export default PropertyCard;

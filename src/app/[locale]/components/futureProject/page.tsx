"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Line1 from "./../../../assets/img/line-1.png";
import { motion, Variants } from "framer-motion";
import { useStore } from "./../../../store/index";
import { ZERO } from "@/app/utils/constants";
import Link from "next/link";

interface Image {
  src: string;
  alt: string;
  img_md_url: any;
}

interface CustomizeButtonProps {
  id: number;
  parentID: number;
  title: string;
  content: string;
  slides: Image[];
  subtitle?: any[];
}

interface NewArray {
  [key: string]: string | undefined; // Key is a string, value is a string or undefined
}

const FutureProject: React.FC = () => {
  const { title, content, slides, subtitle, redirectionUrl } = useStore(
    (state) => state.homeFuture
  );
  const [newArray, setNewArray] = useState<NewArray>({});
  useEffect(() => {
    if (subtitle && subtitle.length > ZERO) {
      const tempArray: NewArray = {}; // Provide type information
      subtitle.forEach((item: any, index: any) => {
        tempArray[`text${index + 1}`] = item.subheading;
      });
      setNewArray(tempArray);
    }
  }, [subtitle]);
  return (
    <>
      <section className="py-30 pt-5">
        <h2 className="lg:text-[40px] text-2xl leading-tight font-bold md:mt-20 mt-5 text-center text-black mb-1">
          {title}
        </h2>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative py-0 bg-white md:py-16"
        >
          <div className="container grid grid-cols-1 md:grid-cols-2 mx-auto">
            <div className="w-full flex-wrap lg:w-full  pl-0 md:pl-32 2xl:pl-52 justify-center sm:grid sm:mb-8 lg:py-12 py-0">
              <h2 className="xl:text-4xl lg:text-3xl text-xl relative leading-tight mt-3 font-bold  lg:text-start text-center uppercase">
                {newArray.text1 ? newArray.text1 : "SUN RISE RESIDENTS"}
              </h2>
              {" "}
              <div className="pl-4 m custom-lg:pr-0 custom-3xl:pr-16">
                <Image
                  src={Line1}
                  alt=""
                  className="hidden 2xl:block ml-20 lg:ml-0 my-6"
                />
                <h2 className="xl:text-3xl lg:text-3xl text-lg text-[#2f2c29] leading-tight font-semibold md:mt-4 2xl:mt-2 md:mb-8 lg:text-start text-center">
                  {newArray.text2 ? newArray.text2 : "You are in Good Hands"}
                </h2>
                <motion.p
                  initial={{ opacity: 0, x: -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="2xl:mt-0 md:mt-1 xl:text-xl mb-4 lg:text-lg text-md font-sm lg:max-w-md max-w-[19rem] text-center max-h-48 overflow-hidden  leading-relaxed text-[#686563] lg:text-start "
                  dangerouslySetInnerHTML={{
                    __html: content
                      ? content
                      : "Torquatos nostros? quos dolores eos, qui dolorem ipsum per se texit, ne ferae quidem se repellere, idque instituit docere sic: omne animal, simul atque integre iudicante itaque aiunt",
                  }}
                ></motion.p>
                <div className="flex lg:justify-start justify-center pb-18 py-4 items-start">
                  <Link href={redirectionUrl ? redirectionUrl : ""}>
                    <div className="w-[211px] h-[70px] bg-sky-700 text-white rounded-tr-[18px]  flex justify-center items-center order-2">
                      Learn more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="ml-0">
              <div className="h-30 rounded-tl-[50px]">
                {slides && slides?.length > ZERO && (
                  slides?.map((image: any) => (
                    <div key={image.id}>
                      <Image
                        alt=""
                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image.img_md_url}`}
                        width={710}
                        height={657}
                        className=" md:h-[657px] h-full w-full bg-cover rounded-tl-[50px] object-cover"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};
export default FutureProject;

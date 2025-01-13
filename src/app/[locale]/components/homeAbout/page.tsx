"use client";
import React from "react";
import Image from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useStore } from "./../../../store/index";
import { ZERO } from "@/app/utils/constants";
import Link from "next/link";
import bgImage from "./../../../assets/img/bg-abt-1.svg";

interface Image {
  src: string;
  alt: string;
  img_md_url: any;
}

const HomeAbout: React.FC = () => {
  const { title, content, slides, redirectionUrl } = useStore(
    (state) => state.homeAbout
  );

  return (
    <section className="relative mx-auto flex-wrap sm:flex-nowrap ">
      <div className="relative flex flex-col md:flex-row">
        {/* Left Section: Image Content */}
        <div className="relative lg:w-[57%] flex items-center md:justify-end md:py-12 pt-12 px-4">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {slides &&
                slides.length > ZERO &&
                slides.map((image: any) => (
                  <div key={image.id}>
                    <Image
                      alt=""
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image.img_md_url}`}
                      width={656}
                      height={645}
                      className="relative md:w-[608px] md:min-h-[645px] md:max-h-[645px] h-full px-1.625 pt-6 p-4"
                    />
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Section: Text and Button */}
        <div className="md:w-1/2 w-full h-full sm:px-1">
          <div className="absolute sm:grid flex sm:flex-col flex-col sm:mx-10 md:mt-44 md:ml-8 z-10">
            <AnimatePresence>
              <motion.h2
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="lg:text-[44px] md:text-[25px] md:max-w-[28rem] text-2xl leading-tight sm:max-w-2xl font-bold mt-4 sm:text-center lg:text-start mb-7 text-black"
              >
                {title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="mt-2 lg:text-lg font-normal sm:text-justify mb-30 opacity-60 lg:text-start max-h-[10.5rem] leading-loose text-gray-600 lg:min-w-[352px] lg:max-w-[352px] overflow-hidden sm:max-w-2xl"
                dangerouslySetInnerHTML={{ __html: content }}
              ></motion.p>
            </AnimatePresence>

            <Link
              href={redirectionUrl || ""}
              className="relative w-[211px] h-[70px] flex justify-center items-center mt-8 text-[17px] font-bold text-white rounded-tr-[18px] bg-[#0670B1] overflow-hidden group md:mx-0 mx-auto"
            >
              <span className="absolute inset-0 bg-[#005a8d] -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0"></span>
              <span className="relative z-10 flex items-center">
                Learn More
                <svg
                  className="rtl:rotate-180 w-3.5 h-3 ms-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
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
              </span>
            </Link>
          </div>

          {/* Background Image Section */}
          <div className="relative w-full inset-0 h-auto z-0">
            <Image
              alt=""
              src={bgImage}
              id="dynamic-image"
              className="w-full lg:h-[740px] h-[430px] md:h-[740px] bg-cover object-cover pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomeAbout;

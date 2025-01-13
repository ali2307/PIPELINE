"use client";
import React, { Fragment } from "react";
import { useStore } from "../../../store/index";
import dynamic from "next/dynamic";
import { ZERO } from "@/app/utils/constants";
import { motion, AnimatePresence } from "framer-motion";
import LearnMoreButton from "../learnMoreButton/page";

const PropertyCard = dynamic(() => import("../propertyCard/page"), {
  ssr: false, // Disable server-side rendering if you want the component to be client-side only
  // loading: () => <div>Loading...</div>, // Optional: Custom loading component
});

const HomeProperty: React.FC = () => {
  const { title, content, redirectionUrl, carditem } = useStore(
    (state) => state.homeProperty
  );

  if (carditem?.length === ZERO) {
    return null;
  }
  return (
    <>
      <section className="bg-gray-100 relative px-4 lg:px-16 xl:px-14 custom-lg:px-72 custom-3xl:px-56 py-8 md:py-8">
        <div className="container mx-auto">
          <h6 className="font-normal lg:text-lg sm:text-xl text-black uppercase text-center">
            <p
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            ></p>
          </h6>
          <h2 className="2xl:text-[44px] text-2xl lg:text-4xl leading-tight font-bold  text-center text-black mb-6 md:mb-12">
            {title}
          </h2>
          <div className="container xl:w-[1073px] w-full mx-auto">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-4 w-full justify-center items-center mx-auto">
              <AnimatePresence>
                {carditem?.map((item: any, index: number) => (
                  <Fragment key={index}>
                    <PropertyCard item={item} />
                  </Fragment>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex justify-center md:pb-14 md:pt-10 items-center mt-8">
            {/* <Link href={redirectionUrl || ""}>
              <div className="before:ease relative h-12 w-40 overflow-hidden border border-green-500 shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40 w-[211px] h-[70px] bg-sky-700 text-white rounded-tr-[18px]  ml-0 flex justify-center mr-2 items-center ">
                Explore!
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
            </Link> */}
            <LearnMoreButton
              redirectionUrl={redirectionUrl}
              buttonText="Explore !"
              buttonStyles={"bg-[#0670b1] text-white  text-[17px] font-bold"}
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default HomeProperty;

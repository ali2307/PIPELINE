"use client";

import React, { useState } from "react";
import { useStore } from "../../../store/index";

const FaqList: React.FC = () => {
  const { section_heading, child_sections } = useStore(
    (state) => state.faqListing
  );

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <section className="max-w-5xl mx-auto sm:py-20 py-24">
        <div className="flex items-center justify-center flex-col gap-y-2 py-5">
          <h2 className="text-[#404040] text-xl md:text-3xl lg:text-4xl  max-w-[730px] font-bold text-center py-5 px-4">
            {section_heading}
          </h2>
        </div>

        <div className="mx-auto w-full max-w-5xl rounded-lg bg-white pb-10 px-6">
          {child_sections.map((item: any, index: any) => (
            <div
              key={index}
              className="border-t border-b border-l-0 border-r-0 border-gray-300 py-12"
            >
              <button
                className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none  "
                onClick={() => handleToggle(index)}
              >
                <span className="md:w-[463px] w-full md:h-[26px] text-[#268cca] md:text-xl text-lg font-bold font-['DM Sans'] leading-tight capitalize">
                  {item.title}
                </span>
                <div className="flex">
                  <div className="p-2">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 24 24"
                      className={`mt-1.5 md:mt-0 flex-shrink-0 h-5 w-5 text-[#5B5675] transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z" />
                    </svg>
                  </div>
                </div>
              </button>

              <div
                className={`answer pt-8 text-sm lg:text-base text-[#77837e] font-medium ${
                  openIndex === index ? "block" : "hidden"
                }`}
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FaqList;

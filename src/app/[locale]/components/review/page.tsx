"use client";
import React from "react";
import ReviewForm from "../reviewForm/page";
import { useStore } from "./../../../store/index";
import Image from "next/image";
import { ZERO } from "@/app/utils/constants";

const Review: React.FC = () => {
  const { title, content, slides, subtitle, carditem, unitId } = useStore(
    (state) => state.unitReview
  );
  return (
    <>
      {/* <section className="container mx-auto p-4 ">
        <div className="xl:w-[1102px] lg:w-[930px] w-full mx-auto px-6">
          <div className="lg:w-[630px] h-[0px] w-full border border-[#f1f1f1] mb-6" />
          <h5 className="text-black flex text-sm font-medium items-start text-start  mb-6">
            Reviews
          </h5>
          {carditem && carditem.length > ZERO ? (
            carditem.slice(0, 4).map((item: any, index: number) => (
              <div className="flex gap-8 mb-10" key={index}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file}`}
                  width={49}
                  height={49}
                  alt=""
                  className="lg:w-[49px] lg:h-[49px] h-[35px] w-[35px] bg-stone-300 rounded-full"
                />

                <div className="flex-col">
                  <h3 className="text-black flex text-sm font-medium items-start pb-5">
                    {item.title}
                  </h3>
                  <p className="md:w-[537px] w-full max-h-[87px] overflow-hidden  text-justify text-black text-sm font-normal  mb-1">
                    {item.content}
                  </p>
                  <span className="text-black flex items-start text-sm font-medium pt-5">
                    {item.created_at}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews are available.</p>
          )}
          <div className="lg:w-[625px] w-full ">
            <div className="border-[#ebe6e6] border-b-2 my-4" />
          </div>
        </div>
      </section>
      <ReviewForm /> */}
    </>
  );
};
export default Review;

"use client";
import React from "react";
import Image from "next/image";
import Line from "./../../../assets/img/line.png";
import ContentCarousel from "../contentCarousel/page";
import { useStore } from "./../../../store/index";
import dynamic from "next/dynamic";

const ImgCarouselTestimonial = dynamic(
  () => import("../imgCarouselTestimonial/page"),
  { ssr: false }
);

const TestiMonial: React.FC = () => {
  const { slides, multipleContent } = useStore(
    (state) => state.homeTestimonial
  );

  return (
    <section className="testimonial relative py-10">
      <div className="mx-auto">
        <div className="grid">
          <div className="relative w-full">
            <ImgCarouselTestimonial slides={slides} width={1920} height={636} />
          </div>
        </div>

        <div className="2xl:w-[1232px] h-[105px] w-full z-20 relative bg-neutral-700 mx-auto">
          <h2 className="text-2xl md:text-4xl mx-auto leading-tight flex line-testi text-white justify-center pt-8 items-center w-full max-w-lg font-semibold md:-mt-44 text-center mb-7 pb-5">
            Testimonial
          </h2>
          <div className="relative w-full">
            <Image
              src={Line}
              alt=""
              className="absolute mx-auto md:inset-x-80 inset-0 pl-20 md:pl-4 -top-5 object-center"
            />
          </div>
        </div>

        <div className="md:h-[273px] relative bg-neutral-700 flex justify-center items-center z-20">
          <div className="absolute top-[8px] md:left-[340px] left-[20px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden 2xl:block w-[45px] h-[20x] md:w-[80px] md:h-[50x]"
              fill="#595959"
              width="90"
              height="82"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <ContentCarousel slides={multipleContent} />
          <div className="absolute bottom-[35px] md:right-[340px] right-[20px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden 2xl:block w-[45px] h-[20x] md:w-[80px] md:h-[50x]"
              fill="#595959"
              width="90"
              height="82"
              viewBox="0 0 24 24"
            >
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TestiMonial;

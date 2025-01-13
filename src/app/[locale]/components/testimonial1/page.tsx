"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";
import TestimonialBg from "./../../../assets/img/testimonial-bg.jpg";
import useEmblaCarousel from "embla-carousel-react";

const TestiMonial1: React.FC = () => {
  const { carditem, title } = useStore((state) => state.homeTestimonial);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    align: "start", // Align the slides to the left
    containScroll: "trimSnaps",
    slidesToScroll: 2, // Scroll 2 slides at a time
  });

  const onNextClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onPrevClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <section className="testimonial relative">
        <div className="content relative w-full">
          <Image
            src={TestimonialBg} // Replace with correct path to the testimonial background image
            className="w-full min-h-[468px] max-h-[468px] object-cover bg-cover relative z-0"
            alt=""
          />
        </div>

        <div className="absolute top-[2.5rem] left-1/2 transform -translate-x-1/2">
          <div className="text-center text-black lg:text-[44px] text-[24px] font-bold font-['DM Sans'] md:mb-10 z-10">
            {title}
          </div>
        </div>

        <div
          className="container xl:w-[1150px] lg:w-[1000px]  justify-center items-center flex gap-24 mx-auto absolute top-[8rem] left-1/2 transform -translate-x-1/2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex justify-center  items-center space-x-4 overflow-hidden"
            ref={emblaRef}
          >
            <div className="embla__container3 m-4     flex cursor-pointer mx-auto">
              {carditem.map((item: any, index: number) => (
                <>
                  <div
                    key={index}
                    className="embla__slide3 flex mx-[10px]  justify-center relative group"
                  >
                    <div className="bg-white md:w-[504px] w-full md:h-[247px] shadow-md rounded-2xl p-6">
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.173 3.611a1 1 0 00.95.69h3.8c.969 0 1.372 1.24.588 1.81l-3.073 2.23a1 1 0 00-.364 1.118l1.173 3.611c.3.921-.755 1.688-1.538 1.118l-3.073-2.23a1 1 0 00-1.176 0l-3.073 2.23c-.783.57-1.838-.197-1.538-1.118l1.173-3.611a1 1 0 00-.364-1.118l-3.073-2.23c-.784-.57-.38-1.81.588-1.81h3.8a1 1 0 00.95-.69l1.173-3.611z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.173 3.611a1 1 0 00.95.69h3.8c.969 0 1.372 1.24.588 1.81l-3.073 2.23a1 1 0 00-.364 1.118l1.173 3.611c.3.921-.755 1.688-1.538 1.118l-3.073-2.23a1 1 0 00-1.176 0l-3.073 2.23c-.783.57-1.838-.197-1.538-1.118l1.173-3.611a1 1 0 00-.364-1.118l-3.073-2.23c-.784-.57-.38-1.81.588-1.81h3.8a1 1 0 00.95-.69l1.173-3.611z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.173 3.611a1 1 0 00.95.69h3.8c.969 0 1.372 1.24.588 1.81l-3.073 2.23a1 1 0 00-.364 1.118l1.173 3.611c.3.921-.755 1.688-1.538 1.118l-3.073-2.23a1 1 0 00-1.176 0l-3.073 2.23c-.783.57-1.838-.197-1.538-1.118l1.173-3.611a1 1 0 00-.364-1.118l-3.073-2.23c-.784-.57-.38-1.81.588-1.81h3.8a1 1 0 00.95-.69l1.173-3.611z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.173 3.611a1 1 0 00.95.69h3.8c.969 0 1.372 1.24.588 1.81l-3.073 2.23a1 1 0 00-.364 1.118l1.173 3.611c.3.921-.755 1.688-1.538 1.118l-3.073-2.23a1 1 0 00-1.176 0l-3.073 2.23c-.783.57-1.838-.197-1.538-1.118l1.173-3.611a1 1 0 00-.364-1.118l-3.073-2.23c-.784-.57-.38-1.81.588-1.81h3.8a1 1 0 00.95-.69l1.173-3.611z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.173 3.611a1 1 0 00.95.69h3.8c.969 0 1.372 1.24.588 1.81l-3.073 2.23a1 1 0 00-.364 1.118l1.173 3.611c.3.921-.755 1.688-1.538 1.118l-3.073-2.23a1 1 0 00-1.176 0l-3.073 2.23c-.783.57-1.838-.197-1.538-1.118l1.173-3.611a1 1 0 00-.364-1.118l-3.073-2.23c-.784-.57-.38-1.81.588-1.81h3.8a1 1 0 00.95-.69l1.173-3.611z" />
                          </svg>
                        </div>
                      </div>

                      <p
                        className="md:min-w-[450px] md:max-w-[450px] min-h-[120px] max-h-[120px] overflow-hidden text-gray-700 mb-4 text-start"
                        dangerouslySetInnerHTML={{
                          __html: item?.content,
                        }}
                      ></p>

                      <div className="flex items-center justify-between  bottom-0">
                        <div className="flex items-center">
                          <Image
                            width={40}
                            height={40}
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                            className="md:w-[40px] md:h-[40px] rounded-[38px] mb-0 overflow-hidden"
                            alt=""
                          />
                          <p className="text-gray-900 font-semibold pl-5">
                            {item.title}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm text-right">
                            {item?.sub_heading?.[0]?.subheading}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          {isHovered && (
            <>
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg "
                onClick={onPrevClick}
                aria-label="Previous"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                onClick={onNextClick}
                aria-label="Next"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default TestiMonial1;

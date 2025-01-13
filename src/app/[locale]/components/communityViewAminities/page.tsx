"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useStore } from "./../../../store/index";

const CommunityViewAminities: React.FC = () => {
  const { title, carditem } = useStore((state) => state.communityViewAmenities);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    align: "center",
    containScroll: "trimSnaps", // This ensures that only full slides are visible
  });

  const onNextClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onPrevClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  return (
    <section className="relative w-full mx-auto bg-[#9898981A] md:h-[693px] h-[620px]">
      <h3 className="text-center text-black lg:text-[42px] md:text-[30px] text-[25px] font-normal font-optima uppercase py-4 md:pt-10 pt-20">
        {title}
      </h3>
      <div className="flex flex-col absolute inset-0 z-0">
        <div
          className="flex justify-center items-center space-x-4 space-y-32 overflow-hidden"
          ref={emblaRef}
        >
          <div className="embla__container2 flex cursor-pointer gap-10 md:px-10">
            {carditem?.map((item: any, index: number) => (
              <div
                className="embla__slide2 relative mt-32 group" // Adjusted to show 4 items per view
                key={index}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.file?.[0]?.img_md_url}`}
                  alt="Community Retail Outlet"
                  className=" w-full md:min-h-[440px] md:max-h-[440px] min-h-[400px] bg-cover object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" // Added scale effect on hover
                  width={560}
                  height={440}
                />
                <div className="absolute  w-full inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-0">
                  <span className="text-white text-xl text-center font-normal uppercase leading-tight group-hover:text-white z-0">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="embla__prevp"
            onClick={onPrevClick}
            aria-label="Previous slide"
          >
            <span className="text-3xl">{"<"}</span>
          </button>
          <button
            className="embla__nextp"
            onClick={onNextClick}
            aria-label="Next slide"
          >
            <span className="text-3xl">{">"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunityViewAminities;

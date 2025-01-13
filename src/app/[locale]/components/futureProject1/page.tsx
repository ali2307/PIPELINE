"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useStore } from "../../../store/index";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ONE } from "@/app/utils/constants";
import dynamic from "next/dynamic";

const FutureProjectCard = dynamic(() => import("../futureProjectCard/page"), {
  ssr: false, // Disable server-side rendering if you want the component to be client-side only
  // loading: () => <div>Loading...</div>, // Optional: Custom loading component
});

const FutureProject1: React.FC = () => {
  const { carditem, title } = useStore((state) => state.homeFuture);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="lg:py-12 py-8 md:py-8 bg-white">
      <div className="container lg:w-[1456px] w-full mx-auto px-6 lg:px-8">
        <h2 className="text-center text-[#0e0e0ee3] text-[36px] lg:text-[52px] font-semibold font-montecarlo capitalize mb-4">
          {title}
        </h2>
        <div className="w-full embla mx-auto" ref={emblaRef}>
          <div className="embla__container">
            {carditem?.map((item: any, index: number) => (
              <div className="embla__slide" key={index}>
                <FutureProjectCard item={item} index={index} />
              </div>
            ))}
          </div>
        </div>
        {carditem?.length > ONE && (
          <div className="embla__pagination_1 absolute mb-4 z-0 mt-5">
            {carditem.map((_: any, index: any) => (
              <button
                key={index}
                className={`embla__pagination__dot ${
                  index === selectedIndex ? "is-selected" : ""
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FutureProject1;

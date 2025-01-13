"use client";

import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface multipleitem {
  content: string;
  title: string;
}

interface ContentCarouselProps {
  slides: multipleitem[] | undefined;
}

const ContentCarousel: React.FC<ContentCarouselProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla max-w-4xl md:max-h-40 max-h-  overflow-hidden">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides?.map((item, index) => (
            <div key={index} className="embla__slide ">
              <p className="md:text-xl text-md text-white my-6 font-medium text-center md:max-h-40 max-h-48 mb-4 ">
                {item.content}
              </p>
              <span className="uppercase flex justify-center md:text-2xl text-xl md:max-h-12 max-h-24 text-right mt-2 text-[#fce0ac]">
                - {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ContentCarousel;

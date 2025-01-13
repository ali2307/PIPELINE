"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ONE } from "@/app/utils/constants";

interface Image {
  src: string;
  alt: string;
  img_md_url: any;
  imageUrl: string;
}

interface ImageCarouselProps {
  slides: Image[] | any[];
  width?: number;
  height: number;
}

const ImgCarouselTestimonial: React.FC<ImageCarouselProps> = ({
  slides,
  width,
  height,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
    <div className="embla flex items-end bottom-0 right-10 z-50">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides?.map((image, index) => (
            <div key={index} className="embla__slide">
              <Image
                alt=""
                width={width}
                height={height}
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image.img_md_url}`}
                className="w-full md:h-[848px] h-full object-cover mx-auto bg-cover bg-no-repeat"
              // className={`w-full md:h-[${height}px] h-[500px] object-cover bg-cover bg-no-repeat`}
              />
            </div>
          ))}
        </div>
      </div>
      {slides?.length > ONE && (
        <div className="embla__pagination absolute mb-4 z-50">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`embla__pagination__dot ${index === selectedIndex ? "is-selected" : ""
                }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default ImgCarouselTestimonial;

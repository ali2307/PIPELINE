"use client";
import { useEffect } from "react";
import EmblaCarouselReact from "embla-carousel-react";
import Image from "next/image";
import { ONE, THREE, TWO } from "@/app/utils/constants";

interface Slide {
  img_md_url: string;
}

interface EmblaCarouselProps {
  slides: Slide[];
}

const GridImageBannerWithCrousel: React.FC<EmblaCarouselProps> = ({
  slides,
}) => {
  const [emblaRef, emblaApi] = EmblaCarouselReact({
    loop: true,
    slidesToScroll: 1,
    dragFree: false,
  });

  const nextClick = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const prevClick = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  // Determine the grid style dynamically based on the number of slides
  const gridClass =
    slides.length === ONE
      ? "grid-cols-1"
      : slides.length === TWO
      ? "grid-cols-2"
      : "grid-cols-3";

  return (
    <div>
      {slides.length > THREE ? (
        <div className="emblap" ref={emblaRef}>
          <div className="embla__containerp flex">
            {slides.map((item, index) => (
              <div className="embla__slidep relative group" key={index}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.img_md_url}`}
                  alt={`Slide ${index + 1}`}
                  className="lg:min-w-[633px] lg:h-[591px] h-[324px] relative w-full bg-cover object-cover"
                  width={560}
                  height={440}
                />
              </div>
            ))}
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <button
              className="embla__prevp"
              onClick={prevClick}
              aria-label="Previous slide"
            >
              <span className="text-3xl">{"<"}</span>
            </button>
            <button
              className="embla__nextp"
              onClick={nextClick}
              aria-label="Next slide"
            >
              <span className="text-3xl">{">"}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={`grid ${gridClass} md:gap-4 gap-2`}>
          {slides.map((item, index) => (
            <div className="relative group" key={index}>
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.img_md_url}`}
                alt={`Slide ${index + 1}`}
                className="relative w-full lg:h-[591px] h-[324px] object-cover bg-cover"
                width={560}
                height={440}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GridImageBannerWithCrousel;

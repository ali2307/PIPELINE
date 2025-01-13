"use client";
import React, { Fragment } from "react";
import { useStore } from "./../../../store/index";
import dynamic from "next/dynamic";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import LearnMoreButton from "../learnMoreButton/page";

const UnitCard = dynamic(() => import("../unitCard/page"), {
  ssr: false, // Disable server-side rendering for this component
});
const AboutProperties: React.FC = () => {
  const { title, carditem, redirectionUrl } = useStore(
    (state) => state.aboutProperty
  );
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true, // Enable looping
    },
    [Autoplay()]
  );
  return (
    <>
      <section className="relative px-4 sm:px-4 md:py-18">
        <div className="container mx-auto">
          <div className="2xl:w-[1240px] w-full mx-auto">
            <div className="text-black lg:text-[45px] md:text-[28px] text-[24px] font-normal font-optima flex justify-center items-center max-w-[88rem] overflow-hidden uppercase leading-[43.29px] md:mb-16 mb-5 mx-auto">
              {title || ""}
            </div>
            {/* Mobile view  */}
            <div className="block md:hidden">
              <div ref={emblaRef} className="emblau">
                <div className="embla__containeru">
                  {carditem?.map((item: any, index: number) => (
                    <div className="embla__slideu" key={index}>
                      <UnitCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop view (grid) */}
            <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 w-full justify-center items-center mx-auto">
              {carditem?.map((item: any, index: number) => (
                <div className="lg:min-w-44 w-full" key={index}>
                  <UnitCard item={item} />
                </div>
              ))}
            </div>
            <LearnMoreButton redirectionUrl={redirectionUrl} buttonText="Learn More" />
          </div>
        </div>
      </section>
    </>
  );
};
export default AboutProperties;

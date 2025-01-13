"use client";
import React, { Fragment } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useStore } from "./../../../store/index";
import UnitCard from "../unitCard/page";

const SimilarUnits: React.FC = () => {
  const { carditem } = useStore((state) => state.unitViewProperties);
  const [emblaRef] = useEmblaCarousel({
    loop: true, // Enable looping
  }, [Autoplay()]);
  return (
    <>
      <section className="relative px-4  lg:px-16  2xl:px-64 py-2 md:py-5">
        <div className="container mx-auto">
          <div className="lg:w-[930px] xl:w-[1068px] w-full mx-auto">
            <h4 className="text-black text-sm lg:text-start text-center font-medium  pb-4">
              Similar Properties
            </h4>
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
            {/* Desktop view  */}
            <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 w-full justify-center items-center mx-auto">
              {carditem?.map((item: any, index: number) => (
                <Fragment key={index}>
                  <UnitCard item={item} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SimilarUnits;

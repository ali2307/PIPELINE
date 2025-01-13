"üse client";
import React, { Fragment } from "react";
import { useStore } from "../../../store/index";
import dynamic from "next/dynamic";

// Dynamically import PropertyCard
const PropertyCard = dynamic(() => import("../propertyCard/page"), {
  // loading: () => <div>Loading...</div>,
});

const PropertyCards: React.FC = () => {
  const { carditem } = useStore((state) => state.propertyListing);
  return (
    <>
      <div className="px-4 lg:px-16 xl:px-16 mt-8">
        <div className="container xl:w-[1073px] w-full mx-auto">
          <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-8 sm:gap-4 w-full lg:pt-6 pb-16 cursor-pointer">
            {carditem?.map((item: any, index: number) => (
              <Fragment key={index}>
                <PropertyCard item={item} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default PropertyCards;

"use client";
import React from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";
import Link from "next/link";

const CommunityViewAvailable: React.FC = () => {
  const { title, content, carditem } = useStore(
    (state) => state.communityViewAvailability
  );

  return (
    <>
      <section className="2xl:w-[1326px] xl:w-[1263px] w-full relative my-8 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="my-3">
              <div className="relative lg:mb-4 md:mb-0">
                <h4 className="text-[#3D3D3D] text-xl md:text-xl lg:text-3xl font-normal font-optima uppercase">
                  Available
                </h4>
                <div className="absolute lg:left-[158px] md:left-[98px] w-[150px] md:w-[250px] h-[1px] top-6 border border-[#777575] hidden md:block" />
              </div>
              <h3 className="text-black text-2xl  max-h-[84px] min-w-[290px] max-w-[290px] grow min-h-0 overflow-hidden md:text-2xl lg:text-4xl font-medium font-optima uppercase leading-tight">
                {title}
              </h3>
              <p
                className="text-[#3c3c3c]  max-h-[116px] overflow-hidden grow min-h-0 text-base md:text-lg lg:text-xl mt-3 capitalize"
                dangerouslySetInnerHTML={{ __html: content }}
              ></p>
            </div>
            {carditem?.map((item: any, index: number) => (
              <div className="relative my-3 cursor-pointer" key={item.id}>
                <Link
                  href={`/search-unit?propertyType=${item.search_type}&bedsAndBaths=${item.bedsAndBaths}&communityId=${item.community_id}`} // Dynamically generate the URL with query params
                  passHref
                  className="w-full h-auto relative"
                >
                  <Image
                    className="md:w-[421px] md:h-[265px] w-full h-auto object-cover"
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item?.file}`}
                    alt="Rental 1"
                    width={500}
                    height={500}
                  />
                  <div className="absolute bottom-0 inset-x-0 h-[111px] bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-4 left-12 text-white">
                    <h4 className="text-xl md:text-2xl font-medium uppercase">
                      {item.property_type}
                    </h4>
                    <h5 className="opacity-75 text-sm md:text-base font-medium capitalize">
                      {item.available_units_count} Unit available
                    </h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default CommunityViewAvailable;

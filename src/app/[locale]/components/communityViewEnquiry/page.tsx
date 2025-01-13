"use client";
import React from "react";
import { useStore } from "./../../../store/index";
import dynamic from "next/dynamic";
import { MapProvider } from "@/app/providers/map-provider";
import ContactUsDetails from "../contactUsDetails/page";

const Map = dynamic(() => import("../map/page"), { ssr: false });
const EnquiryForm = dynamic(() => import("../enquiryForm/page"), {
  ssr: false,
});

const CommunityViewEnquiry: React.FC = () => {
  const { location, title } = useStore((state) => state.communityViewEnquiry);
  const { address, phone, email, company } = useStore((state) => state.profile);

  return (
    <>
      <section>
        <h3 className="text-center text-black lg:text-[42px] md:text-[30px] text-[25px] font-normal font-optima uppercase  my-8">
          {title}
        </h3>
        <div className="w-full">
          <div className="grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 md:gap-10 xl:gap-6 sm:px-4">
            <div className="">
              <Map
                locations={location}
                className="xl:w-[947px] lg:w-[500px] w-full md:h-[712px] h-[380px] bg-cover object-cover"
                height=""
                width="100%"
              />
            </div>
            <div className=" w-full flex md:flex-row flex-col 2xl:gap-16  gap-4 px-3">
              <EnquiryForm />
              <div className="flxed md:mt-48 items-center justify-center">
                <ContactUsDetails
                  address={address}
                  phoneNumber={phone}
                  email={email}
                  company={company}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CommunityViewEnquiry;

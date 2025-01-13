"use client";
import React from "react";
import dynamic from "next/dynamic";
import Map from "../map/page";
import { useStore } from "../../../store/index";
import { MapProvider } from "@/app/providers/map-provider";
import EnquiryForm from "../enquiryForm/page";

const ContactUsDetails = dynamic(() => import("../contactUsDetails/page"), {
  ssr: false,
});

interface FormPageProps {
  flag: any;
}

const ContactUsLocation: React.FC<FormPageProps> = ({ flag }) => {
  const { address, phone, locations, email, company } = useStore(
    (state) => state.profile
  );

  return (
    <>
      <section className="flex lg:flex-row flex-col sm:my-6 sm:px-4 ">
        {flag && flag[0] === "enqury" ? (
          <div className="w-1/2 h-1/2 flex items-center justify-center">
            <div className="flex items-center justify-center">
              <EnquiryForm />
            </div>
          </div>
        ) : (
          <>
            <MapProvider>
              <Map
                locations={[locations]}
                className="lg:w-[48%] w-full md:h-[712px] h-[365px] bg-cover object-cover sm:my-6"
                height=""
                width=""
              />
            </MapProvider>

            <div className="md:mx-10 mt-4">
              <EnquiryForm />
            </div>
          </>
        )}

        <div className="flxed lg:mt-36 items-center justify-center lg:ml-20 py-6">
          <ContactUsDetails
            address={address}
            phoneNumber={phone}
            email={email}
            company={company}
          />
        </div>
      </section>
    </>
  );
};

export default ContactUsLocation;

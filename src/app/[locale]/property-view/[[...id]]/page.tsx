"use client";

import React, { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { viewPropertyUnits } from "@/app/services/api";
import { useStore } from "./../../../store/index";
import Loader from "../../components/loader/page";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import NoSection from "../../components/noSectionComponet/page";
import { ZERO } from "@/app/utils/constants";

// Dynamically import components
const PropertyViewBanner = dynamic(
  () => import("../../components/propertyViewBanner/page")
);
const PropertyViewCard = dynamic(
  () => import("../../components/propertyViewCard/page")
);
const PropertyFilter = dynamic(
  () => import("../../components/propertyFilter/page")
);
const Footer = dynamic(() => import("../../components/footer/page"));

interface SessionDataType {
  id: number;
  name: string;
  property: string;
  title: string;
  section_heading: string;
  content: string;
  section_images: [];
  parent_type_id: number;
  child_sections: [];
}

const PropertyView: React.FC = () => {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const slug = segments[3];
  const [sessionData, setSessionData] = useState<Array<SessionDataType>>([]);
  const setPropertyView = useStore((state) => state.setPropertyView);
  const { carditem, propertyType, currentPage, perPage, isWishlist } = useStore(
    (state) => state.propertyViewListing
  );
  const [loading, setLoading] = useState(true); // Add loading state
  const setWishlistStatus = useStore((state) => state.setWishlistStatus);

  useEffect(() => {
    viewPropertyUnits(slug, currentPage, perPage)
      .then((res) => {
        const d = res.data.data;
        setSessionData(d?.section_category_details || []);
        setPropertyView(d?.section_category_details || []);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message || "Failed to fetch data");
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      });
    return () => {
      setWishlistStatus([]);
      setPropertyView([]);
    };
  }, [slug, setPropertyView, isWishlist]);

  if (loading) {
    return <Loader />; // Show NoSection while loading
  }

  return (
    <Suspense key={slug} fallback={<Loader />}>
      {sessionData && sessionData.length > ZERO ? (
        sessionData.map((section) => {
          switch (section.property) {
            case "unit_banner":
              return <PropertyViewBanner key={section.id} />;
            case "unit_listing":
              return (
                <div
                  className="container flex flex-wrap mx-auto"
                  key={section.id}
                >
                  <div className="lg:w-[1142px] w-full mx-auto">
                    <div className="flex lg:flex-row flex-col md:gap-4 gap-1">
                      <PropertyViewCard carditem={carditem} />
                      <PropertyFilter propertyType={propertyType} />
                    </div>
                  </div>
                </div>
              );
            case "unit_footer":
              return <Footer key={section.id} />;
            default:
              return null;
          }
        })
      ) : (
        <NoSection />
      )}
    </Suspense>
  );
};

export default PropertyView;

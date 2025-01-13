"use client";

import React, { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { viewHomePageSections } from "@/app/services/api";
import { useStore } from "./../../../store/index";
import Loader from "../../components/loader/page";
import { toast } from "react-toastify";
import NoSection from "../../components/noSectionComponet/page";
import dynamic from "next/dynamic";
import { ZERO } from "@/app/utils/constants";

// Dynamically import components
const PropertyBanner = dynamic(() =>
  import("../../components/propertyBanner/page")
);
const PropertyCards = dynamic(() =>
  import("../../components/propertyCards/page")
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

const Property: React.FC = () => {
  const [sessionData, setSessionData] = useState<Array<SessionDataType>>([]);
  const setProperty = useStore((state) => state.setProperty);
  const [loading, setLoading] = useState(true); // Add loading state
  const pathname = usePathname();
  const segments = pathname.split("/");
  const slug = segments[2];
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const setSearchFilterList = useStore((state) => state.setSearchFilterList);
  const { filterCarditem } = useStore(
    (state) => state.searchFilter
  );


  useEffect(() => {
    setCurrentPage(1);
    viewHomePageSections(slug)
      .then((res) => {
        const d = res.data.data.data;
        setSessionData(d?.section_category_details || []);
        setProperty(d?.section_category_details || []);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message || "Failed to fetch data");
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      });
    return (() => {
      setCurrentPage(1);
      setProperty([]);
      if (filterCarditem && filterCarditem.length > ZERO) {
        setSearchFilterList([], {}); // Clear filterCarditem if it has data
      }
    })
  }, [slug, setProperty]);

  if (loading) {
    return <Loader />; // Show NoSection while loading
  }

  return (
    <Suspense key={slug} fallback={<Loader />}>
      {sessionData && sessionData.length > ZERO ? (
        sessionData.map((section) => {
          switch (section.property) {
            case "property_banner":
              return <PropertyBanner key={section.id} />;
            case "property_listing":
              return <PropertyCards key={section.id} />;
            case "property_footer":
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

export default Property;

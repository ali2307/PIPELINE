"use client";

import React, { Suspense, useEffect, useState } from "react";
import { viewDetailedUnit } from "@/app/services/api";
import { useStore } from "./../../../store/index";
import Loader from "../../components/loader/page";
import { toast } from "react-toastify";
import NoSection from "../../components/noSectionComponet/page";
import dynamic from "next/dynamic";
import { ZERO } from "@/app/utils/constants";

// Dynamically import components
const UnitViewBanner = dynamic(() =>
  import("../../components/unitViewBanner/page")
);
const UnitDetail = dynamic(() => import("../../components/unitDetails/page"));
const SimilarUnits = dynamic(() =>
  import("../../components/similarUnits/page")
);
const Review = dynamic(() => import("../../components/review/page"));
const Footer = dynamic(() => import("../../components/footer/page"));

interface Props {
  params: any;
  id: number;
}

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

const UnitView: React.FC<Props> = ({ params }) => {
  const [sessionData, setSessionData] = useState<Array<SessionDataType>>([]);
  const setUnitView = useStore((state) => state.setUnitView);
  const setUnitId = useStore((state) => state.setUnitId);
  const { status } = useStore((state) => state.unitReview);
  const setReviewStatus = useStore((state) => state.setReviewStatus);
  const slug = params.id[0];
  const { isWishlist, isCart } = useStore((state) => state.propertyViewListing);
  const setWishlistStatus = useStore((state) => state.setWishlistStatus);
  const setCartStatus = useStore((state) => state.setCartStatus);
  const setPropertyDetails = useStore((state) => state.setPropertyDetails);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    viewDetailedUnit(slug)
      .then((res) => {
        const d = res.data.data.data;
        setSessionData(d?.section_category_details || []);
        setUnitView(d?.section_category_details || []);
        setUnitId(d?.unit_id);
        setPropertyDetails(d);
        setReviewStatus(false);
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
      setCartStatus(false);
      setUnitView([])
    };
  }, [
    slug,
    setUnitView,
    setUnitId,
    setReviewStatus,
    isWishlist,
    isCart,
    status,
  ]);

  if (loading) {
    return <Loader />; // Show NoSection while loading
  }
  return (
    <Suspense key={slug} fallback={<Loader />}>
      {sessionData && sessionData.length > ZERO ? (
        sessionData.map((section) => {
          switch (section.property) {
            case "unitview_banner":
              return <UnitViewBanner key={section.id} />;
            case "unitview_details":
              return <UnitDetail key={section.id} />;
            case "unitview_properties":
              return <SimilarUnits key={section.id} />;
            case "unitview_review":
              return <Review key={section.id} />;
            case "unitview_footer":
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

export default UnitView;

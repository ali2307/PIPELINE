"use client";
import React, { useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import { projectViewSections } from "@/app/services/api";
import { useStore } from "./../../../store/index";
import Loader from "../../components/loader/page";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { ZERO } from "@/app/utils/constants";
import NoSection from "../../components/noSectionComponet/page";

const CommunityViewBanner = dynamic(
  () => import("../../components/communityViewBanner/page")
);
const CommunityViewAbout = dynamic(
  () => import("../../components/communityViewAbout/page")
);
const CommunityViewAminities = dynamic(
  () => import("../../components/communityViewAminities/page")
);
const CommunityViewSustanability = dynamic(
  () => import("../../components/communityViewSustanability/page")
);
const CommunityViewDiscover = dynamic(
  () => import("../../components/communityViewDiscover/page")
);
const CommunityViewAvailable = dynamic(
  () => import("../../components/communityViewAvailable/page")
);
const CommunityViewGallery = dynamic(
  () => import("../../components/communityViewGallery/page")
);
const CommunityViewEnquiry = dynamic(
  () => import("../../components/communityViewEnquiry/page")
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

interface FormPageProps {
  params: any;
  id: number;
}

const Community: React.FC<FormPageProps> = () => {
  const [sessionData, setSessionData] = useState<Array<SessionDataType>>([]);
  const setCommunity = useStore((state) => state.setCommunity);
  const hideSpinner = useStore((state) => state.hideSpinner);
  const showSpinner = useStore((state) => state.showSpinner);
  const globalLoader = useStore((state) => state.globalLoader);
  const [loading, setLoading] = useState(true); // Add loading state
  const pathname = usePathname();
  const segments = pathname.split("/");
  const slug = segments[2];
  const name = segments[3];


  useEffect(() => {
    showSpinner();
    projectViewSections(slug, name)
      .then((res) => {
        const d = res.data.data;
        setSessionData(d?.section_category_details || []);
        setCommunity(d?.section_category_details || []);
        hideSpinner();
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message || "Failed to fetch data");
        hideSpinner();
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      });
    return (() => {
      setCommunity([]);
    })
  }, [slug, name, showSpinner, hideSpinner, setCommunity]);

  if (loading) {
    return <Loader />; // Show NoSection while loading
  }
  return (
    <>
      <Suspense key={slug} fallback={<Loader />}>
        {sessionData && sessionData.length > ZERO ? (
          sessionData.map((section) => {
            switch (section.property) {
              case "communityview_banner":
                return <CommunityViewBanner key={section.id} />;
              case "communityview_about":
                return <CommunityViewAbout key={section.id} />;
              case "communityview_sustanability":
                return <CommunityViewSustanability key={section.id} />;
              case "communityview_amenities":
                return <CommunityViewAminities key={section.id} />;
              case "communityview_discover":
                return <CommunityViewDiscover key={section.id} />;
              case "communityview_availability":
                return <CommunityViewAvailable key={section.id} />;
              case "communityview_gallery":
                return <CommunityViewGallery key={section.id} />;
              case "communityview_enquiry":
                return <CommunityViewEnquiry key={section.id} />;
              case "communityview_footer":
                return <Footer key={section.id} />;
              default:
                return null;
            }
          })
        ) : (
          <NoSection /> // Show NoSection if no sections are available
        )}
      </Suspense>
    </>
  );
};

export default Community;

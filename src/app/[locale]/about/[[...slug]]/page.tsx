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

const AboutBanner = dynamic(() => import("../../components/aboutBanner/page"), {
  // loading: () => <Loader />,
});
const AboutChairman = dynamic(
  () => import("../../components/aboutChairman/page")
// { loading: () => <Loader /> }
);
const AboutDestBanner = dynamic(() =>
  import("../../components/aboutDestBanner/page")
);
const AboutDestProperty = dynamic(() =>
  import("../../components/aboutDestProperty/page")
);
const AboutProperties = dynamic(() =>
  import("../../components/aboutProperties/page")
);
const AboutMissionVission = dynamic(() =>
  import("../../components/aboutMissionVission/page")
);
const AboutTeams = dynamic(() => import("../../components/aboutTeams/page"));
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

const About: React.FC<FormPageProps> = () => {
  const [sessionData, setSessionData] = useState<Array<SessionDataType>>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const setAbout = useStore((state) => state.setAbout);
  const pathname = usePathname();
  const segments = pathname.split("/");
  const slug = segments[2];

  useEffect(() => {
    setLoading(true); // Set loading to true when the component mounts or slug changes
    viewHomePageSections(slug)
      .then((res) => {
        const d = res.data.data.data;
        setSessionData(d?.section_category_details || []);
        setAbout(d?.section_category_details || []);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message || "Failed to fetch data");
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      });
    return (() => {
      setAbout([]);
    })
  }, [slug, setAbout]);

  if (loading) {
    return <Loader />; // Show NoSection while loading
  }

  return (
    <Suspense key={slug} fallback={<Loader />}>
      {sessionData && sessionData.length > ZERO ? (
        sessionData.map((section) => {
          switch (section.property) {
            case "about_banner":
              return <AboutBanner key={section.id} />;
            case "about_chairman":
              return <AboutChairman key={section.id} />;
            case "about_destinationbanner":
              return <AboutDestBanner key={section.id} />;
            case "about_destination":
              return <AboutDestProperty key={section.id} />;
            case "about_property":
              return <AboutProperties key={section.id} />;
            case "mission_vision":
              return <AboutMissionVission key={section.id} />;
            case "about_team":
              return <AboutTeams key={section.id} />;
            case "about_footer":
              return <Footer key={section.id} />;
            default:
              return null;
          }
        })
      ) : (
        <NoSection /> // Show NoSection if no sections are available
      )}
    </Suspense>
  );
};

export default About;

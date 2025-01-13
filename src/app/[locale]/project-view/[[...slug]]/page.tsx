"use client";

import React, { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { projectViewSections } from "@/app/services/api";
import { useStore } from "./../../../store/index";
import Loader from "../../components/loader/page";
import { toast } from "react-toastify";
import NoSection from "../../components/noSectionComponet/page";
import dynamic from "next/dynamic";
import { ZERO } from "@/app/utils/constants";

// Dynamically import components
const ProjectViewBanner = dynamic(() =>
  import("../../components/projectViewBanner/page")
);
const ProjectViewFeatures = dynamic(() =>
  import("../../components/projectViewFeatures/page")
);
const ProjectViewAminities = dynamic(() =>
  import("../../components/projectViewAminities/page")
);
const ProjectViewCommunities = dynamic(() =>
  import("../../components/projectViewCommunities/page")
);
const ProjectViewExplore = dynamic(() =>
  import("../../components/projectViewExplore/page")
);
const ProjectViewLocation = dynamic(() =>
  import("../../components/projectViewLocation/page")
);
const ProjectViewNeighbourhood = dynamic(() =>
  import("../../components/ProjectViewNeighbourhood/page")
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

const ProjectView: React.FC<FormPageProps> = () => {
  const [sessionData, setSessionData] = useState<Array<SessionDataType>>([]);
  const setProject = useStore((state) => state.setProject);
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
        setProject(d?.section_category_details || []);
        hideSpinner();
      })
      .catch((error) => {
        // toast.error(error.message || "Failed to fetch data");
        hideSpinner();
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      });
    return (() => {
      setProject([]);
    })
  }, [slug, name, setProject]);

  if (loading) {
    return <Loader />; // Show NoSection while loading
  }

  return (
    <>
      <Suspense key={slug} fallback={<Loader />}>
        {sessionData && sessionData.length > ZERO ? (
          sessionData.map((section) => {
            switch (section.property) {
              case "projectview_banner":
                return <ProjectViewBanner key={section.id} />;
              case "projectview_features":
                return <ProjectViewFeatures key={section.id} />;
              case "projectview_amenities":
                return <ProjectViewAminities key={section.id} />;
              case "projectview_community":
                return <ProjectViewCommunities key={section.id} />;
              case "projectview_explore":
                return <ProjectViewExplore key={section.id} />;
              case "projectview_location":
                return <ProjectViewLocation key={section.id} />;
              case "projectview_upcoming":
                return <ProjectViewNeighbourhood key={section.id} />;
              case "projectview_footer":
                return <Footer key={section.id} />;
              default:
                return null;
            }
          })
        ) : (
          <NoSection />
        )}
      </Suspense>
      {/* )} */}
    </>
  );
};

export default ProjectView;

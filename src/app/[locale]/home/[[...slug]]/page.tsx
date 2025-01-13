"use client";

import React, { Suspense, useEffect, useState } from "react";
import { viewHomePageSections } from "@/app/services/api";
import { useStore } from "./../../../store/index";
import Loader from "../../components/loader/page";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { ZERO } from "@/app/utils/constants";

const Banner = dynamic(() => import("../../components/banner/page"));
const Explore = dynamic(() => import("../../components/explore/page"));
// const TestiMonial = lazy(() => import("../../components/testimonial/page"));
const Footer = dynamic(() => import("../../components/footer/page"));
const HomeAbout = dynamic(() => import("../../components/homeAbout/page"));
const HomeBlog = dynamic(() => import("../../components/homeBlog/page"));
const HomeProperty = dynamic(() =>
  import("../../components/home-property/page")
);
const FutureProject1 = dynamic(() =>
  import("../../components/futureProject1/page")
);
const TestiMonial1 = dynamic(() =>
  import("../../components/testimonial1/page")
);
const NoSection = dynamic(() =>
  import("../../components/noSectionComponet/page")
);

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

const Home: React.FC = () => {
  const [sessionData, setSessionData] = useState<Array<SessionDataType>>([]);
  const setHome = useStore((state) => state.setHome);
  const [loading, setLoading] = useState(true); // Add loading state
  const slug = "home";

  useEffect(() => {
    viewHomePageSections(slug)
      .then((res) => {
        const d = res.data.data.data;
        setSessionData(d?.section_category_details || []);
        setHome(d?.section_category_details || []);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message || "Failed to fetch data");
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      });
    return (() => {
      setHome([]);
    })
  }, [setHome]);

  if (loading) {
    return <Loader />; // Show NoSection while loading
  }
  return (
    <Suspense key={slug} fallback={<Loader />}>
      {sessionData && sessionData.length > ZERO ? (
        sessionData.map((section) => {
          switch (section.property) {
            case "home_banner":
              return <Banner key={section.id} />;
            case "home_about":
              return <HomeAbout key={section.id} />;
            case "home_property":
              return <HomeProperty key={section.id} />;
            case "home_explore":
              return <Explore key={section.id} />;
            case "home_future":
              return <FutureProject1 key={section.id} />;
            case "home_testimonial":
              // return <TestiMonial key={section.id} />;
              return <TestiMonial1 key={section.id} />;
            case "home_blog":
              return <HomeBlog key={section.id} />;
            case "home_footer":
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

export default Home;

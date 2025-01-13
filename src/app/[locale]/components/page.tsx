"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { viewHomePageSections } from "@/app/services/api";
import { useStore } from "./../../store/index";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const Banner = dynamic(() => import("./banner/page"), { ssr: false });
const HomeAbout = dynamic(() => import("./homeAbout/page"), { ssr: false });
const Property = dynamic(() => import("./home-property/page"), { ssr: false });
const Explore = dynamic(() => import("./explore/page"), { ssr: false });
const FutureProject = dynamic(() => import("./futureProject/page"), {
  ssr: false,
});
const TestiMonial = dynamic(() => import("./testimonial/page"), { ssr: false });
const HomeBlog = dynamic(() => import("./homeBlog/page"), { ssr: false });
const Footer = dynamic(() => import("./footer/page"), { ssr: false });

interface SessionDataType {
  // Define the structure of your session data here
  // For example:
  id: number;
  name: string;
  property: string;
  title: string;
  section_heading: string;
  content: string;
  section_images: [];
  parent_type_id: number;
  child_sections: [];
  // Add other properties as needed
}

const Home: React.FC = () => {
  const [sessionData, setSessionData] = useState<Array<SessionDataType>>([]);
  const setHome = useStore((state) => state.setHome);

  const pathname = usePathname();
  const segments = pathname.split("/");
  const slug = segments[2];

  useEffect(() => {
    viewHomePageSections(slug)
      .then((res) => {
        setSessionData(res.data.data.data.section_category_details);
        setHome(res.data.data.data.section_category_details);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message || "Failed to fetch data");
      });
  }, []);
  return (
    <>
      {sessionData.map((section) => {
        switch (section.property) {
          case "home_banner":
            return <Banner />;
          case "home_about":
            return <HomeAbout />;
          case "home_property":
            return <Property />;
          case "home_explore":
            return <Explore />;
          case "home_future":
            return <FutureProject />;
          case "home_testimonial":
            return <TestiMonial />;
          case "home_blog":
            return <HomeBlog />;
          case "home_footer":
            return <Footer />;
          default:
            return null;
        }
      })}
    </>
  );
};
export default Home;

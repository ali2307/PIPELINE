"use client";

import React, { Suspense, lazy, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { viewHomePageSections } from "@/app/services/api";
import { useStore } from "./../../../store/index";
import Loader from "../../components/loader/page";
import { toast } from "react-toastify";
import NoSection from "../../components/noSectionComponet/page";
import dynamic from "next/dynamic";
import { ZERO } from "@/app/utils/constants";

const BlogBanner = dynamic(() => import("../../components/blogBanner/page"));
const TrendingBlog = dynamic(() =>
  import("../../components/trendingBlogs/page")
);
const BlogDestinations = dynamic(() =>
  import("../../components/blogDestinations/page")
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

const Blog: React.FC<FormPageProps> = () => {
  const [sessionData, setSessionData] = useState<Array<SessionDataType>>([]);
  const setBlog = useStore((state) => state.setBlog);
  const [loading, setLoading] = useState(true); // Add loading state
  const pathname = usePathname();
  const segments = pathname.split("/");
  const slug = segments[2];

  useEffect(() => {
    viewHomePageSections(slug)
      .then((res) => {
        const d = res.data.data.data;
        setSessionData(d?.section_category_details || []);
        setBlog(d?.section_category_details || []);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message || "Failed to fetch data");
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      });
    return (() => {
      setBlog([]);
    })
  }, [slug, setBlog]);

  if (loading) {
    return <Loader />; // Show NoSection while loading
  }

  return (
    <Suspense key={slug} fallback={<Loader />}>
      {sessionData && sessionData.length > ZERO ? (
        sessionData.map((section) => {
          switch (section.property) {
            case "blog_banner":
              return <BlogBanner key={section.id} />;
            case "blog_trending":
              return <TrendingBlog key={section.id} />;
            case "blog_listing":
              return <BlogDestinations key={section.id} />;
            case "blog_footer":
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

export default Blog;

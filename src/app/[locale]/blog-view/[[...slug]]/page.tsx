"use client";

import React, { Suspense, useEffect, useState } from "react";
import { projectViewSections } from "@/app/services/api";
import { useStore } from "../../../store/index";
import Image from "next/image";
import Loader from "../../components/loader/page";
import { toast } from "react-toastify";
import Footer from "../../components/footer/page";
import dynamic from "next/dynamic";
import { ZERO } from "@/app/utils/constants";
import { usePathname } from "next/navigation";
const NoSection = dynamic(
  () => import("../../components/noSectionComponet/page")
);
const BlogviewBanner = dynamic(
  () => import("../../components/blogviewBanner/page")
);
const BlogviewDiscover = dynamic(
  () => import("../../components/blogviewDiscover/page")
);

interface Props {
  params: any;
  id: number;
}

interface Image {
  src: string;
  alt: string;
  img_md_url: any;
  imageUrl: string;
}

interface Blog {
  content: any;
  [key: string]: any;
  slides: Image[] | any[];
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

const BlogView: React.FC<Props> = (props) => {
  const id = props.params.id;
  const [sessionData, setSessionData] = useState<Array<SessionDataType>>([]);
  const setBlogView = useStore((state) => state.setBlogView);
  const [loading, setLoading] = useState(true); // Add loading state
  const pathname = usePathname();
  const segments = pathname.split("/");
  const slug = segments[2];
  const name = segments[3];
  useEffect(() => {
    projectViewSections(slug, name)
      .then((res) => {
        const d = res.data.data;
        setSessionData(d?.section_category_details || []);
        setBlogView(d?.section_category_details || []);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message || "Failed to fetch data");
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      });
    return (() => {
      setBlogView([]);
    })
  }, [id]);

  if (loading) {
    return <Loader />; // Show NoSection while loading
  }

  return (
    <>
      <Suspense key={id} fallback={<Loader />}>
        {sessionData && sessionData.length > ZERO ? (
          sessionData.map((section) => {
            switch (section.property) {
              case "blogview_blog":
                return <BlogviewBanner key={section.id} />;
              case "blogview_discovermore":
                return <BlogviewDiscover key={section.id} />;
              case "blogview_footer":
                return <Footer key={section.id} />;
              default:
                return null;
            }
          })
        ) : (
          <NoSection />
        )}
      </Suspense>
    </>
  );
};

export default BlogView;

"use client";
import React, { useEffect, useState } from "react";
import { viewHomePageSections } from "@/app/services/api";
import { usePathname } from "next/navigation";
import { useStore } from "../../../store/index";
import dynamic from "next/dynamic";
import Loader from "../../components/loader/page";
import { toast } from "react-toastify";
import NoSection from "../../components/noSectionComponet/page";
import { ZERO } from "@/app/utils/constants";

const Footer = dynamic(() => import("../../components/footer/page"), {
  // loading: () => <Loader/>,
  ssr: false,
});
const ContactUsLocation = dynamic(
  () => import("../../components/contactUsLocation/page"),
  {
    // loading: () => <Loader/>,
    ssr: false,
  }
);
const ContactUsBanner = dynamic(
  () => import("../../components/contactUsBanner/page"),
  {
    loading: () => <Loader />,
    ssr: false,
  }
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

interface FormPageProps {
  params: any;
  id: number;
}

const Contacts: React.FC<FormPageProps> = (param) => {
  const [sessionData, setSessionData] = useState<Array<SessionDataType>>([]);
  const setContactUs = useStore((state) => state.setContactUs);
  const pathname = usePathname();
  const segments = pathname.split("/");
  const slug = segments[2];
  const flag = param.params ? param.params.param : "";
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    viewHomePageSections(slug)
      .then((res) => {
        const d = res.data.data.data;
        setSessionData(d?.section_category_details);
        setContactUs(d?.section_category_details);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      });
  }, []);

  if (loading) {
    return <Loader />; // Show NoSection while loading
  }
  return (
    <>
      {sessionData && sessionData.length > ZERO ? (
        sessionData.map((section: any) => {
          switch (section.property) {
            case "contactus_banner":
              return <ContactUsBanner />;
            case "contactus_location":
              return <ContactUsLocation flag={flag} />;
            case "contactus_footer":
              return <Footer />;
            default:
              return null;
          }
        })
      ) : (
        <NoSection />
      )}
    </>
  );
};

export default Contacts;

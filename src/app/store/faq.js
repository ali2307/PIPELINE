"use client";

import { produce } from "immer";

const faqSlice = (set, get) => ({
  faqListing: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
    section_heading: "",
  },

  setFaq: (data) => {
    set(
      produce((state) => {
        data.forEach((item) => {
          // Assuming you want to update the home state based on certain conditions
          switch (item.property) {
            case "faq_listing":
              state.faqListing.key = item.id;
              state.faqListing.id = item.id;
              state.faqListing.parentID = item.parent_type_id;
              state.faqListing.section_heading = item.section_heading;
              state.faqListing.content = item.content;
              state.faqListing.slides = item.section_images;
              state.faqListing.child_sections = item.child_sections;
              state.faqListing.property = item.property;
              break;
            default:
              break;
          }
        });
      }),
      false,
      "set_home"
    );
  },
});
export default faqSlice;

"use client";

import { produce } from "immer";

const contactSlice = (set, get) => ({
  contactUsBanner: {
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

  contactUsLocation: {
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

  contactUsFooter: {
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

  setContactUs: (data) => {
    set(
      produce((state) => {
        data?.forEach((item) => {
          // Assuming you want to update the home state based on certain conditions
          switch (item.property) {
            case "contactus_banner":
              state.contactUsBanner.key = item.id;
              state.contactUsBanner.id = item.id;
              state.contactUsBanner.parentID = item.parent_type_id;
              state.contactUsBanner.section_heading = item.section_heading;
              state.contactUsBanner.content = item.content;
              state.contactUsBanner.slides = item.section_images;
              state.contactUsBanner.child_sections = item.child_sections;
              state.contactUsBanner.property = item.property;
              break;
            case "contactus_location":
              state.contactUsLocation.key = item.id;
              state.contactUsLocation.id = item.id;
              state.contactUsLocation.parentID = item.parent_type_id;
              state.contactUsLocation.section_heading = item.section_heading;
              state.contactUsLocation.content = item.content;
              state.contactUsLocation.slides = item.section_images;
              state.contactUsLocation.child_sections = item.child_sections;
              state.contactUsLocation.property = item.property;
              break;
            case "contactus_footer":
              state.contactUsFooter.key = item.id;
              state.contactUsFooter.id = item.id;
              state.contactUsFooter.parentID = item.parent_type_id;
              state.contactUsFooter.section_heading = item.section_heading;
              state.contactUsFooter.content = item.content;
              state.contactUsFooter.slides = item.section_images;
              state.contactUsFooter.child_sections = item.child_sections;
              state.contactUsFooter.property = item.property;
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

export default contactSlice;

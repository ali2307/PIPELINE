"use client";

import { produce } from "immer";

const blogSlice = (set, get) => ({
  blogBanner: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  blogTrending: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  blogListing: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },

  blogFooter: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },

  setBlog: (data) => {
    set(
      produce((state) => {
        data.forEach((item) => {
          // Assuming you want to update the home state based on certain conditions
          switch (item.property) {
            case "blog_banner":
              state.blogBanner.key = item.id;
              state.blogBanner.id = item.id;
              state.blogBanner.parentID = item.parent_type_id;
              state.blogBanner.title = item.section_heading;
              state.blogBanner.content = item.content;
              state.blogBanner.slides = item.section_images;
              state.blogBanner.carditem = item.child_sections;
              state.blogBanner.property = item.property;

              break;
            case "blog_trending":
              state.blogTrending.key = item.id;
              state.blogTrending.id = item.id;
              state.blogTrending.parentID = item.parent_type_id;
              state.blogTrending.title = item.section_heading;
              state.blogTrending.content = item.content;
              state.blogTrending.slides = item.section_images;
              state.blogTrending.carditem = item.child_sections;
              state.blogTrending.property = item.property;
              break;
            case "blog_listing":
              state.blogListing.key = item.id;
              state.blogListing.id = item.id;
              state.blogListing.parentID = item.parent_type_id;
              state.blogListing.title = item.section_heading;
              state.blogListing.content = item.content;
              state.blogListing.slides = item.section_images;
              state.blogListing.carditem = item.child_sections;
              state.blogListing.property = item.property;
              break;
            case "blog_footer":
              state.blogFooter.key = item.id;
              state.blogFooter.id = item.id;
              state.blogFooter.parentID = item.parent_type_id;
              state.blogFooter.title = item.section_heading;
              state.blogFooter.content = item.content;
              state.blogFooter.slides = item.section_images;
              state.blogFooter.carditem = item.child_sections;
              state.blogFooter.property = item.property;
              break;
            // Add cases for other properties as needed
            default:
              break;
          }
        });
      }),
      false,
      "set_home"
    );
  },
  blogViewBanner: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
    subtitle: [],
    created_at: "",
  },
  blogViewDiscover: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },

  setBlogView: (data) => {
    set(
      produce((state) => {
        data.forEach((item) => {
          // Assuming you want to update the home state based on certain conditions
          switch (item.property) {
            case "blogview_blog":
              state.blogViewBanner.key = item.id;
              state.blogViewBanner.id = item.id;
              state.blogViewBanner.parentID = item.parent_type_id;
              state.blogViewBanner.title = item.title;
              state.blogViewBanner.content = item.content;
              state.blogViewBanner.slides = item.section_images;
              state.blogViewBanner.carditem = item.child_sections;
              state.blogViewBanner.property = item.property;
              state.blogViewBanner.subtitle = item.sub_heading;
              state.blogViewBanner.created_at = item.created_at;

              break;
            case "blogview_discovermore":
              state.blogViewDiscover.key = item.id;
              state.blogViewDiscover.id = item.id;
              state.blogViewDiscover.parentID = item.parent_type_id;
              state.blogViewDiscover.title = item.section_heading;
              state.blogViewDiscover.content = item.content;
              state.blogViewDiscover.slides = item.section_images;
              state.blogViewDiscover.carditem = item.child_sections;
              state.blogViewDiscover.property = item.property;
              break;
            // Add cases for other properties as needed
            default:
              break;
          }
        });
      })
    );
  },
});
export default blogSlice;

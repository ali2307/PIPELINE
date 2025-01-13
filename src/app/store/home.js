"use client";

import { produce } from "immer";

const homeSlice = (set, get) => ({
  homeBanner: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    video: "",
    isImage: false,
    isVideo: false,
    propertyType: [],
    priceRange: [],
  },
  homeAbout: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
  },
  homeProperty: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
  },
  homeExplore: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    video: "",
    isImage: false,
    isVideo: false,
    propertyType: [],
    thumbnail: [],
  },
  homeFuture: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    subtitle: [],
    carditem: [],
  },
  homeTestimonial: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    multipleContent: [],
    carditem: [],
  },
  homeBlog: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
  },
  homeFooter: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
  },

  setHome: (data) => {
    set(
      produce((state) => {
        data.forEach((item) => {
          // Assuming you want to update the home state based on certain conditions
          switch (item.property) {
            case "home_banner":
              state.homeBanner.key = item.id;
              state.homeBanner.id = item.id;
              state.homeBanner.parentID = item.parent_type_id;
              state.homeBanner.title = item.section_heading;
              state.homeBanner.content = item.content;
              state.homeBanner.slides = item.section_images;
              state.homeBanner.video = item.section_videos;
              state.homeBanner.isImage = item.is_image;
              state.homeBanner.isVideo = item.is_video;
              state.homeBanner.propertyType = item.property_type;
              state.homeBanner.priceRange = item.price_range;
              break;
            case "home_about":
              state.homeAbout.key = item.id;
              state.homeAbout.id = item.id;
              state.homeAbout.parentID = item.parent_type_id;
              state.homeAbout.title = item.section_heading;
              state.homeAbout.content = item.content;
              state.homeAbout.slides = item.section_images;
              state.homeAbout.redirectionUrl = item.redirection_url;
              break;
            case "home_property":
              state.homeProperty.key = item.id;
              state.homeProperty.id = item.id;
              state.homeProperty.parentID = item.parent_type_id;
              state.homeProperty.title = item.section_heading;
              state.homeProperty.content = item.content;
              state.homeProperty.slides = item.section_images;
              state.homeProperty.redirectionUrl = item.redirection_url;
              state.homeProperty.carditem = item.child_sections;
              break;
            case "home_explore":
              state.homeExplore.key = item.id;
              state.homeExplore.id = item.id;
              state.homeExplore.parentID = item.parent_type_id;
              state.homeExplore.title = item.section_heading;
              state.homeExplore.content = item.content;
              state.homeExplore.slides = item.section_images;
              state.homeExplore.redirectionUrl = item.redirection_url;
              state.homeExplore.video = item.section_videos;
              state.homeExplore.isImage = item.is_image;
              state.homeExplore.isVideo = item.is_video;
              state.homeExplore.propertyType = item.property_type;
              state.homeExplore.thumbnail = item.featured_images;
              break;
            case "home_future":
              state.homeFuture.key = item.id;
              state.homeFuture.id = item.id;
              state.homeFuture.parentID = item.parent_type_id;
              state.homeFuture.title = item.section_heading;
              state.homeFuture.content = item.content;
              state.homeFuture.slides = item.section_images;
              state.homeFuture.subtitle = item.sub_heading;
              state.homeFuture.redirectionUrl = item.redirection_url;
              state.homeFuture.carditem = item.child_sections;
              break;
            case "home_testimonial":
              state.homeTestimonial.key = item.id;
              state.homeTestimonial.id = item.id;
              state.homeTestimonial.parentID = item.parent_type_id;
              state.homeTestimonial.title = item.section_heading;
              state.homeTestimonial.content = item.content;
              state.homeTestimonial.slides = item.section_images;
              state.homeTestimonial.carditem = item.child_sections;
              break;
            case "home_blog":
              state.homeBlog.key = item.id;
              state.homeBlog.id = item.id;
              state.homeBlog.parentID = item.parent_type_id;
              state.homeBlog.title = item.section_heading;
              state.homeBlog.content = item.content;
              state.homeBlog.slides = item.section_images;
              state.homeBlog.carditem = item.child_sections;
              state.homeBlog.redirectionUrl = item.redirection_url;
              break;
            case "home_footer":
              state.homeFooter.key = item.id;
              state.homeFooter.id = item.id;
              state.homeFooter.parentID = item.parent_type_id;
              state.homeFooter.title = item.section_heading;
              state.homeFooter.content = item.content;
              state.homeFooter.slides = item.section_images;
              state.homeFooter.redirectionUrl = item.redirection_url;
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
});
export default homeSlice;

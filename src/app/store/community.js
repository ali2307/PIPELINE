"use client";

import { produce } from "immer";

const communitySlice = (set, get) => ({
  communityViewBanner: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
    subtitle: [],
    video: "",
    isImage: false,
    isVideo: false,
    projectSlug: "",
  },
  communityViewAbout: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  communityViewSustanability: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  communityViewAmenities: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
    subtitle: [],
  },
  communitytViewDiscover: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
    subtitle: [],
    video:[],
    thumbnail: [],
  },
  communityViewAvailability: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  communityViewGallery: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  communityViewEnquiry: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
    location:[]
  },

  setCommunity: (data) => {
    set(
      produce((state) => {
        data.forEach((item) => {
          switch (item.property) {
            case "communityview_banner":
              state.communityViewBanner.key = item.id;
              state.communityViewBanner.id = item.id;
              state.communityViewBanner.parentID = item.parent_type_id;
              state.communityViewBanner.title = item.section_heading;
              state.communityViewBanner.content = item.content;
              state.communityViewBanner.slides = item.section_images;
              state.communityViewBanner.carditem = item.child_sections;
              state.communityViewBanner.property = item.property;
              state.communityViewBanner.subtitle = item.sub_heading;
              state.communityViewBanner.video = item.section_videos;
              state.communityViewBanner.isImage = item.is_image;
              state.communityViewBanner.isVideo = item.is_video;
              state.communityViewBanner.projectSlug = item.project_slug;

              break;
            case "communityview_about":
              state.communityViewAbout.key = item.id;
              state.communityViewAbout.id = item.id;
              state.communityViewAbout.parentID = item.parent_type_id;
              state.communityViewAbout.title = item.section_heading;
              state.communityViewAbout.content = item.content;
              state.communityViewAbout.slides = item.section_images;
              state.communityViewAbout.carditem = item.child_sections;
              state.communityViewAbout.property = item.property;
              break;
            case "communityview_sustanability":
              state.communityViewSustanability.key = item.id;
              state.communityViewSustanability.id = item.id;
              state.communityViewSustanability.parentID = item.parent_type_id;
              state.communityViewSustanability.title = item.section_heading;
              state.communityViewSustanability.content = item.content;
              state.communityViewSustanability.slides = item.section_images;
              state.communityViewSustanability.carditem = item.child_sections;
              state.communityViewSustanability.property = item.property;
              break;
            case "communityview_amenities":
              state.communityViewAmenities.key = item.id;
              state.communityViewAmenities.id = item.id;
              state.communityViewAmenities.parentID = item.parent_type_id;
              state.communityViewAmenities.title = item.section_heading;
              state.communityViewAmenities.content = item.content;
              state.communityViewAmenities.slides = item.section_images;
              state.communityViewAmenities.carditem = item.child_sections;
              state.communityViewAmenities.property = item.property;
              state.communityViewAmenities.subtitle = item.sub_heading;
              break;
            case "communityview_discover":
              state.communitytViewDiscover.key = item.id;
              state.communitytViewDiscover.id = item.id;
              state.communitytViewDiscover.parentID = item.parent_type_id;
              state.communitytViewDiscover.title = item.section_heading;
              state.communitytViewDiscover.content = item.content;
              state.communitytViewDiscover.slides = item.section_images;
              state.communitytViewDiscover.carditem = item.child_sections;
              state.communitytViewDiscover.property = item.property;
              state.communitytViewDiscover.subtitle = item.sub_heading;
              state.communitytViewDiscover.video = item.section_videos;
              state.communitytViewDiscover.thumbnail = item.featured_images;
              
              break;
            case "communityview_availability":
              state.communityViewAvailability.key = item.id;
              state.communityViewAvailability.id = item.id;
              state.communityViewAvailability.parentID = item.parent_type_id;
              state.communityViewAvailability.title = item.section_heading;
              state.communityViewAvailability.content = item.content;
              state.communityViewAvailability.slides = item.section_images;
              state.communityViewAvailability.carditem = item.child_sections;
              state.communityViewAvailability.property = item.property;
              break;
            case "communityview_gallery":
              state.communityViewGallery.key = item.id;
              state.communityViewGallery.id = item.id;
              state.communityViewGallery.parentID = item.parent_type_id;
              state.communityViewGallery.title = item.section_heading;
              state.communityViewGallery.content = item.content;
              state.communityViewGallery.slides = item.section_images;
              state.communityViewGallery.carditem = item.child_sections;
              state.communityViewGallery.property = item.property;
              break;
            case "communityview_enquiry":
              state.communityViewEnquiry.key = item.id;
              state.communityViewEnquiry.id = item.id;
              state.communityViewEnquiry.parentID = item.parent_type_id;
              state.communityViewEnquiry.title = item.section_heading;
              state.communityViewEnquiry.content = item.content;
              state.communityViewEnquiry.slides = item.section_images;
              state.communityViewEnquiry.carditem = item.child_sections;
              state.communityViewEnquiry.property = item.property;
              state.communityViewEnquiry.location = item.locations;
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
export default communitySlice;

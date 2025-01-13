"use client";

import { produce } from "immer";

const projectSlice = (set, get) => ({
  projectViewBanner: {
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
  },
  projectViewFeatures: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  projectViewAminities: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  projectViewCommunity: {
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
  projectViewExplore: {
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
  projectViewLocation: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  projectViewUpcoming: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },

  setProject: (data) => {
    set(
      produce((state) => {
        data.forEach((item) => {
          // Assuming you want to update the home state based on certain conditions
          switch (item.property) {
            case "projectview_banner":
              state.projectViewBanner.key = item.id;
              state.projectViewBanner.id = item.id;
              state.projectViewBanner.parentID = item.parent_type_id;
              state.projectViewBanner.title = item.section_heading;
              state.projectViewBanner.content = item.content;
              state.projectViewBanner.slides = item.section_images;
              state.projectViewBanner.carditem = item.child_sections;
              state.projectViewBanner.property = item.property;
              state.projectViewBanner.subtitle = item.sub_heading;
              state.projectViewBanner.video = item.section_videos;
              state.projectViewBanner.isImage = item.is_image;
              state.projectViewBanner.isVideo = item.is_video;

              break;
            case "projectview_features":
              state.projectViewFeatures.key = item.id;
              state.projectViewFeatures.id = item.id;
              state.projectViewFeatures.parentID = item.parent_type_id;
              state.projectViewFeatures.title = item.section_heading;
              state.projectViewFeatures.content = item.content;
              state.projectViewFeatures.slides = item.section_images;
              state.projectViewFeatures.carditem = item.child_sections;
              state.projectViewFeatures.property = item.property;
              break;
            case "projectview_amenities":
              state.projectViewAminities.key = item.id;
              state.projectViewAminities.id = item.id;
              state.projectViewAminities.parentID = item.parent_type_id;
              state.projectViewAminities.title = item.section_heading;
              state.projectViewAminities.content = item.content;
              state.projectViewAminities.slides = item.section_images;
              state.projectViewAminities.carditem = item.child_sections;
              state.projectViewAminities.property = item.property;
              break;
            case "projectview_community":
              state.projectViewCommunity.key = item.id;
              state.projectViewCommunity.id = item.id;
              state.projectViewCommunity.parentID = item.parent_type_id;
              state.projectViewCommunity.title = item.section_heading;
              state.projectViewCommunity.content = item.content;
              state.projectViewCommunity.slides = item.section_images;
              state.projectViewCommunity.carditem = item.child_sections;
              state.projectViewCommunity.property = item.property;
              state.projectViewCommunity.subtitle = item.sub_heading;
              break;
            case "projectview_explore":
              state.projectViewExplore.key = item.id;
              state.projectViewExplore.id = item.id;
              state.projectViewExplore.parentID = item.parent_type_id;
              state.projectViewExplore.title = item.section_heading;
              state.projectViewExplore.content = item.content;
              state.projectViewExplore.slides = item.section_images;
              state.projectViewExplore.carditem = item.child_sections;
              state.projectViewExplore.property = item.property;
              state.projectViewExplore.subtitle = item.sub_heading;
              break;
            case "projectview_location":
              state.projectViewLocation.key = item.id;
              state.projectViewLocation.id = item.id;
              state.projectViewLocation.parentID = item.parent_type_id;
              state.projectViewLocation.title = item.section_heading;
              state.projectViewLocation.content = item.content;
              state.projectViewLocation.slides = item.section_images;
              state.projectViewLocation.carditem = item.child_sections;
              state.projectViewLocation.property = item.property;
              break;
            case "projectview_upcoming":
              state.projectViewUpcoming.key = item.id;
              state.projectViewUpcoming.id = item.id;
              state.projectViewUpcoming.parentID = item.parent_type_id;
              state.projectViewUpcoming.title = item.section_heading;
              state.projectViewUpcoming.content = item.content;
              state.projectViewUpcoming.slides = item.section_images;
              state.projectViewUpcoming.carditem = item.child_sections;
              state.projectViewUpcoming.property = item.property;
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
export default projectSlice;

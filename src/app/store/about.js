"use client";

import { produce } from "immer";

const aboutSlice = (set, get) => ({
  aboutBanner: {
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
  aboutChairman: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  aboutDestinationBanner: {
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

  aboutDestination: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  aboutProperty: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
    redirectionUrl: ""
  },
  aboutMissionVission: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
    final:[],
  },
  aboutTeam: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  aboutFooter: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },

  setAbout: (data) => {
    set(
      produce((state) => {
        data.forEach((item) => {
          // Assuming you want to update the home state based on certain conditions
          switch (item.property) {
            case "about_banner":
              state.aboutBanner.key = item.id;
              state.aboutBanner.id = item.id;
              state.aboutBanner.parentID = item.parent_type_id;
              state.aboutBanner.title = item.section_heading;
              state.aboutBanner.content = item.content;
              state.aboutBanner.slides = item.section_images;
              state.aboutBanner.carditem = item.child_sections;
              state.aboutBanner.property = item.property;
              state.aboutBanner.subtitle = item.sub_heading;
              state.aboutBanner.video = item.section_videos;
              state.aboutBanner.isImage = item.is_image;
              state.aboutBanner.isVideo = item.is_video;

              break;
            case "about_chairman":
              state.aboutChairman.key = item.id;
              state.aboutChairman.id = item.id;
              state.aboutChairman.parentID = item.parent_type_id;
              state.aboutChairman.title = item.section_heading;
              state.aboutChairman.content = item.content;
              state.aboutChairman.slides = item.section_images;
              state.aboutChairman.carditem = item.child_sections;
              state.aboutChairman.property = item.property;
              break;
            case "about_destinationbanner":
              state.aboutDestinationBanner.key = item.id;
              state.aboutDestinationBanner.id = item.id;
              state.aboutDestinationBanner.parentID = item.parent_type_id;
              state.aboutDestinationBanner.title = item.section_heading;
              state.aboutDestinationBanner.content = item.content;
              state.aboutDestinationBanner.slides = item.section_images;
              state.aboutDestinationBanner.carditem = item.child_sections;
              state.aboutDestinationBanner.property = item.property;
              break;
            case "about_destination":
              state.aboutDestination.key = item.id;
              state.aboutDestination.id = item.id;
              state.aboutDestination.parentID = item.parent_type_id;
              state.aboutDestination.title = item.section_heading;
              state.aboutDestination.content = item.content;
              state.aboutDestination.slides = item.section_images;
              state.aboutDestination.carditem = item.child_sections;
              state.aboutDestination.property = item.property;

              break;
            case "about_property":
              state.aboutProperty.key = item.id;
              state.aboutProperty.id = item.id;
              state.aboutProperty.parentID = item.parent_type_id;
              state.aboutProperty.title = item.section_heading;
              state.aboutProperty.content = item.content;
              state.aboutProperty.slides = item.section_images;
              state.aboutProperty.carditem = item.child_sections;
              state.aboutProperty.property = item.property;
              state.aboutProperty.redirectionUrl = item.redirection_url;

              break;
            case "mission_vision":
              state.aboutMissionVission.key = item.id;
              state.aboutMissionVission.id = item.id;
              state.aboutMissionVission.parentID = item.parent_type_id;
              state.aboutMissionVission.title = item.section_heading;
              state.aboutMissionVission.content = item.content;
              state.aboutMissionVission.slides = item.section_images;
              state.aboutMissionVission.carditem = item.child_sections;
              state.aboutMissionVission.property = item.property;
              state.aboutMissionVission.final = item.final;

              break;
            case "about_team":
              state.aboutTeam.key = item.id;
              state.aboutTeam.id = item.id;
              state.aboutTeam.parentID = item.parent_type_id;
              state.aboutTeam.title = item.section_heading;
              state.aboutTeam.content = item.content;
              state.aboutTeam.slides = item.section_images;
              state.aboutTeam.carditem = item.child_sections;
              state.aboutTeam.property = item.property;
              break;
            case "about_footer":
              state.aboutFooter.key = item.id;
              state.aboutFooter.id = item.id;
              state.aboutFooter.parentID = item.parent_type_id;
              state.aboutFooter.title = item.section_heading;
              state.aboutFooter.content = item.content;
              state.aboutFooter.slides = item.section_images;
              state.aboutFooter.carditem = item.child_sections;
              state.aboutFooter.property = item.property;
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
export default aboutSlice;

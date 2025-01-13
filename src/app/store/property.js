"use client";

import { produce } from "immer";
import { boolean } from "yup";

const propertySlice = (set, get) => ({
  propertyBanner: {
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
  propertyListing: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  propertyFooter: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  setProperty: (data) => {
    set(
      produce((state) => {
        data.forEach((item) => {
          // Assuming you want to update the home state based on certain conditions
          switch (item.property) {
            case "property_banner":
              state.propertyBanner.key = item.id;
              state.propertyBanner.id = item.id;
              state.propertyBanner.parentID = item.parent_type_id;
              state.propertyBanner.title = item.section_heading;
              state.propertyBanner.content = item.content;
              state.propertyBanner.slides = item.section_images;
              state.propertyBanner.carditem = item.child_sections;
              state.propertyBanner.property = item.property;
              state.propertyBanner.subtitle = item.sub_heading;

              break;
            case "property_listing":
              state.propertyListing.key = item.id;
              state.propertyListing.id = item.id;
              state.propertyListing.parentID = item.parent_type_id;
              state.propertyListing.title = item.section_heading;
              state.propertyListing.content = item.content;
              state.propertyListing.slides = item.section_images;
              state.propertyListing.carditem = item.child_sections;
              state.propertyListing.property = item.property;
              break;
            case "property_footer":
              state.propertyFooter.key = item.id;
              state.propertyFooter.id = item.id;
              state.propertyFooter.parentID = item.parent_type_id;
              state.propertyFooter.title = item.section_heading;
              state.propertyFooter.content = item.content;
              state.propertyFooter.slides = item.section_images;
              state.propertyFooter.carditem = item.child_sections;
              state.propertyFooter.property = item.property;
              break;
            // Add cases for other properties as needed
            default:
              break;
          }
        });
      })
    );
  },
  propertyViewBanner: {
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
  propertyViewListing: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
    isWishlist: false,
    isCart: false,
    fevData: [],
    perPage: 10,
    totalPage: 0,
    currentPage: 1,
    checkedlist: [],
    isAllChecked: false,
    propertyType: "all",
  },
  propertyViewFooter: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },

  setPropertyView: (data) => {
    set(
      produce((state) => {
        data.forEach((item) => {
          // Assuming you want to update the home state based on certain conditions
          switch (item.property) {
            case "unit_banner":
              state.propertyViewBanner.key = item.id;
              state.propertyViewBanner.id = item.id;
              state.propertyViewBanner.parentID = item.parent_type_id;
              state.propertyViewBanner.title = item.section_heading;
              state.propertyViewBanner.content = item.content;
              state.propertyViewBanner.slides = item.section_images;
              state.propertyViewBanner.carditem = item.child_sections;
              state.propertyViewBanner.property = item.property;
              state.propertyViewBanner.subtitle = item.sub_heading;

              break;
            case "unit_listing":
              state.propertyViewListing.key = item.id;
              state.propertyViewListing.id = item.id;
              state.propertyViewListing.parentID = item.parent_type_id;
              state.propertyViewListing.title = item.section_heading;
              state.propertyViewListing.content = item.content;
              state.propertyViewListing.slides = item.section_images;
              state.propertyViewListing.carditem = item.child_sections;
              state.propertyViewListing.property = item.property;
              state.propertyViewListing.perPage = item.per_page;
              state.propertyViewListing.totalPage = item.total_pages;
              state.propertyViewListing.currentPage = item.current_page;
              state.propertyViewListing.propertyType = item.property_type;
              break;
            case "unit_footer":
              state.propertyViewFooter.key = item.id;
              state.propertyViewFooter.id = item.id;
              state.propertyViewFooter.parentID = item.parent_type_id;
              state.propertyViewFooter.title = item.section_heading;
              state.propertyViewFooter.content = item.content;
              state.propertyViewFooter.slides = item.section_images;
              state.propertyViewFooter.carditem = item.child_sections;
              state.propertyViewFooter.property = item.property;
              break;
            // Add cases for other properties as needed
            default:
              break;
          }
        });
      })
    );
  },
  unitViewBanner: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
    subtitle: [],
    name: "",
    propertyId: "",
  },
  unitViewDetails: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
    unitDetails: [],
  },
  unitViewProperties: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  unitReview: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
    unitId: "",
    status: false,
  },
  unitViewFooter: {
    key: "",
    id: "",
    parentID: "",
    title: "",
    content: "",
    slides: [],
    carditem: [],
    property: "",
  },
  setUnitView: (data) => {
    set(
      produce((state) => {
        data.forEach((item) => {
          // Assuming you want to update the home state based on certain conditions'
          switch (item.property) {
            case "unitview_banner":
              state.unitViewBanner.key = item.id;
              state.unitViewBanner.id = item.id;
              state.unitViewBanner.parentID = item.parent_type_id;
              state.unitViewBanner.title = item.section_heading;
              state.unitViewBanner.content = item.content;
              state.unitViewBanner.slides = item.section_images;
              state.unitViewBanner.carditem = item.child_sections;
              state.unitViewBanner.property = item.property;
              state.unitViewBanner.subtitle = item.sub_heading;

              break;
            case "unitview_details":
              state.unitViewDetails.key = item.id;
              state.unitViewDetails.id = item.id;
              state.unitViewDetails.parentID = item.parent_type_id;
              state.unitViewDetails.title = item.section_heading;
              state.unitViewDetails.content = item.content;
              state.unitViewDetails.slides = item.section_images;
              state.unitViewDetails.carditem = item.child_sections;
              state.unitViewDetails.property = item.property;
              state.unitViewDetails.unitDetails = item.unit_details;
              break;
            case "unitview_properties":
              state.unitViewProperties.key = item.id;
              state.unitViewProperties.id = item.id;
              state.unitViewProperties.parentID = item.parent_type_id;
              state.unitViewProperties.title = item.section_heading;
              state.unitViewProperties.content = item.content;
              state.unitViewProperties.slides = item.section_images;
              state.unitViewProperties.carditem = item.child_sections;
              state.unitViewProperties.property = item.property;
              break;
            case "unitview_review":
              state.unitReview.key = item.id;
              state.unitReview.id = item.id;
              state.unitReview.parentID = item.parent_type_id;
              state.unitReview.title = item.section_heading;
              state.unitReview.content = item.content;
              state.unitReview.slides = item.section_images;
              state.unitReview.carditem = item.child_sections;
              state.unitReview.property = item.property;
              break;
            case "unitview_footer":
              state.unitViewFooter.key = item.id;
              state.unitViewFooter.id = item.id;
              state.unitViewFooter.parentID = item.parent_type_id;
              state.unitViewFooter.title = item.section_heading;
              state.unitViewFooter.content = item.content;
              state.unitViewFooter.slides = item.section_images;
              state.unitViewFooter.carditem = item.child_sections;
              state.unitViewFooter.property = item.property;
              break;
            // Add cases for other properties as needed
            default:
              break;
          }
        });
      })
    );
  },
  setUnitId: (data) => {
    set(
      produce((state) => {
        state.unitReview.unitId = data;
      })
    );
  },
  setPropertyDetails: (data) => {
    set(
      produce((state) => {
        state.unitViewBanner.name = data.property_name;
        state.unitViewBanner.propertyId = data.property_id;
      })
    );
  },
  setReviewStatus: (data) => {
    set(
      produce((state) => {
        state.unitReview.status = data;
      })
    );
  },
  setWishlistStatus: (id, isWishlist) => {
    set(
      produce((state) => {
        const item = state.propertyViewListing.fevData.find(
          (item) => item.id === id
        );
        if (item) {
          item.is_wishlist = isWishlist; // Update the specific item's wishlist status
        }

        // Ensure you're updating the whole state, not just part of it
        state.propertyViewListing.isWishlist = isWishlist;
      })
    );
  },
  setCartStatus: (data) => {
    set(
      produce((state) => {
        state.propertyViewListing.isCart = data;
      })
    );
  },
  setFavData: (data) => {
    set(
      produce((state) => {
        state.propertyViewListing.fevData = data;
      })
    );
  },
  setCartData: (data) => {
    set(
      produce((state) => {
        state.propertyViewListing.cartData = data;
      })
    );
  },
  setCurrentPage: (data) => {
    set(
      produce((state) => {
        state.propertyViewListing.currentPage = data;
      })
    );
  },
  setCheckList: (data) => {
    set(
      produce((state) => {
        state.propertyViewListing.checkedlist = data;
      })
    );
  },
  setIsAllChecked: (data) => {
    set(
      produce((state) => {
        state.propertyViewListing.isAllChecked = data;
      })
    );
  },
  searchFilter: {
    filterCarditem: [],
    propertyType: "",
    bedsAndBaths: "",
    price: "",
  },
  setSearchFilterList: (data, serachParam, propertyID) => {
    set(
      produce((state) => {
        if (data) {
          state.searchFilter.filterCarditem = data.data;
          state.propertyViewListing.carditem = data.data;
        } else {
          state.propertyViewListing.carditem = data.data;
        }
        state.searchFilter.carditem = data.data;
        state.propertyViewListing.perPage = data.per_page;
        state.propertyViewListing.totalPage = data.total_pages;
        state.propertyViewListing.currentPage = data.current_page;
        state.searchFilter.propertyType = serachParam.propertyType;
        state.searchFilter.bedsAndBaths = serachParam.bedsAndBaths;
        state.searchFilter.price = serachParam.price;
      })
    );
  },
  cartCompareData: {
    cartCompareData: [],
  },
  setCartCompareData: (data) => {
    set(
      produce((state) => {
        state.cartCompareData.cartCompareData = data;
      })
    );
  },
});
export default propertySlice;

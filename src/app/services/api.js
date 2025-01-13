"use client";

import { apiCaller, uiApiCaller } from "./../utils/util";

export function login(data) {
  return uiApiCaller("/login", "POST", data);
}

export function logout(data) {
  return apiCaller("/logout", "POST", data);
}

export function viewHomePageSections(slug) {
  return uiApiCaller(`/view-home-page?slug=${slug}`, "GET");
}

export function viewSideMenuList() {
  return uiApiCaller(`/web-side-menu`, "GET");
}

// export function viewBlogDetails(id) {
//   return uiApiCaller(`/website-view-detailed-blog?id=${id}`, "GET");
// }

export function registration(data) {
  return uiApiCaller("/register", "POST", data);
}

export function otpVarification(data) {
  return uiApiCaller("/otp-verification", "POST", data);
}

export function userLogin(data) {
  return uiApiCaller("/user-login", "POST", data);
}

export function resendOtp(data) {
  return uiApiCaller("/resend-otp", "POST", data);
}

export function viewPropertyUnits(id, page, perPage) {
  const hasToken = localStorage.getItem("token");
  const apiCallerFunction = hasToken ? apiCaller : uiApiCaller;
  const endpoint = hasToken
    ? `/view-property-unit-with-auth`
    : `/view-property-unit`;
  const queryParams = new URLSearchParams({
    id,
    page,
    limit: perPage,
  }).toString();
  return apiCallerFunction(`${endpoint}?${queryParams}`, "GET");
}
// view-property-unit?id=103&page=1&limit=1

export function viewDetailedUnit(id) {
  const hasToken = localStorage.getItem("token");
  const apiCallerFunction = hasToken ? apiCaller : uiApiCaller;
  const endpoint = hasToken
    ? `/web-detailed-unit-view-with-auth`
    : `/web-detailed-unit-view`;
  const queryParams = new URLSearchParams({
    slug: id,
  }).toString();
  return apiCallerFunction(`${endpoint}?${queryParams}`, "GET");
}

export function getSessionData(data) {
  return apiCaller("/session-details", "GET", data);
}

export function userProfile() {
  return apiCaller("/user-profile", "GET");
}

export function fetchStates(id) {
  return apiCaller(`/get-states?country_id=${id}`, "GET");
}

export function updateUserProfile(data) {
  return apiCaller(`/update-user-account`, "POST", data);
}

export function addUserReview(data) {
  return apiCaller("/add-user-review", "POST", data);
}
export function changeProfilePhoto(data) {
  return apiCaller("/change-profile-photo", "POST", data);
}

export function subscriptionEmail(data) {
  return uiApiCaller("/subscribe", "POST", data);
}

export function resetPasswordOtpVarification(data) {
  return uiApiCaller("/forgot-password", "POST", data);
}

export function forgotPasswordOtpVarification(data) {
  return uiApiCaller("/password-otp-verification", "POST", data);
}

export function resetUpdate(data) {
  return uiApiCaller("/reset-password", "POST", data);
}

export function resendOtpForgotPassword(data) {
  return uiApiCaller("/resend-otp-password", "POST", data);
}
//project
export function projectViewSections(slug, name) {
  return uiApiCaller(
    `/web-project-view-sections?slug=${slug}&name=${name}`,
    "GET"
  );
}

export function addEnquiry(data) {
  return uiApiCaller("/enquiry", "POST", data);
}

export function fetchUnits(
  propertyType,
  price,
  effectivebedsAndBathsParams,
  selectedPageNumber,
  perPage,
  communityId,
  finalFilterData
) {
  const communityParam = communityId ? `${communityId}` : "";
  const hasToken = localStorage.getItem("token");
  const apiCallerFunction = hasToken ? apiCaller : uiApiCaller;

  if (Object.keys(finalFilterData).length > 0) {
    const formData = new FormData();
    Object.entries(finalFilterData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const endpoint = hasToken ? `/auth-unit-search` : `/web-unit-search`;
    return apiCallerFunction(`${endpoint}`, "POST", formData);
  }

  // Fallback to GET request when no finalFilterData
  const queryParams = new URLSearchParams({
    propertyType,
    price,
    bedsAndBaths: effectivebedsAndBathsParams,
    page: selectedPageNumber,
    limit: perPage,
    community_id: communityParam,
  }).toString();

  const endpoint = hasToken ? `/auth-unit-search` : `/web-unit-search`;
  return apiCallerFunction(`${endpoint}?${queryParams}`, "POST");
}

export function addtoWishlist(unit_id) {
  return apiCaller(`/add-to-wishlist?unit_id=${unit_id}`, "POST");
}

export function addtoCart(unit_id) {
  return apiCaller(`/add-to-cart?unit_id=${unit_id}`, "POST");
}

export function Wishlist() {
  return apiCaller(`/view-all-wishlist`, "GET");
}

export function cartList() {
  return apiCaller(`/view-all-cart`, "GET");
}

export function removeFromCart(unit_id) {
  return apiCaller(`/remove-from-cart?unit_id=${unit_id}`, "DELETE");
}

export function removeAllFromWishlistAndCart(data, lastSegment) {
  const requestData = {
    ...data,
    key: lastSegment,
  };
  return apiCaller("/remove-from-cart-and-wishlist", "POST", requestData);
}

export function compareUnits(data) {
  return apiCaller("/compare-units", "POST", data);
}
export function SearchFliterUnit(data) {
  const hasToken = localStorage.getItem("token");
  const apiCallerFunction = hasToken ? apiCaller : uiApiCaller;
  const endpoint = hasToken ? `/auth-unit-search` : `/web-unit-search`;
  return apiCallerFunction(`${endpoint}`, "POST", data);
}
export function FlilterListData(propertyType, slug) {
  return uiApiCaller(
    `/web-list-filter-data?propertyType=${propertyType}&slug=${slug}`,
    "GET"
  );
}

export function FilterOptions() {
  return apiCaller(`/filter-options`, "GET");
}

export function GetDocumentType(type) {
  return apiCaller(`/get-document-type?type=${type}`, "GET");
}

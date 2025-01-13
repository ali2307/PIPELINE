"use client";

import { produce } from "immer";

const commonSlice = (set, get) => ({
  session: {
    token: "",
    userId: "",
    email: "",
    name: "",
    userType: "",
    userImage: "",
    isLogin: false,
    status_flag: false,
    favourites: 0,
    cart: 0,
  },

  setSession: (data) => {
    if (data.data.data.token) {
      localStorage.setItem("token", data.data.data.token || "");
      localStorage.setItem("userType", data.data.data.user_type || "");
      localStorage.setItem("expires_at", data.data.data.expires_at || "");
    } else {
      localStorage.removeItem("token", data.data.data.token || "");
      localStorage.removeItem("userType", data.data.data.user_type || "");
      localStorage.removeItem("expires_at", data.data.data.expires_at || "");
    }
    set(
      produce((state) => {
        state.session.token = data.data.data.token;
        state.session.userId = data.data.data.user_id;
        state.session.email = data.data.data.email;
        state.session.name = data.data.data.name;
        state.session.userType = data.data.data.user_type;
        state.session.userImage = data.data.data.user_image;
        state.session.isLogin = true;
      }),
      false,
      "set_session"
    );
  },
  setIsLogin: (flag, res) => {
    set(
      produce((state) => {
        state.session.isLogin = flag; //true fasle
        state.session.userId = res?.data.data.user_profile.user_id;
        state.session.email = res?.data.data.user_profile.email;
        state.session.name = res?.data.data.user_profile.name;
        state.session.userType = res?.data.data.user_profile.user_type;
        state.session.userImage = res?.data.data.user_profile.user_image;
        state.session.favourites = res?.data.data.user_profile.wishlist;
        state.session.cart = res?.data.data.user_profile.cartlist;
      })
    );
  },
  setProfileFlag: (data) => {
    set(
      produce((state) => {
        state.session.status_flag = data;
      })
    );
  },
  globalLoader: false,
  sidebarTab: 0,

  toggleHomeSidebar: (tab) => {
    set(
      produce((state) => {
        state.sidebarTab = tab || 0;
      }),
      false,
      "toggle_home_sidebar"
    );
  },

  showSpinner: () => {
    set(
      produce((state) => {
        state.globalLoader = true;
      }),
      false,
      "show_spinner"
    );
  },

  hideSpinner: () => {
    set(
      produce((state) => {
        state.globalLoader = false;
      }),
      false,
      "hide_spinner"
    );
  },
  sideBarList: {
    sideBarList: [],
  },
  setSideBarList: (data) => {
    set(
      produce((state) => {
        state.sideBarList.sideBarList = data;
      })
    );
  },
  menuItems: {
    menuItemsList: [],
  },
  setMenuItemsList: (data) => {
    set(
      produce((state) => {
        state.menuItems.menuItemsList = data;
      })
    );
  },
  profile: {
    address: "",
    company: "",
    email: "",
    facebook_url: "",
    instagram_url: "",
    is_erp_integrated: false,
    logo: [],
    phone: "",
    twitter_url: "",
  },
  setCompanyProfile: (data) => {
    set(
      produce((state) => {
        state.profile.address = data.address;
        state.profile.company = data.company;
        state.profile.email = data.email;
        state.profile.facebook_url = data.facebook_url;
        state.profile.instagram_url = data.instagram_url;
        state.profile.is_erp_integrated = data.is_erp_integrated;
        state.profile.logo = data.logo;
        state.profile.phone = data.phone;
        state.profile.twitter_url = data.twitter_url;
        state.profile.locations = data.locations;
      })
    );
  },

  registrationDetails: {
    email: "",
    id: "",
  },
  setRegistrationDetails: (data) => {
    set(
      produce((state) => {
        state.registrationDetails.email = data.email;
        state.registrationDetails.id = data.id;
      })
    );
  },
  accountDetails: {
    userdata: {},
  },
  setAccountDetails: (data) => {
    set(
      produce((state) => {
        state.accountDetails.userdata = data;
      })
    );
  },
  finalFilterData:{
    finalFilterData: []
  },
  setFinalFilterData: (data) => {
    set(
      produce((state) => {
        state.finalFilterData.finalFilterData = data;
      })
    );
  },
});
export default commonSlice;

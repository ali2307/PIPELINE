"use client";

import { create } from "zustand";

import commonSlice from "./common";
import homeSlice from "./home";
import blogSlice from "./blog";
import aboutSlice from "./about";
import propertySlice from "./property";
import faqSlice from "./faq";
import projectSlice from "./project";
import communitySlice from "./community";
import contactSlice from "./contact"

export const useStore = create((...a) => ({
  ...commonSlice(...a),
  ...homeSlice(...a),
  ...blogSlice(...a),
  ...aboutSlice(...a),
  ...propertySlice(...a),
  ...faqSlice(...a),
  ...projectSlice(...a),
  ...communitySlice(...a),
  ...contactSlice(...a)
}));

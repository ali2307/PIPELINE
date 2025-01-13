"use client";

import axios from "axios";
import * as Yup from "yup";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function apiCaller(path = "", method = "GET", data = {}, opts = {}) {
  const headers = {};

  if (localStorage.getItem("token") && localStorage.getItem("expires_at")) {
    const expiryTime = localStorage.getItem("expires_at");

    const currentTime = Date.now() / 1000;
    if (expiryTime < currentTime) {
      // Token has expired
      localStorage.removeItem("token");
      localStorage.removeItem("expires_at");
      // localStorage.removeItem("userType");
      window.location.href = "home"; // Redirect to login page
      return Promise.reject(new Error("session expired"));
    }

    headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    headers["Content-Type"] = "application/json";
    headers["Content-Type"] = "multipart/form-data";
  }

  return axios({
    method: method,
    url: `${apiUrl}${path}`,
    data: data,
    headers,
  });
}

function uiApiCaller(path = "", method = "GET", data = {}, opts = {}) {
  const headers = {
    "Content-Type": "application/problem",
  };

  return axios({
    method: method,
    url: `${apiUrl}${path}`,
    data: data,
    headers,
  });
}

// ---------------validation Schema----------------
const urlValidation = Yup.string().url().required();

const phoneNumberValidation = Yup.string().matches(
  /^(\+?\d{1,4}[\s-]?)?(\(?\d{1,3}\)?[\s-]?)?[\d\s-]{5,15}$/,
  "Invalid phone number format"
);

const nameValidation = Yup.string()
  .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
  .min(2, "Name must be at least 2 characters long")
  .max(50, "Name must be at most 50 characters long")
  .required("Name is required");

const passwordSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  // .min(8, "Password must be at least 8 characters long"),
  // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .matches(/\d/, "Password must contain at least one number")
  // .matches(
  //   /[!@#$%^&*(),.?":{}|<>]/,
  //   "Password must contain at least one special character"
  // )

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

// ---------------validation Schema----------------

const handleOtpChange = (index, event, otpRefs) => {
  const value = event.target.value;
  if (value.length === 1 && index < otpRefs.current.length - 1) {
    otpRefs.current[index + 1]?.focus();
  } else if (value.length === 0 && index > 0) {
    otpRefs.current[index - 1]?.focus();
  }
};

const handleKeyDown = (index, event, otpRefs) => {
  if (
    event.key === "Backspace" &&
    index > 0 &&
    !otpRefs.current[index]?.value
  ) {
    otpRefs.current[index - 1]?.focus();
  }
};

const formatString = (str) =>
  str
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // formating string to uppercase and remove _
    .join(" ");

export {
  handleKeyDown,
  handleOtpChange,
  passwordSchema,
  nameValidation,
  phoneNumberValidation,
  urlValidation,
  apiCaller,
  uiApiCaller,
  formatString,
};

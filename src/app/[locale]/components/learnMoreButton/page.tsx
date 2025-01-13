// components/LearnMoreButton.js
"use client";
import React from "react";
import Link from "next/link";
interface LearnButton {
  redirectionUrl?: any;
  buttonText?: any;
  buttonStyles?: any;
}
const LearnMoreButton: React.FC<LearnButton> = ({
  redirectionUrl = "",
  buttonText = "",
  buttonStyles = "",
}) => {
  return (
    <div className="flex justify-center pb-18 items-center">
      <Link
        className={`w-[211px] h-[70px] border border-sky-700 text-sky-700 font-bold rounded-tr-[18px] md:ml-20 flex justify-center items-center ${buttonStyles}`}
        href={redirectionUrl}
      >
        {buttonText}
        <svg
          className="rtl:rotate-180 w-3.5 h-3 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
};

export default LearnMoreButton;

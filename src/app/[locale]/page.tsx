"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import HomePage to improve performance
const HomePage = dynamic(() => import("./home/[[...slug]]/page"), {
  // loading: () => <p>Loading HomePage...</p>,
  ssr: false, // Disable server-side rendering for this component if needed
});

const WrapPage: React.FC = () => {
  return (
    <>
      <HomePage />
    </>
  );
};
export default WrapPage;

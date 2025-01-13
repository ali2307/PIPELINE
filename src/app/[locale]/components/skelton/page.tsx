"use client"; // Ensure client-side rendering

import React from "react";

interface SkeletonProps {
  size?: number; // Optional: Customize the size of the spinner
  color?: string; // Optional: Customize the color
  className?: string; // Op
}

const Skeleton: React.FC<SkeletonProps> = ({
  size = 50,
  color = "border-blue-500",
  className = "",
}) => {
  return (
    <div className={`animate-pulse bg-gray-400 rounded-md ${className}`}></div>
    // <div
    //   className="flex items-center justify-center h-screen
    //      w-full "
    // >
    //   <div
    //     className={`border-4 border-t-transparent  rounded-full animate-spin ${color} ${className}`}
    //     style={{ width: size, height: size }}
    //   />
    // </div>
  );
};

export default Skeleton;

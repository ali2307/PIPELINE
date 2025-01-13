import Link from "next/link";
import React from "react";

interface DynamicButtonProps {
  isPrimary?: boolean;
  isOutline?: boolean;
  children: React.ReactNode;
  link?: string;
  classname?: string;
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  isPrimary,
  link,
  isOutline,
  children,
  classname,
}) => {
  // Compute the className dynamically
  const buttonClasses = [
    `${classname}  `, // Base class
    isPrimary &&
      "text-white  flex justify-center mt-8 items-center text-[17px] bg-[#0670B1] font-bold rounded-tr-[18px] md:mx-0 mx-auto",
    isOutline &&
      " border border-sky-700 text-sky-700 font-bold rounded-tr-[18px] md:ml-20 flex justify-center items-center ",
  ]
    .filter(Boolean) // Remove falsy values
    .join(" "); // Join the classes into a single string

  return (
    <Link href={link ? link : ""} className={buttonClasses}>
      {children}
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
  );
};

export default DynamicButton;

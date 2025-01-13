"use client";
import React from "react";

interface InputProps {
  name: string;
  label: string;
  register: any;
  errors?: Record<string, any>; // Marking errors as optional
  type?: string;
  classname?: string;
}

const InputField: React.FC<InputProps> = ({
  name,
  label,
  register,
  errors,
  type,
  classname,
}) => {
  return (
    <div className="h-24 w-full mx-auto">
      <label className="text-black/opacity-60 text-[14px] font-normal font-['DM Sans'] pl-3">
        {label}
      </label>

      <div>
        <input
          className={`h-[39px] w-full bg-white text-gray-700 outline-none border-gray-300 py-2 px-4 block appearance-none rounded-lg mt-2 ${classname}`}
          autoComplete="off"
          type={type ? type : "text"}
          {...register(name)}
        />
        {errors &&
          errors[name] && ( // Check if errors and errors[name] exist
            <p className="mt-1 text-red-500 text-xs w-64 ml-3">
              {errors[name]?.message}
            </p>
          )}
        {/* <button type="button" className="absolute end-0 flex items-center pe-3">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg> 
          </button> */}
      </div>
    </div>
  );
};

export default InputField;

"use client";
import React, { useState } from "react";

interface InputProps {
  name: string;
  label: string;
  register: any;
  errors?: any; // Marking errors as optional
  type?: string;
  classname?: string;
}

const InputFieldPassword: React.FC<InputProps> = ({
  label,
  type,
  name,
  errors,
  register,
  classname,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-24 w-full flex flex-col justify-start items-start relative md:w-[271px]">
      <label className="text-black/opacity-60 text-[14px] font-normal font-['DM Sans'] pl-3 ">
        {label}
      </label>
      <input
        className={`h-[39px] w-full bg-white text-[14px] text-gray-700 outline-none mt-2 border-gray-300 py-2 px-4 block appearance-none rounded-lg pr-10 ${classname}`}
        type={showPassword ? "text" : "password"}
        {...register(name)}
      />
      {errors &&
        errors[name] && ( // Check if errors and errors[name] exist
          <p className="mt-1 text-red-500 text-xs w-44 ml-3">
            {errors[name]?.message}
          </p>
        )}

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className={
          Object.keys(errors).length === 0
            ? "absolute inset-y-0 right-0 top-0 flex items-center pr-3"
            : "absolute inset-y-12 right-0 flex items-center pr-3"
        }
      >
        {showPassword ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.66644 3.66602L18.3331 18.3327M15.1248 15.3589C13.8849 16.0268 12.4835 16.4993 10.9998 16.4993C7.76335 16.4993 4.91893 14.2515 3.28778 12.6299C2.85722 12.2019 2.64198 11.9879 2.50495 11.5678C2.40722 11.2682 2.40719 10.7304 2.50495 10.4307C2.64201 10.0107 2.85771 9.79622 3.28913 9.36741C4.11127 8.55021 5.24139 7.57431 6.57439 6.80721M17.8748 13.4134C18.18 13.1448 18.4597 12.8806 18.7106 12.6313L18.7133 12.6284C19.1428 12.2015 19.3582 11.9874 19.495 11.5682C19.5927 11.2687 19.5925 10.7306 19.4948 10.431C19.3579 10.0111 19.1424 9.79641 18.7121 9.36869C17.0809 7.74709 14.2362 5.49935 10.9998 5.49935C10.6904 5.49935 10.3846 5.51989 10.0831 5.55846M12.2124 12.3743C11.8892 12.6596 11.4647 12.8327 10.9998 12.8327C9.98724 12.8327 9.16644 12.0119 9.16644 10.9993C9.16644 10.5048 9.36225 10.0562 9.68061 9.72637"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default InputFieldPassword;

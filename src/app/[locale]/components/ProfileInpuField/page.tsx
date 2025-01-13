"use client";
import React from "react";

interface InputProps {
  name: string;
  label: string;
  register: any;
  errors?: Record<string, any>; // Marking errors as optional
  type?: string;
  disabled?: boolean;
}

const ProfileInpuField: React.FC<InputProps> = ({
  name,
  label,
  register,
  errors,
  type,
  disabled,
}) => {
  return (
    <div className="mb-6 md:w-40">
      <label className="block mb-1 text-zinc-500 text-xs text-start font-normal font-['DM Sans'] leading-3">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        {...register(name, { required: true })}
        className="form-input  block w-full shadow-sm p-1 md:w-40 h-[30px] rounded-[5px] border border-[#7d7d87] px-4 py-2 focus:outline-none text-[#3d3434] text-[14px] font-normal"
        readOnly={disabled} // Conditionally set readOnly attribute based on disabled prop
        disabled={disabled} // If you also want to disable the field
      />
      {errors && errors[name] && (
        <p className="mt-1 text-red-500 text-xs">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default ProfileInpuField;

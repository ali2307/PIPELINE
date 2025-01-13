"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import SingleSelect from "../singleSelection/page";
import Link from "next/link";
import { FOUR, ZERO } from "@/app/utils/constants";

interface DocumentsSectionProps {
  control: any;
  register: any;
  setValue?: any;
  getValues?: any;
  name: string;
  handleImageUpload: any;
  docTypes: any;
  errors: any;
  setUserDocCount: any;
  userDocCount: any;
}

const DocumentsSection = ({
  control,
  register,
  setValue,
  getValues,
  name,
  handleImageUpload,
  docTypes,
  errors,
  setUserDocCount,
  userDocCount,
}: DocumentsSectionProps) => {
  const [fileName, setFileName] = useState<string[]>([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });
  let currentDate = new Date();

  if (fields.length === 0) {
    // Get the current date
    let currentDate = new Date();

    // Add 1 day to the current date
    currentDate.setDate(currentDate.getDate() + 1);

    // Append the new item with the updated expiry date
    append({
      doc_name: "",
      doc_type: "",
      issued_by: "",
      issued_date: new Date(),
      expiry_date: currentDate, // Set the expiry date to the next day's date
      doc_file: "",
    });
  }

  const handleAdd = () => {
    if (fields.length < FOUR) {
      setUserDocCount(userDocCount + 1);
      // Get the current date
      let currentDate = new Date();

      // Add 1 day to the current date
      currentDate.setDate(currentDate.getDate() + 1);

      // Append the new item with the calculated expiry date
      append({
        doc_name: "",
        doc_type: "",
        issued_by: "",
        issued_date: new Date(),
        expiry_date: currentDate, // Set the expiry date to the next day's date
        doc_file: "",
      });
    } else {
      toast.error("You can only add up to 4 items.");
    }
  };

  const handleRemove = (index: number) => {
    if (index) {
      setUserDocCount(userDocCount - 1);
      if (index === ZERO) {
      } else {
        remove(index);
      }
    } else {
      toast.error("Atleast one document is required.");
    }
  };

  const updateFileName = (index: number, newValue: string) => {
    const updatedFileNames = [...fileName];
    updatedFileNames[index] = newValue;
    setFileName(updatedFileNames);
  };

  const DateOfIssue = ({ value, onClick }: any) => (
    <>
      <div className="md:w-[120px] w-full mr-3">
        <label className="block mb-1 text-zinc-500 text-xs text-start font-normal font-['DM Sans'] leading-3">
          Issued Date
        </label>
        <div className=" flex items-center relative border border-gray-600 rounded p-1 w-full h-[30px] text-[12px]">
          <input
            type="text"
            value={value}
            onClick={onClick}
            readOnly
            className="w-full box-border border-none focus:outline-none"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_6321_3301)">
              <path
                d="M10.6436 3.00895C10.6436 3.0088 10.6436 3.00867 10.6436 3.00854C10.6436 3.00841 10.6436 3.00826 10.6436 3.00813V1.58482C10.6436 1.10346 10.252 0.711863 9.77063 0.711863H8.86399V0.517064C8.86399 0.231945 8.63202 0 8.34693 0C8.06181 0 7.82986 0.231945 7.82986 0.517064V0.711863H3.16919V0.517064C3.16919 0.231945 2.93722 0 2.65213 0C2.36703 0 2.13506 0.231945 2.13506 0.517064V0.711863H1.22842C0.747065 0.711863 0.355469 1.10348 0.355469 1.58482V10.127C0.355469 10.6084 0.747086 11 1.22842 11H9.77063C10.252 11 10.6436 10.6084 10.6436 10.127V3.72079C10.6436 3.72064 10.6436 3.72051 10.6436 3.72038C10.6436 3.72026 10.6436 3.72011 10.6436 3.71998V3.00895ZM8.15211 0.517043C8.15213 0.409643 8.2395 0.322266 8.34693 0.322266C8.45433 0.322266 8.54173 0.409643 8.54173 0.517064V1.58441C8.54173 1.58456 8.5417 1.58469 8.5417 1.58482C8.5417 1.58488 8.5417 1.58495 8.5417 1.58503C8.5416 1.69235 8.45426 1.77962 8.34693 1.77962C8.23955 1.77962 8.15219 1.69228 8.15213 1.58492C8.15213 1.58488 8.15213 1.58486 8.15213 1.58482C8.15213 1.58475 8.15211 1.58469 8.15211 1.5846V0.517043ZM2.45733 0.517064C2.45733 0.409643 2.54471 0.322266 2.65213 0.322266C2.75953 0.322266 2.84693 0.409643 2.84693 0.517064V1.58441C2.84693 1.58456 2.8469 1.58469 2.8469 1.58482C2.8469 1.58488 2.8469 1.58495 2.8469 1.58503C2.8468 1.69235 2.75946 1.77962 2.65213 1.77962C2.54471 1.77962 2.45733 1.69224 2.45733 1.58484V0.517064ZM10.3213 10.127C10.3213 10.4307 10.0743 10.6777 9.77063 10.6777H1.22842C0.924762 10.6777 0.677734 10.4307 0.677734 10.127V10.0919C0.828082 10.2144 1.01979 10.2881 1.22842 10.2881H9.77063C9.97927 10.2881 10.171 10.2144 10.3213 10.0919V10.127ZM10.3213 3.55925H2.61846C2.52947 3.55925 2.45733 3.6314 2.45733 3.72038C2.45733 3.80937 2.52947 3.88152 2.61846 3.88152H10.3213V9.41512C10.3213 9.71878 10.0743 9.96581 9.77063 9.96581H1.22842C0.924762 9.96581 0.677734 9.71876 0.677734 9.41512V3.88152H1.97393C2.06292 3.88152 2.13506 3.80937 2.13506 3.72038C2.13506 3.6314 2.06292 3.55925 1.97393 3.55925H0.677734V3.16965H10.3213V3.55925ZM10.3213 2.84739H0.677734V1.58482C0.677734 1.28116 0.924762 1.03413 1.22842 1.03413H2.13506V1.42371H2.11822C2.02923 1.42371 1.95709 1.49585 1.95709 1.58484C1.95709 1.67383 2.02923 1.74597 2.11822 1.74597H2.16091C2.2288 1.95239 2.42328 2.10188 2.65213 2.10188C2.88098 2.10188 3.07546 1.95237 3.14335 1.74597H3.18601C3.275 1.74597 3.34715 1.67383 3.34715 1.58484C3.34715 1.49585 3.275 1.42371 3.18601 1.42371H3.16919V1.03413H7.82986V1.42371H7.81302C7.72403 1.42371 7.65189 1.49585 7.65189 1.58484C7.65189 1.67383 7.72403 1.74597 7.81302 1.74597H7.85571C7.9236 1.95239 8.11807 2.10188 8.34693 2.10188C8.57578 2.10188 8.77026 1.95237 8.83815 1.74597H8.88081C8.9698 1.74597 9.04195 1.67383 9.04195 1.58484C9.04195 1.49585 8.9698 1.42371 8.88081 1.42371H8.86399V1.03413H9.77063C10.0743 1.03413 10.3213 1.28118 10.3213 1.58482V2.84739Z"
                fill="black"
              />
              <path
                d="M1.42188 5.49707V6.92078C1.42188 7.00976 1.49402 7.08191 1.58301 7.08191H3.00669C3.09568 7.08191 3.16782 7.00976 3.16782 6.92078V5.49707C3.16782 5.40808 3.09568 5.33594 3.00669 5.33594H1.58301C1.49402 5.33594 1.42188 5.40808 1.42188 5.49707ZM1.74414 5.6582H2.84556V6.75964H1.74414V5.6582Z"
                fill="black"
              />
              <path
                d="M3.71973 7.08191H5.14343C5.23242 7.08191 5.30456 7.00976 5.30456 6.92078V5.49707C5.30456 5.40808 5.23242 5.33594 5.14343 5.33594H3.71973C3.63074 5.33594 3.55859 5.40808 3.55859 5.49707V6.92078C3.55859 7.00976 3.63074 7.08191 3.71973 7.08191ZM3.88086 5.6582H4.9823V6.75964H3.88086V5.6582Z"
                fill="black"
              />
              <path
                d="M5.85645 7.08191H7.28015C7.36914 7.08191 7.44128 7.00976 7.44128 6.92078V5.49707C7.44128 5.40808 7.36914 5.33594 7.28015 5.33594H5.85645C5.76746 5.33594 5.69531 5.40808 5.69531 5.49707V6.92078C5.69531 7.00976 5.76746 7.08191 5.85645 7.08191ZM6.01758 5.6582H7.11902V6.75964H6.01758V5.6582Z"
                fill="black"
              />
              <path
                d="M7.98926 7.08191H9.41294C9.50193 7.08191 9.57407 7.00976 9.57407 6.92078V5.49707C9.57407 5.40808 9.50193 5.33594 9.41294 5.33594H7.98926C7.90027 5.33594 7.82812 5.40808 7.82812 5.49707V6.92078C7.82812 7.00976 7.90027 7.08191 7.98926 7.08191ZM8.15039 5.6582H9.25181V6.75964H8.15039V5.6582Z"
                fill="black"
              />
              <path
                d="M3.00669 7.47656H1.58301C1.49402 7.47656 1.42188 7.54871 1.42188 7.6377V9.0614C1.42188 9.15039 1.49402 9.22253 1.58301 9.22253H3.00669C3.09568 9.22253 3.16782 9.15039 3.16782 9.0614V7.6377C3.16782 7.54871 3.09568 7.47656 3.00669 7.47656ZM2.84556 8.90027H1.74414V7.79883H2.84556V8.90027Z"
                fill="black"
              />
              <path
                d="M3.71973 9.21863H5.14343C5.23242 9.21863 5.30456 9.14648 5.30456 9.05749V7.63379C5.30456 7.5448 5.23242 7.47266 5.14343 7.47266H3.71973C3.63074 7.47266 3.55859 7.5448 3.55859 7.63379V9.05749C3.55859 9.14648 3.63074 9.21863 3.71973 9.21863ZM3.88086 7.79492H4.9823V8.89636H3.88086V7.79492Z"
                fill="black"
              />
              <path
                d="M5.85645 9.22253H7.28015C7.36914 9.22253 7.44128 9.15039 7.44128 9.0614V7.6377C7.44128 7.54871 7.36914 7.47656 7.28015 7.47656H5.85645C5.76746 7.47656 5.69531 7.54871 5.69531 7.6377V9.0614C5.69531 9.15039 5.76746 9.22253 5.85645 9.22253ZM6.01758 7.79883H7.11902V8.90027H6.01758V7.79883Z"
                fill="black"
              />
              <path
                d="M7.98926 9.21863H9.41294C9.50193 9.21863 9.57407 9.14648 9.57407 9.05749V7.63379C9.57407 7.5448 9.50193 7.47266 9.41294 7.47266H7.98926C7.90027 7.47266 7.82812 7.5448 7.82812 7.63379V9.05749C7.82812 9.14648 7.90027 9.21863 7.98926 9.21863ZM8.15039 7.79492H9.25181V8.89636H8.15039V7.79492Z"
                fill="black"
              />
              <path
                d="M1.77734 4.79004C1.77734 4.87903 1.84947 4.95117 1.93848 4.95117H2.65036C2.73935 4.95117 2.81149 4.87903 2.81149 4.79004C2.81149 4.70105 2.73935 4.62891 2.65036 4.62891H1.93848C1.84949 4.62891 1.77734 4.70105 1.77734 4.79004Z"
                fill="black"
              />
              <path
                d="M4.0752 4.94727H4.78708C4.87607 4.94727 4.94821 4.87512 4.94821 4.78613C4.94821 4.69714 4.87607 4.625 4.78708 4.625H4.0752C3.98621 4.625 3.91406 4.69714 3.91406 4.78613C3.91406 4.87512 3.98621 4.94727 4.0752 4.94727Z"
                fill="black"
              />
              <path
                d="M6.21191 4.94727H6.9238C7.01279 4.94727 7.08493 4.87512 7.08493 4.78613C7.08493 4.69714 7.01279 4.625 6.9238 4.625H6.21191C6.12293 4.625 6.05078 4.69714 6.05078 4.78613C6.05078 4.87512 6.12293 4.94727 6.21191 4.94727Z"
                fill="black"
              />
              <path
                d="M8.34863 4.95117H9.06052C9.14951 4.95117 9.22165 4.87903 9.22165 4.79004C9.22165 4.70105 9.14951 4.62891 9.06052 4.62891H8.34863C8.25964 4.62891 8.1875 4.70105 8.1875 4.79004C8.1875 4.87903 8.25964 4.95117 8.34863 4.95117Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_6321_3301">
                <rect width="11" height="11" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );

  const DateOfExpary = ({ value, onClick }: any) => (
    <>
      <div className="md:w-[127px] w-full mr-3">
        <label className="block mb-1 text-zinc-500 text-xs text-start  font-normal font-['DM Sans'] leading-3">
          {" "}
          Expiry Date
        </label>
        <div className="flex items-center relative border border-gray-600 rounded-[3.9px] p-1 w-full h-[30px] text-[12px]">
          <input
            type="text"
            value={value}
            onClick={onClick}
            readOnly
            className="w-full box-border border-none focus:outline-none"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_6321_3301)">
              <path
                d="M10.6436 3.00895C10.6436 3.0088 10.6436 3.00867 10.6436 3.00854C10.6436 3.00841 10.6436 3.00826 10.6436 3.00813V1.58482C10.6436 1.10346 10.252 0.711863 9.77063 0.711863H8.86399V0.517064C8.86399 0.231945 8.63202 0 8.34693 0C8.06181 0 7.82986 0.231945 7.82986 0.517064V0.711863H3.16919V0.517064C3.16919 0.231945 2.93722 0 2.65213 0C2.36703 0 2.13506 0.231945 2.13506 0.517064V0.711863H1.22842C0.747065 0.711863 0.355469 1.10348 0.355469 1.58482V10.127C0.355469 10.6084 0.747086 11 1.22842 11H9.77063C10.252 11 10.6436 10.6084 10.6436 10.127V3.72079C10.6436 3.72064 10.6436 3.72051 10.6436 3.72038C10.6436 3.72026 10.6436 3.72011 10.6436 3.71998V3.00895ZM8.15211 0.517043C8.15213 0.409643 8.2395 0.322266 8.34693 0.322266C8.45433 0.322266 8.54173 0.409643 8.54173 0.517064V1.58441C8.54173 1.58456 8.5417 1.58469 8.5417 1.58482C8.5417 1.58488 8.5417 1.58495 8.5417 1.58503C8.5416 1.69235 8.45426 1.77962 8.34693 1.77962C8.23955 1.77962 8.15219 1.69228 8.15213 1.58492C8.15213 1.58488 8.15213 1.58486 8.15213 1.58482C8.15213 1.58475 8.15211 1.58469 8.15211 1.5846V0.517043ZM2.45733 0.517064C2.45733 0.409643 2.54471 0.322266 2.65213 0.322266C2.75953 0.322266 2.84693 0.409643 2.84693 0.517064V1.58441C2.84693 1.58456 2.8469 1.58469 2.8469 1.58482C2.8469 1.58488 2.8469 1.58495 2.8469 1.58503C2.8468 1.69235 2.75946 1.77962 2.65213 1.77962C2.54471 1.77962 2.45733 1.69224 2.45733 1.58484V0.517064ZM10.3213 10.127C10.3213 10.4307 10.0743 10.6777 9.77063 10.6777H1.22842C0.924762 10.6777 0.677734 10.4307 0.677734 10.127V10.0919C0.828082 10.2144 1.01979 10.2881 1.22842 10.2881H9.77063C9.97927 10.2881 10.171 10.2144 10.3213 10.0919V10.127ZM10.3213 3.55925H2.61846C2.52947 3.55925 2.45733 3.6314 2.45733 3.72038C2.45733 3.80937 2.52947 3.88152 2.61846 3.88152H10.3213V9.41512C10.3213 9.71878 10.0743 9.96581 9.77063 9.96581H1.22842C0.924762 9.96581 0.677734 9.71876 0.677734 9.41512V3.88152H1.97393C2.06292 3.88152 2.13506 3.80937 2.13506 3.72038C2.13506 3.6314 2.06292 3.55925 1.97393 3.55925H0.677734V3.16965H10.3213V3.55925ZM10.3213 2.84739H0.677734V1.58482C0.677734 1.28116 0.924762 1.03413 1.22842 1.03413H2.13506V1.42371H2.11822C2.02923 1.42371 1.95709 1.49585 1.95709 1.58484C1.95709 1.67383 2.02923 1.74597 2.11822 1.74597H2.16091C2.2288 1.95239 2.42328 2.10188 2.65213 2.10188C2.88098 2.10188 3.07546 1.95237 3.14335 1.74597H3.18601C3.275 1.74597 3.34715 1.67383 3.34715 1.58484C3.34715 1.49585 3.275 1.42371 3.18601 1.42371H3.16919V1.03413H7.82986V1.42371H7.81302C7.72403 1.42371 7.65189 1.49585 7.65189 1.58484C7.65189 1.67383 7.72403 1.74597 7.81302 1.74597H7.85571C7.9236 1.95239 8.11807 2.10188 8.34693 2.10188C8.57578 2.10188 8.77026 1.95237 8.83815 1.74597H8.88081C8.9698 1.74597 9.04195 1.67383 9.04195 1.58484C9.04195 1.49585 8.9698 1.42371 8.88081 1.42371H8.86399V1.03413H9.77063C10.0743 1.03413 10.3213 1.28118 10.3213 1.58482V2.84739Z"
                fill="black"
              />
              <path
                d="M1.42188 5.49707V6.92078C1.42188 7.00976 1.49402 7.08191 1.58301 7.08191H3.00669C3.09568 7.08191 3.16782 7.00976 3.16782 6.92078V5.49707C3.16782 5.40808 3.09568 5.33594 3.00669 5.33594H1.58301C1.49402 5.33594 1.42188 5.40808 1.42188 5.49707ZM1.74414 5.6582H2.84556V6.75964H1.74414V5.6582Z"
                fill="black"
              />
              <path
                d="M3.71973 7.08191H5.14343C5.23242 7.08191 5.30456 7.00976 5.30456 6.92078V5.49707C5.30456 5.40808 5.23242 5.33594 5.14343 5.33594H3.71973C3.63074 5.33594 3.55859 5.40808 3.55859 5.49707V6.92078C3.55859 7.00976 3.63074 7.08191 3.71973 7.08191ZM3.88086 5.6582H4.9823V6.75964H3.88086V5.6582Z"
                fill="black"
              />
              <path
                d="M5.85645 7.08191H7.28015C7.36914 7.08191 7.44128 7.00976 7.44128 6.92078V5.49707C7.44128 5.40808 7.36914 5.33594 7.28015 5.33594H5.85645C5.76746 5.33594 5.69531 5.40808 5.69531 5.49707V6.92078C5.69531 7.00976 5.76746 7.08191 5.85645 7.08191ZM6.01758 5.6582H7.11902V6.75964H6.01758V5.6582Z"
                fill="black"
              />
              <path
                d="M7.98926 7.08191H9.41294C9.50193 7.08191 9.57407 7.00976 9.57407 6.92078V5.49707C9.57407 5.40808 9.50193 5.33594 9.41294 5.33594H7.98926C7.90027 5.33594 7.82812 5.40808 7.82812 5.49707V6.92078C7.82812 7.00976 7.90027 7.08191 7.98926 7.08191ZM8.15039 5.6582H9.25181V6.75964H8.15039V5.6582Z"
                fill="black"
              />
              <path
                d="M3.00669 7.47656H1.58301C1.49402 7.47656 1.42188 7.54871 1.42188 7.6377V9.0614C1.42188 9.15039 1.49402 9.22253 1.58301 9.22253H3.00669C3.09568 9.22253 3.16782 9.15039 3.16782 9.0614V7.6377C3.16782 7.54871 3.09568 7.47656 3.00669 7.47656ZM2.84556 8.90027H1.74414V7.79883H2.84556V8.90027Z"
                fill="black"
              />
              <path
                d="M3.71973 9.21863H5.14343C5.23242 9.21863 5.30456 9.14648 5.30456 9.05749V7.63379C5.30456 7.5448 5.23242 7.47266 5.14343 7.47266H3.71973C3.63074 7.47266 3.55859 7.5448 3.55859 7.63379V9.05749C3.55859 9.14648 3.63074 9.21863 3.71973 9.21863ZM3.88086 7.79492H4.9823V8.89636H3.88086V7.79492Z"
                fill="black"
              />
              <path
                d="M5.85645 9.22253H7.28015C7.36914 9.22253 7.44128 9.15039 7.44128 9.0614V7.6377C7.44128 7.54871 7.36914 7.47656 7.28015 7.47656H5.85645C5.76746 7.47656 5.69531 7.54871 5.69531 7.6377V9.0614C5.69531 9.15039 5.76746 9.22253 5.85645 9.22253ZM6.01758 7.79883H7.11902V8.90027H6.01758V7.79883Z"
                fill="black"
              />
              <path
                d="M7.98926 9.21863H9.41294C9.50193 9.21863 9.57407 9.14648 9.57407 9.05749V7.63379C9.57407 7.5448 9.50193 7.47266 9.41294 7.47266H7.98926C7.90027 7.47266 7.82812 7.5448 7.82812 7.63379V9.05749C7.82812 9.14648 7.90027 9.21863 7.98926 9.21863ZM8.15039 7.79492H9.25181V8.89636H8.15039V7.79492Z"
                fill="black"
              />
              <path
                d="M1.77734 4.79004C1.77734 4.87903 1.84947 4.95117 1.93848 4.95117H2.65036C2.73935 4.95117 2.81149 4.87903 2.81149 4.79004C2.81149 4.70105 2.73935 4.62891 2.65036 4.62891H1.93848C1.84949 4.62891 1.77734 4.70105 1.77734 4.79004Z"
                fill="black"
              />
              <path
                d="M4.0752 4.94727H4.78708C4.87607 4.94727 4.94821 4.87512 4.94821 4.78613C4.94821 4.69714 4.87607 4.625 4.78708 4.625H4.0752C3.98621 4.625 3.91406 4.69714 3.91406 4.78613C3.91406 4.87512 3.98621 4.94727 4.0752 4.94727Z"
                fill="black"
              />
              <path
                d="M6.21191 4.94727H6.9238C7.01279 4.94727 7.08493 4.87512 7.08493 4.78613C7.08493 4.69714 7.01279 4.625 6.9238 4.625H6.21191C6.12293 4.625 6.05078 4.69714 6.05078 4.78613C6.05078 4.87512 6.12293 4.94727 6.21191 4.94727Z"
                fill="black"
              />
              <path
                d="M8.34863 4.95117H9.06052C9.14951 4.95117 9.22165 4.87903 9.22165 4.79004C9.22165 4.70105 9.14951 4.62891 9.06052 4.62891H8.34863C8.25964 4.62891 8.1875 4.70105 8.1875 4.79004C8.1875 4.87903 8.25964 4.95117 8.34863 4.95117Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_6321_3301">
                <rect width="11" height="11" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="col-span-4 flex items-center my-2 justify-between">
        <h5 className="mb-4 w-48 mt-3 text-start text-[#116599] text-sm font-bold  font-['DM Sans'] uppercase leading-[13.47px] underline underline-offset-8">
          Documents Section
        </h5>
        <button
          type="button"
          onClick={handleAdd}
          className="w-[47px] h-[28px] text-sm ml-2 bg-[#0670B1] text-white rounded "
        >
          Add
        </button>
      </div>
      <div className="md:max-h-screen grid lg:grid-cols-6 md:grid-cols-2 grid-cols-1 ">
        <div className="col-span-12  gap-2">
          {fields.map((item: any, index: number) => (
            <div className="md:h-24 flex flex-col md:flex-row" key={item.id}>
              {fields.length > 1 ? (
                <div
                  onClick={() => handleRemove(index)}
                  className="flex md:flex-row flex-col flex-wrap w-[40px] h-[36px] mb-3 left-0 top-0 rounded-md mt-4 justify-center md:items-center items-center  px-[0.6rem] md:mr-4 bg-[#A51328] cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.0606 3.88652H10.0723V3.13301C10.0717 2.56024 9.84383 2.01113 9.43881 1.60612C9.0338 1.20112 8.48468 0.973308 7.91191 0.972656H6.08625C5.51347 0.973292 4.96434 1.2011 4.55931 1.6061C4.15429 2.01111 3.92645 2.56023 3.92578 3.13301V3.88652H0.9375C0.75102 3.88652 0.572177 3.9606 0.440316 4.09246C0.308454 4.22433 0.234375 4.40317 0.234375 4.58965C0.234375 4.77613 0.308454 4.95497 0.440316 5.08683C0.572177 5.21869 0.75102 5.29277 0.9375 5.29277H1.31484V15.1588C1.3155 15.6542 1.51257 16.1291 1.86285 16.4793C2.21313 16.8296 2.68803 17.0267 3.1834 17.0273H10.8147C11.3101 17.0267 11.785 16.8296 12.1353 16.4794C12.4855 16.1291 12.6826 15.6542 12.6832 15.1588V5.29277H13.0605C13.247 5.29277 13.4258 5.21869 13.5577 5.08683C13.6895 4.95497 13.7636 4.77613 13.7636 4.58965C13.7636 4.40317 13.6895 4.22433 13.5577 4.09246C13.4258 3.9606 13.247 3.88652 13.0605 3.88652H13.0606ZM5.33209 3.13301C5.33221 2.93306 5.4117 2.74133 5.55308 2.59994C5.69446 2.45854 5.88618 2.37905 6.08613 2.37891H7.91203C8.11197 2.37908 8.30367 2.45859 8.44503 2.59997C8.5864 2.74136 8.66588 2.93307 8.66602 3.13301V3.88652H5.33203V3.13301H5.33209ZM11.277 15.1588C11.2753 15.2809 11.2261 15.3975 11.1397 15.4839C11.0534 15.5702 10.9367 15.6194 10.8146 15.6211H3.18352C3.0614 15.6195 2.94475 15.5702 2.85839 15.4839C2.77202 15.3975 2.72276 15.2809 2.72109 15.1588V5.29277H11.277V15.1588ZM4.72213 13.517V7.61074C4.72213 7.42426 4.79621 7.24542 4.92807 7.11356C5.05993 6.9817 5.23877 6.90762 5.42525 6.90762C5.61173 6.90762 5.79058 6.9817 5.92244 7.11356C6.0543 7.24542 6.12838 7.42426 6.12838 7.61074V13.517C6.12838 13.7035 6.0543 13.8823 5.92244 14.0142C5.79058 14.146 5.61173 14.2201 5.42525 14.2201C5.23877 14.2201 5.05993 14.146 4.92807 14.0142C4.79621 13.8823 4.72213 13.7035 4.72213 13.517ZM7.86984 13.517V7.61074C7.86984 7.42426 7.94392 7.24542 8.07578 7.11356C8.20765 6.9817 8.38649 6.90762 8.57297 6.90762C8.75945 6.90762 8.93829 6.9817 9.07015 7.11356C9.20201 7.24542 9.27609 7.42426 9.27609 7.61074V13.517C9.27609 13.7035 9.20201 13.8823 9.07015 14.0142C8.93829 14.146 8.75945 14.2201 8.57297 14.2201C8.38649 14.2201 8.20765 14.146 8.07578 14.0142C7.94392 13.8823 7.86984 13.7035 7.86984 13.517Z"
                      fill="white"
                    />
                  </svg>
                </div>
              ) : null}

              <div className="md:h-12 sm:h-20 flex md:flex-row flex-col md:flex-wrap mr-3">
                <label className="block text-zinc-500 text-xs text-start h-3 font-normal font-['DM Sans'] leading-3 mb-1 ">
                  Document Type
                </label>
                <Controller
                  control={control}
                  name={`user_doc.${index}.doc_type`}
                  render={({ field: { value, onBlur, onChange, ref } }) => (
                    <SingleSelect
                      ref={ref}
                      value={
                        value
                          ? docTypes?.find((type: any) => type.value === value)
                          : null
                      }
                      options={docTypes}
                      onChange={(selectedOption) => {
                        onChange(selectedOption);
                      }}
                      onBlur={onBlur}
                    />
                  )}
                />
                {errors?.user_doc && errors?.user_doc[index]?.doc_type && (
                  <p className="mt-1 text-red-500 text-xs">
                    {errors?.user_doc[index]?.doc_type.message}
                  </p>
                )}
              </div>
              <div className="sm:h-20 flex flex-col md:flex-wrap  mr-3 ">
                <label
                  htmlFor={`user_doc.${index}.doc_no`}
                  className="block mb-1 text-zinc-500 text-xs text-start  font-normal font-['DM Sans'] leading-3 min-w-[160px]"
                >
                  Document Number
                </label>
                <input
                  id={`user_doc.${index}.doc_no`}
                  rows={4}
                  className="block p-1  text-sm text-black resize-none focus:outline-none border border-gray-500 focus:ring-blue-500 focus:border-blue-500 rounded-[5px]"
                  placeholder=""
                  {...register(`user_doc.${index}.doc_no`)}
                />
                {errors?.user_doc && errors?.user_doc[index]?.doc_no && (
                  <p className="mt-1 text-red-500 text-xs">
                    {errors?.user_doc[index]?.doc_no.message}
                  </p>
                )}
              </div>
              <div className="sm:h-20 flex flex-col md:flex-wrap  mr-3 ">
                <label
                  htmlFor={`user_doc.${index}.issued_by`}
                  className="block mb-1 text-zinc-500 text-xs text-start  font-normal font-['DM Sans'] leading-3 min-w-[160px]"
                >
                  Issued by
                </label>
                <input
                  id={`user_doc.${index}.issued_by`}
                  rows={4}
                  className="block p-1 text-sm text-black resize-none border focus:outline-none border-gray-500 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  placeholder=""
                  {...register(`user_doc.${index}.issued_by`)}
                />
                {errors?.user_doc && errors?.user_doc[index]?.issued_by && (
                  <p className="mt-1 text-red-500 text-xs">
                    {errors?.user_doc[index]?.issued_by.message}
                  </p>
                )}
              </div>
              <div className="sm:h-16 flex flex-wrap">
                <Controller
                  name={`user_doc.${index}.issued_date`}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      customInput={<DateOfIssue />}
                      dateFormat="dd/MM/YYYY"
                      showTimeInput={false}
                      showMonthDropdown
                      showYearDropdown
                      dateFormatCalendar="MMMM"
                      yearDropdownItemNumber={100}
                      scrollableYearDropdown
                      maxDate={new Date()}
                    />
                  )}
                />
                {errors?.user_doc && errors?.user_doc[index]?.issued_date && (
                  <p className="mt-1 text-red-500 text-xs">
                    {errors?.user_doc[index]?.issued_date.message}
                  </p>
                )}
              </div>
              <div className="sm:h-16 flex flex-wrap">
                <Controller
                  name={`user_doc.${index}.expiry_date`}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      customInput={<DateOfExpary />}
                      dateFormat="dd/MM/YYYY"
                      showTimeInput={false}
                      showMonthDropdown
                      showYearDropdown
                      dateFormatCalendar="MMMM"
                      yearDropdownItemNumber={100}
                      scrollableYearDropdown
                      minDate={new Date()}
                    />
                  )}
                />
                {errors?.user_doc && errors?.user_doc[index]?.expiry_date && (
                  <p className="mt-1 text-red-500 text-xs">
                    {errors?.user_doc[index]?.expiry_date.message}
                  </p>
                )}
              </div>
              <div>
                <div className="image-preview flex flex-col justify-start items-start">
                  <button
                    type="button"
                    className="file-select-button"
                    id="triggerButton"
                    onClick={() => {
                      handleImageUpload;
                      document
                        .getElementById(`user_doc.${index}.doc_file`)
                        ?.click();
                      document
                        .getElementById(`user_doc.${index}.doc_file`)
                        ?.addEventListener("change", function (e: any) {
                          const files = e.target.files; // FileList object
                          if (files.length > 0) {
                            const file = files[0]; // Get the first selected file
                            updateFileName(index, file.name);
                          }
                        });
                    }}
                  >
                    <div className="flex mt-2">
                      <p className="text-sm" id="fileName">
                        Attachments
                      </p>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-1.5 ml-1"
                      >
                        <path
                          d="M10.6823 4.09291C10.599 4.00959 10.4643 4.00959 10.381 4.09291L4.56463 9.90926C4.13588 10.338 3.5637 10.5739 2.95296 10.5739C2.342 10.5739 1.76961 10.338 1.34107 9.90926C0.912527 9.4805 0.676413 8.90833 0.676413 8.29737C0.676413 7.68663 0.912314 7.11424 1.34107 6.6857L7.1572 0.869138C7.77455 0.252001 8.74373 0.28972 9.41159 0.957148C10.0792 1.62479 10.1172 2.59418 9.49981 3.21153L4.03593 8.67562C3.73056 8.981 3.23318 8.98121 2.92717 8.67562C2.62159 8.36983 2.62159 7.87245 2.92717 7.56687L6.6285 3.86553C6.71183 3.78221 6.71183 3.64753 6.6285 3.56421C6.54518 3.48089 6.4105 3.48089 6.32718 3.56421L2.62585 7.26533C2.15405 7.73713 2.15405 8.50472 2.62585 8.97673C3.09808 9.44896 3.86588 9.44811 4.33725 8.97673L9.80135 3.51264C10.5905 2.72332 10.5525 1.49501 9.71312 0.655612C8.87394 -0.183575 7.64542 -0.22172 6.85609 0.567602L1.03953 6.38416C0.530226 6.89326 0.25 7.57262 0.25 8.29737C0.25 9.02212 0.530226 9.7017 1.03953 10.2108C1.54863 10.7201 2.22799 11.0003 2.95296 11.0003C3.6775 11.0003 4.35707 10.7201 4.86617 10.2108L10.6823 4.39424C10.7656 4.31091 10.7656 4.17602 10.6823 4.09291Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </button>

                  <input
                    {...register(`user_doc.${index}.doc_file`)}
                    id={`user_doc.${index}.doc_file`}
                    name={`user_doc.${index}.doc_file`}
                    type="file"
                    className="hidden"
                  />
                </div>
                <div className="w-[102px] flex flex-wrap flex-col ">
                  {!fileName[index] ? (
                    <Link
                      className="inline-block text-gray-600"
                      href={
                        typeof item.doc_file === "string"
                          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${item.doc_file}`
                          : ""
                      }
                      target="_blank"
                    >
                      <p className="block mb-1  text-sky-700 hover:text-black  text-xs text-start  font-normal font-['DM Sans'] leading-3 w-24 text-sm truncate">
                        {item.doc_file}
                      </p>
                    </Link>
                  ) : (
                    <label
                      id={`user_doc.${index}.label`}
                      className="block mb-1  text-xs text-start  font-normal font-['DM Sans'] leading-3 min-w-[105px]"
                    >
                      {fileName[index]}
                    </label>
                  )}
                </div>
                {errors?.user_doc && errors?.user_doc[index]?.doc_file && (
                  <p className="mt-1 text-red-500 text-xs">
                    {errors?.user_doc[index]?.doc_file.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DocumentsSection;

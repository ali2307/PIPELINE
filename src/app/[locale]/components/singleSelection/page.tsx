"use client";

import React from "react";
import { Control, FieldValues } from "react-hook-form";
import ReactSelect, { ThemeConfig } from "react-select";
interface Option {
  value: number;
  label: string;
}
interface SingleSelectProps {
  control?: Control<FieldValues>;
  name?: string;
  options?: Option[];
  onChange?: (value: string) => void;
  onBlur?: () => void;
  ref?: any;
  value?: any;
}
const SingleSelect: React.FC<SingleSelectProps> = ({
  onChange,
  ref,
  value,
  options,
  onBlur,
}) => {
  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 1,
      minHeight: 30,
      borderRadius: 3.9,
      borderColor: "#80808a",
      minWidth: 150,
      maxWidth: 330,
    }),
    multiValueLabel: (styles: any) => ({
      ...styles,
      backgroundColor: "white",
      color: "grey",
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      backgroundColor: "white",
      color: "blue",
      ":hover": {
        backgroundColor: "blue",
        color: "white",
      },
    }),
    placeholder: (styles: any) => ({
      ...styles,
      fontSize: 13.5,
      marginLeft: "10px",
      color: "DimGray",
      borderRadius: 0.5,
    }),

    // Set a maximum height for the dropdown list to enable scrolling
    menuList: (base: any) => ({
      ...base,
      maxHeight: 170,
    }),
  };
  const customThemeFn: ThemeConfig = (theme) => ({
    ...theme,
    spacing: {
      ...theme.spacing,
      controlHeight: 30,
      baseUnit: 2,
      style: "",
    },
  });
  return (
    <>
      <ReactSelect
        ref={ref}
        value={value}
        options={options}
        onChange={(e) => onChange && onChange(e?.value)}
        onBlur={onBlur}
        styles={customStyles}
        theme={customThemeFn}
      />
    </>
  );
};

export default SingleSelect;

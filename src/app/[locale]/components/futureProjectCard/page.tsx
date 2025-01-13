"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ZERO } from "@/app/utils/constants";
import Link from "next/link";
import Line1 from "./../../../assets/img/project-line.png";
interface Item {
  title: string;
  file: any;
  content: string | TrustedHTML;
  sub_heading: string[]; // Update this to be an array if needed
  item: [];
  slug: string;
  id: number;
  redirection_url: string;
  featured_content: string;
}
interface Props {
  item: Item;
  index: number;
}

interface NewArray {
  [key: string]: string | undefined; // Key is a string, value is a string or undefined
}
const FutureProjectCard: React.FC<Props> = ({ item, index }) => {
  const [newArray, setNewArray] = useState<NewArray>({});

  useEffect(() => {
    if (item.sub_heading && item.sub_heading.length > ZERO) {
      const tempArray: NewArray = {}; // Provide type information
      item.sub_heading.forEach((item: any, index: any) => {
        tempArray[`text${index + 1}`] = item.subheading;
      });
      setNewArray(tempArray);
    }
  }, [item.sub_heading]);

  const gridImage = (index: number) => {
    switch (index) {
      case 0:
        return (
          <>
            {/* <div className="md:h-[560px] w-full h-full grid md:grid-cols-3 gap-3">
              <div className="col-span-1 row-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[0]?.img_md_url}`}
                  alt=""
                  width={600}
                  height={400}
                  className="md:w-[394px]  md:min-h-[561px] md:max-h-[561px] w-full h-full object-cover overflow-hidden "
                />
              </div>

              <div className="col-span-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[1]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="md:w-[290px] md:min-h-[309px] md:max-h-[309px]  w-full h-full object-cover overflow-hidden "
                />
              </div>
              <div className="grid gri-cols-2 gap-3">
                <div className="col-span-1">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[2]?.img_md_url}`}
                    alt=""
                    width={300}
                    height={200}
                    className=" md:w-[287px] md:min-h-[194px] md:max-h-[194px]  w-full h-full object-cover overflow-hidden "
                  />
                </div>
                <div className="col-span-1 flex items-center bg-white text-center">
                  <h2 className="text-black text-[38px] min-w-72 md:h-[109px] overflow-hidden text-left w-full h-full font-medium  uppercase leading-[35px]">
                    {item.featured_content ? item.featured_content : ""}
                  </h2>
                </div>
              </div>
              <div className="col-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[0]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="md:w-[590px] md:min-h-[238px] md:max-h-[238px]  w-full h-full object-cover overflow-hidden "
                />
              </div>
            </div> */}

            <div className="hidden md:grid md:h-[556px] h-full md:grid-cols-2 md:grid-rows-3 gap-3 p-4">
              {/* <div className="md:h-[556px] h-full grid md:grid-cols-2 md:grid-rows-3 gap-3 p-4"> */}
              <div className="col-span-1 row-span-1">
                {/* <img src="img/project.jpg" alt="Beach Family" className=" w-full h-full object-cover" /> */}
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[0]?.img_md_url}`}
                  alt=""
                  width={600}
                  height={400}
                  className="w-full md:min-h-[540px] md:max-h-[540px] h-full object-cover overflow-hidden"
                />
              </div>

              <div className="grid">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                  <div className="row-span-2">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[1]?.img_md_url}`}
                      alt=""
                      width={600}
                      height={400}
                      className="w-full md:min-h-[298px] md:max-h-[298px] h-full object-cover overflow-hidden "
                    />
                  </div>
                  <div className="col-span-1">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[2]?.img_md_url}`}
                      alt=""
                      width={600}
                      height={400}
                      className="w-full  md:min-h-[167px] md:max-h-[167px] h-full object-cover overflow-hidden "
                    />
                  </div>

                  <p className="text-xl flex justify-center items-center text-black 2xl:text-[25px] xl:text-[1.4rem]  w-full 2xl:max-w-64 lg:max-w-56 lg:max-h-20 lg:min-h-20 overflow-hidden mb-8 sm:text-center text-left sm:mx-auto h-full font-medium uppercase lg:leading-6">
                    {item.featured_content ? item.featured_content : ""}
                  </p>
                </div>
                <div className="col-span-2 pt-3">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[3]?.img_md_url}`}
                    alt=""
                    width={600}
                    height={400}
                    className=" w-full md:min-h-[230px] md:max-h-[230px] h-full object-cover overflow-hidden "
                  />
                </div>
              </div>
            </div>

            {/* //MOBILE VIEW */}

            <div className=" md:hidden min-h-[360px] max-h-[360px]  h-full grid grid-cols-3 grid-rows-3 gap-3 p-1">
              {/* Top left large image */}
              <div className="col-span-1 row-span-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[0]?.img_md_url}`}
                  alt=""
                  width={600}
                  height={400}
                  className="w-full h-full object-cover overflow-hidden "
                />
              </div>
              <div className="col-span-1 row-span-2 flex-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[1]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="w-full h-full object-cover overflow-hidden "
                />
              </div>

              {/* Top right small image */}
              <div className="col-span-1 row-span-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[2]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="md:w-[327px] md:min-h-[336px] md:max-h-[336px] w-full h-full object-cover overflow-hidden "
                />
              </div>

              {/* Center heading */}
              <div className="col-span-1 flex  items-center justify-center ">
                <h2 className=" text-sm w-full text-center overflow-hidden text-black font-medium uppercase md:leading-7">
                  {item.featured_content ? item.featured_content : ""}
                </h2>
                {/* <div className="absolute hidden md:block top-[60%] w-[151px] h-[0px] border border-black"></div> */}
              </div>

              {/* Bottom left small image */}
              <div className="col-span-2 row-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[3]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className=" w-full h-full object-cover overflow-hidden  "
                  aria-label="index-4"
                />
              </div>

              {/* Bottom center small image */}
              {/* <div className="row-span-2 col-span-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[4]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className=" w-full h-full object-cover overflow-hidden "
                  aria-label="index-5"
                />
              </div> */}
            </div>
          </>
        );
      case 1:
        return (
          <>
            {/* //WEB VIEW */}
            <div className="hidden md:grid md:h-[556px] w-full h-full md:grid-cols-3 md:grid-rows-3 gap-3 p-4">
              {/* Top left large image */}
              <div className="col-span-1 row-span-3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[0]?.img_md_url}`}
                  alt=""
                  width={600}
                  height={400}
                  className="md:w-[371px] md:min-h-[539px] md:max-h-[539px] min-h-[539px] w-full h-full object-cover overflow-hidden "
                />
              </div>
              <div className="col-span-1 flex-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[1]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className=" md:min-h-[235px] md:max-h-[235px]  w-full h-full object-cover overflow-hidden "
                />
              </div>

              {/* Top right small image */}
              <div className="col-span-1 ">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[2]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className=" md:min-h-[164px] md:max-h-[164px]  w-full h-full object-cover overflow-hidden "
                />
              </div>

              {/* Center heading */}
              <div className="relative col-span-1 flex justify-center md:items-end items-center ">
                <h2 className="xl:text-[1.5rem] md:text-[1.4rem] lg:text-[1rem] xl:min-w-[230px]  xl:max-w-[230px] w-full md:min-h-[89px] md:max-h-[89px] overflow-hidden text-black text-[29px] font-medium uppercase md:leading-7">
                  {item.featured_content ? item.featured_content : ""}
                </h2>
                {/* <span className="hidden 2xl:block absolute bottom-[8%] right-4 sm:w-0 md:w-0 lg:w-[150px] h-[1px] bg-black"></span> */}
              </div>

              {/* Bottom left small image */}
              <div className="col-span-1 row-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[3]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="  md:min-h-[364px] md:max-h-[364px]  w-full h-full object-cover overflow-hidden "
                  aria-label="index-4"
                />
              </div>

              {/* Bottom center small image */}
              <div className="col-span-1 row-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[4]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="md:min-h-[190px] md:max-h-[190px] w-full h-full object-cover overflow-hidden"
                  aria-label="index-5"
                />
              </div>
            </div>

            {/* //MOBILE VIEW */}
            <div className=" md:hidden min-h-[360px] max-h-[360px]  h-full grid grid-cols-3 grid-rows-3 gap-3 p-1">
              {/* Top left large image */}
              <div className="col-span-1 row-span-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[0]?.img_md_url}`}
                  alt=""
                  width={600}
                  height={400}
                  className="w-full h-full object-cover overflow-hidden "
                />
              </div>
              <div className="col-span-1 flex-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[1]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="w-full h-full object-cover overflow-hidden "
                />
              </div>

              {/* Top right small image */}
              <div className="col-span-1 row-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[2]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="md:w-[327px] md:min-h-[336px] md:max-h-[336px] w-full h-full object-cover overflow-hidden "
                />
              </div>

              {/* Center heading */}
              <div className="col-span-1 flex  items-center justify-center ">
                <h2 className=" text-sm w-full text-center overflow-hidden text-black font-medium uppercase md:leading-7">
                  {item.featured_content ? item.featured_content : ""}
                </h2>
                {/* <div className="absolute hidden md:block top-[60%] w-[151px] h-[0px] border border-black"></div> */}
              </div>

              {/* Bottom left small image */}
              <div className="col-span-1 row-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[3]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className=" w-full h-full object-cover overflow-hidden  "
                  aria-label="index-4"
                />
              </div>

              {/* Bottom center small image */}
              <div className="row-span-2 col-span-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[4]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className=" w-full h-full object-cover overflow-hidden "
                  aria-label="index-5"
                />
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            {/* WEB VIEW */}
            <div className=" hidden md:grid md:h-[556px] w-full h-full md:grid-cols-3 md:grid-rows-3 gap-3 p-4">
              {/* Top left large image */}
              <div className="col-span-1 row-span-3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[0]?.img_md_url}`}
                  alt=""
                  width={600}
                  height={400}
                  className="md:w-[371px] md:min-h-[539px] md:max-h-[539px]  w-full h-full object-cover overflow-hidden "
                />
              </div>
              <div className="col-span-1 flex-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[1]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className=" md:min-h-[235px] md:max-h-[235px]  w-full h-full object-cover overflow-hidden "
                />
              </div>

              {/* Top right small image */}
              <div className="col-span-1 ">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[2]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className=" md:min-h-[164px] md:max-h-[164px]  w-full h-full object-cover overflow-hidden "
                />
              </div>

              {/* Center heading */}
              <div className="relative col-span-1 flex justify-center md:items-end items-center">
                <h2 className="relative md:text-[1.4rem]  xl:text-[1.4rem]  lg:text-[1rem] xl:min-w-[230px] xl:max-w-[230px] w-full md:min-h-[71px] md:max-h-[71px] lg:min-h-[91px] lg:max-h-[91px] overflow-hidden text-black text-[29px] font-medium uppercase lg:leading-[1.8rem] leading-6">
                  {item.featured_content ? item.featured_content : ""}
                </h2>
                {/* <span className="hidden 2xl:block absolute bottom-[8%] right-4 sm:w-0 md:w-0 lg:w-[150px] h-[1px] bg-black"></span> */}
              </div>

              {/* Bottom left small image */}
              <div className="col-span-1 row-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[3]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="  md:min-h-[364px] md:max-h-[364px]  w-full h-full object-cover overflow-hidden "
                  aria-label="index-4"
                />
              </div>

              {/* Bottom center small image */}
              <div className="col-span-1 row-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[4]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="md:min-h-[190px] md:max-h-[190px] w-full h-full object-cover overflow-hidden"
                  aria-label="index-5"
                />
              </div>
            </div>

            {/* //MOBIE VIEW */}
            <div className=" md:hidden min-h-[360px] max-h-[360px]  w-full h-full grid grid-cols-3 grid-rows-3 gap-3 p-1">
              {/* Top left large image */}
              <div className="col-span-1 row-span-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[0]?.img_md_url}`}
                  alt=""
                  width={600}
                  height={400}
                  className="w-full h-full object-cover overflow-hidden "
                />
              </div>
              <div className="col-span-1 flex-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[1]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="w-full h-full object-cover overflow-hidden "
                />
              </div>

              {/* Top right small image */}
              <div className="col-span-1 ">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[2]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="w-full h-full object-cover overflow-hidden "
                />
              </div>

              {/* Center heading */}
              <div className="md:w-[244px] col-span-1 flex items-center justify-center ">
                <h2 className="text-sm w-full text-center overflow-hidden text-black font-medium uppercase md:leading-7  ">
                  {item.featured_content ? item.featured_content : ""}
                </h2>
                {/* <div className="absolute hidden md:block top-[60%] w-[151px] h-[0px] border border-black"></div> */}
              </div>

              {/* Bottom left small image */}
              <div className="col-span-1 row-span-3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[3]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="w-full h-full object-cover overflow-hidden "
                  aria-label="index-4"
                />
              </div>

              {/* Bottom center small image */}
              <div className="col-span-1 row-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[4]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="w-full h-full object-cover overflow-hidden"
                  aria-label="index-5"
                />
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            {/* //Webview */}
            <div className="hidden md:grid md:h-[556px] h-full  md:grid-cols-3 md:grid-rows-3 gap-3 p-4">
              {/* Top left large image */}
              <div className="col-span-1 row-span-3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[0]?.img_md_url}`}
                  alt=""
                  width={600}
                  height={400}
                  className="md:w-[371px]  md:min-h-[524px] md:max-h-[524px] w-full h-full object-cover overflow-hidden "
                />
              </div>
              <div className="col-span-1 flex-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[1]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="md:min-h-[235px] md:max-h-[235px] w-full h-full  overflow-hidden object-cover "
                />
              </div>

              {/* Top right small image */}
              <div className="col-span-1 row-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[2]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="md:w-[327px] md:min-h-[336px] md:max-h-[336px] w-full h-full object-cover overflow-hidden "
                />
              </div>

              {/* Center heading */}
              <div className="md:w-[245px]  col-span-1 flex items-end justify-end ">
                <h2 className="relative md:text-[1.4rem] lg:text-[1.4rem] lg:min-w-[230px] lg:max-w-[230px] w-full md:min-h-[91px] md:max-h-[91px] overflow-hidden text-black text-[29px] font-medium uppercase md:leading-7 leading-6">
                  {item.featured_content ? item.featured_content : ""}
                </h2>
              </div>

              {/* Bottom left small image */}
              <div className="col-span-1 row-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[3]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className=" md:min-h-[174px] md:max-h-[174px] w-full h-full object-cover overflow-hidden  "
                  aria-label="index-4"
                />
              </div>

              {/* Bottom center small image */}
              <div className="row-span-2 col-span-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[4]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="md:w-[329px] md:min-h-[174px] md:max-h-[174px] w-full h-full  object-cover overflow-hidden "
                  aria-label="index-5"
                />
              </div>
            </div>

            {/* //MOBILE View */}
            <div className="md:hidden  min-h-[360px] max-h-[360px] h-full grid grid-cols-3 grid-rows-3 gap-3 p-1">
              {/* Top left large image */}
              <div className="col-span-1 row-span-3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[0]?.img_md_url}`}
                  alt=""
                  width={600}
                  height={400}
                  className="w-full h-full  object-cover overflow-hidden "
                />
              </div>
              <div className="col-span-1 flex-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[1]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="w-full h-full object-cover overflow-hidden "
                />
              </div>

              {/* Top right small image */}
              <div className="col-span-1 row-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[2]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="w-full h-full object-cover overflow-hidden "
                />
              </div>

              {/* Center heading */}
              <div className="col-span-1 flex items-center justify-center ">
                <h2 className="text-sm w-full md:max-h-[91px] overflow-hidden text-black  font-medium uppercase md:leading-7 ">
                  {item.featured_content ? item.featured_content : ""}
                </h2>
                {/* <div className="absolute hidden md:block md:top-[60%] w-[151px] h-[0px] border border-black"></div> */}
              </div>

              {/* Bottom left small image */}
              <div className="col-span-1 row-span-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[3]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="w-full h-full object-cover overflow-hidden  "
                  aria-label="index-4"
                />
              </div>

              {/* Bottom center small image */}
              <div className="row-span-2 col-span-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item?.file[4]?.img_md_url}`}
                  alt=""
                  width={300}
                  height={200}
                  className="w-full h-full object-cover overflow-hidden "
                  aria-label="index-5"
                />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-5/12 text-center full lg:my-9">
          <div>
            <h2
              className={`text-black lg:text-[50px] md:text-[30px] text-[25px] lg:min-w-[250px] lg:max-w-[250px] shrink font-normal font-optima uppercase md:leading-[50px] sm:mx-auto ${
                item.title ? "md:text-center lg:text-start sm:text-center" : ""
              }`}
            >
              <span className="relative inline-block">
                {item.title}
                <span className="absolute bottom-3 sm:w-0 md:w-0 lg:w-full h-[1px] bg-black"></span>
              </span>
            </h2>
          </div>
          <h3 className="sm:h-[65px] text-black lg:text-4xl md:text-3xl text-lg font-medium font-optima uppercase md:leading-[40.60px] leading-[30.60px] lg:min-w-[375px] md:mt-4 lg:max-w-[375px] min-w-[276px]  md:max-h-[120px] overflow-hidden lg:text-start sm:text-center ">
            {newArray.text1}
            <br />
            <span className="text-black md:text-[30px] text-[18px] font-normal font-optima uppercase leading-[32px] md:min-w-[361px] md:max-w-[361px]  overflow-hidden sm:text-center md:text-center">
              {newArray.text2}
            </span>
          </h3>

          <p
            className="md:block hidden md:min-h-[115px] max-h-[305px] overflow-hidden lg:max-w-[536px] lg:text-start sm:text-justify text-black text-lg font-normal font-['DM Sans'] capitalize my-4 "
            dangerouslySetInnerHTML={{
              __html: item.content,
            }}
          ></p>
          <div className="flex lg:items-start lg:justify-start justify-center sm:justify-center lg:mt-8 mb-4 mx-auto lg:block sm:hidden">
            <Link href={`${item?.redirection_url}`}>
              <div className="w-[211px] h-[70px] bg-sky-700 text-white rounded-tr-[18px] flex justify-center items-center">
                View All
                <svg
                  className="rtl:rotate-180 w-3.5 h-3 ml-2"
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
              </div>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-7/12 w-full gap-4 flex justify-center">
          {gridImage(index)}
        </div>
        <p
          className="sm:block hidden md:min-h-[115px] md:max-h-[115px] max-h-[122px] overflow-hidden  lg:max-w-[536px] lg:text-start text-center text-black text-md font-normal font-['DM Sans'] capitalize my-8"
          dangerouslySetInnerHTML={{
            __html: item.content,
          }}
        ></p>
        <div className="lg:items-start lg:justify-start justify-center sm:justify-center  mb-4 mx-auto sm:block hidden">
          <Link href={`${item?.redirection_url}`}>
            <div className="w-[211px] h-[70px] bg-sky-700 text-white rounded-tr-[18px] flex justify-center items-center">
              View All
              <svg
                className="rtl:rotate-180 w-3.5 h-3 ml-2"
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
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default FutureProjectCard;

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ZERO } from "@/app/utils/constants";
interface Item {
  title: string;
  file: any;
  content: string | TrustedHTML;
  sub_heading: string[]; // Update this to be an array if needed
  item: [];
  slug: string;
  id: number;
  redirection_url: string;
}
interface Props {
  item: Item;
}

interface NewArray {
  [key: string]: string | undefined; // Key is a string, value is a string or undefined
}

const CommunityViewCard: React.FC<Props> = ({ item }) => {
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

  const imageUrl = item.file?.[0]?.img_md_url;

  return (
    <>
      <section className="relative mx-auto">
        {imageUrl && (
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${imageUrl}`}
            width={1920}
            height={729}
            alt="Beachfront"
            className="relative w-full md:h-[729px] h-[578px] object-cover bg-cover"
          />
        )}
        <div className="relative mx-auto max-w-[1200px] w-full">
          <div className="absolute lg:left-1/2 md:left-[-18rem] left-[80%] transform -translate-x-[84%] md:-translate-y-[92%] -translate-y-[60%] w-[90%] md:w-[735px] h-[500px] md:h-[480px] inset-0 m-auto bg-black bg-opacity-50 p-36 md:p-8">
            <div className="absolute md:w-[225px] w-full h-[0px] my-32 -mx-8  bottom-[44%] rotate-90 border-2 border-white hidden 2xl:block"></div>
            <div className="absolute md:top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 -translate-y-[26%]  lg:left-[56%] md:left-[48%] text-white px-3">
              <h3 className="text-white lg:text-5xl md:text-3xl text-2xl font-normal font-optima uppercase max-w-[300px] overflow-hidden md:leading-[41.60px] leading-[30px]">
                {item.title}
              </h3>
              <h4 className="text-white lg:text-[35px] md:text-[28px] text-[18px] font-normal font-optima max-w-[436px]  md:h-[92px] h-[70px] overflow-hidden uppercase lg:leading-[42px] md:leading-[33px] leadimg-[22px] py-4">
                {newArray.text1}
              </h4>
              <h5
                className="md:min-w-[536px] md:max-w-[536px] md:max-h-[130px] md:min-h-[130px] min-h-[215px] max-h-[215px] max-w-[300px] overflow-hidden text-justify text-white md:text-lg text-base font-normal capitalize pt-5 pb-1"
                dangerouslySetInnerHTML={{
                  __html: item.content,
                }}
              ></h5>
              <div className="flex justify-start items-start mt-2">
                <Link
                  href={item?.redirection_url}
                  className="text-white w-[211px] h-[70px] flex justify-center mt-5 items-center text-[17px] bg-[#0670B1] hover:bg-black font-bold font-['DM Sans'] focus:outline-none rounded-tr-[18px] md:mx-0 mx-auto"
                >
                  View All
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CommunityViewCard;

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Specification {
  id: number;
  icon: string;
  value: string;
}

interface Item {
  id: number;
  file?: { img_md_url: string }[];
  rate: string;
  title: string;
  content: string;
  unit_specifications?: Specification[];
  area: string;
  redirection_url: string;
}

interface Item {
  item: [];
  slug: string;
  // Add other properties of Item as needed
}

interface Props {
  item: Item;
}

const UnitCard: React.FC<Props> = ({ item }) => {
  return (
    <>
      <div
        className="flex flex-row relative items-center justify-center mb-8"
        key={item.id}
      >
        <Link href={`${item.redirection_url}/${item.slug}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
            alt=""
            className="md:w-[184.11] md:min-h-[325.01px] md:max-h-[325.01px] w-[275.11px] h-[360px] md:min-w-40 md:max-w-40  overflow-hidden transition-transform duration-500 hover:scale-110 max-h-[300px] bg-cover object-cover"
            width={149.11}
            height={291.01}
          />
          <div className="lg:py-12 flex flex-col justify-center items-center sm:border sm:py-3">
            <div className=" text-center text-stone-500 mb-3 text-md font-normal font-['DM Sans']">
              {item.rate}
            </div>
            <div className=" text-center text-zinc-700 text-base max-w-40 max-h-[1.5rem] overflow-hidden font-medium font-['DM Sans']">
              {item.title}
            </div>
            <div className="text-stone-500 text-center text-sm mb-5 font-normal  max-w-40 max-h-[1.5rem] overflow-hidden font-['DM Sans']">
              <p
                dangerouslySetInnerHTML={{
                  __html: item.content,
                }}
              ></p>
            </div>
            <div className="flex gap-2">
              {item.unit_specifications
                ?.slice(0, 2)
                .map((specifi: any, index: number) => (
                  <div
                    className="md:w-[41.31px] w-full h-[30.09px] bg-[#C4C4C433] z-0 flex justify-center items-center"
                    key={specifi.id}
                  >
                    <Image
                      alt=""
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${specifi.icon}`}
                      width={18}
                      height={14}
                      className="z-10 md:w-[18px] mr-1 md:min-h-[18px] min-h-[18px] max-h-[18px] bg-cover"
                    />
                    <div className="w-[20.92px] h-[15.84px] text-[#484545] text-[11.09px] font-normal font-['DM Sans']">
                      {specifi.value}
                    </div>
                  </div>
                ))}
              <div className="md:w-[60.31px] w-full h-[30.09px] bg-[#C4C4C433] z-0 flex gap-1 items-center">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_770_74" fill="white">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.1944 0.40625H4.93546V3.82588H0.832031V15.4527H11.0909V12.033H15.1944V0.40625Z"
                    />
                  </mask>
                  <path
                    d="M4.93546 0.40625V-0.277678H4.25153V0.40625H4.93546ZM15.1944 0.40625H15.8783V-0.277678H15.1944V0.40625ZM4.93546 3.82588V4.50981H5.61938V3.82588H4.93546ZM0.832031 3.82588V3.14196H0.148104V3.82588H0.832031ZM0.832031 15.4527H0.148104V16.1366H0.832031V15.4527ZM11.0909 15.4527V16.1366H11.7749V15.4527H11.0909ZM11.0909 12.033V11.3491H10.407V12.033H11.0909ZM15.1944 12.033V12.7169H15.8783V12.033H15.1944ZM4.93546 1.09018H15.1944V-0.277678H4.93546V1.09018ZM5.61938 3.82588V0.40625H4.25153V3.82588H5.61938ZM0.832031 4.50981H4.93546V3.14196H0.832031V4.50981ZM1.51596 15.4527V3.82588H0.148104V15.4527H1.51596ZM11.0909 14.7687H0.832031V16.1366H11.0909V14.7687ZM10.407 12.033V15.4527H11.7749V12.033H10.407ZM15.1944 11.3491H11.0909V12.7169H15.1944V11.3491ZM14.5104 0.40625V12.033H15.8783V0.40625H14.5104Z"
                    fill="#484545"
                    mask="url(#path-1-inside-1_770_74)"
                  />
                </svg>
                <div className="md:w-[29.55px] w-full h-[14.25px] text-[#484545] text-[11.09px] font-normal font-['DM Sans']">
                  {item.area}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
export default UnitCard;

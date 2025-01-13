"use client";
import React from "react";
import Image from "next/image";
// import planImage from "./../../../assets/img/plan.jpg";
import { useStore } from "./../../../store/index";

const UnitPlan: React.FC = () => {
  const { title, content, slides, subtitle, unitDetails } = useStore(
    (state) => state.unitViewDetails
  );

  const planImage = unitDetails.unit_plan?.img_md_url;
  return (
    <>
      <div className="lg:w-[540px] h-[0px] w-full border border-[#f1f1f1] my-5" />
      <div className="lg:w-[472px] w-full bg-white border overflow-hidden mb-10">
        <div className="flex justify-between h-[35px] items-start p-1 border-b border-gray-200">
          <span className="text-lg text-gray-600 font-semibold border-r-2 ml-2 pr-2">
            -
          </span>
          {unitDetails.unit_plan?.plan_specifications?.map(
            (item: any, index: number) => (
              <>
                <div className="flex gap-24 justify-between" key={index}>
                  <p className=" text-sm text-gray-600 font-normal">
                    {item.label}: {item.value}
                  </p>
                </div>
              </>
            )
          )}
        </div>
        <div className="p-4">
          <p
            className="md:w-[411px] h-[58px] overflow-hidden text-sm max-w-70 text-gray-700 mb-4"
            dangerouslySetInnerHTML={{
              __html: unitDetails?.unit_plan?.description,
            }}
          ></p>
          <div className="rounded-lg overflow-hidden">
            <Image
              width={504}
              height={358}
              src={` ${process.env.NEXT_PUBLIC_STORAGE_URL}${planImage}`}
              alt="Floor Plan"
              className="w-full md:w-[504px] max-h-[358px] bg-cover object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default UnitPlan;

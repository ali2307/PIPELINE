"use client";
import React from "react";
import Image from "next/image";
import { ZERO } from "@/app/utils/constants";
import { formatString } from "@/app/utils/util";

interface CartComp {
  data?: Array<Record<string, any>>;
}

const CartCompareCard: React.FC<CartComp> = ({ data }) => {
  return (
    <div className="md:w-[968px] h-auto border-[10px] overflow-x-auto border-[#d9d9d9]/20">
      <table id="pagination-table">
        <thead className="h-auto bg-[#F1F5F6]">
          <tr>
            {data &&
              Object.keys(data[0])
                .slice(1)
                .map((key, index) => (
                  <th key={index} className="min-w-[150px] w-full">
                    <span className="flex items-center justify-center py-3 text-neutral-600 text-base font-raleway capitalize">
                      {formatString(key)}
                    </span>
                  </th>
                ))}
          </tr>
        </thead>
        <tbody className="overflow-x-auto h-auto">
          {data?.map((item, index) => (
            <tr key={index} className="border">
              {Object.values(item)
                .slice(1)
                .map((value, index) => (
                  <td
                    key={index}
                    className={`w-[89.45px] ${
                      index === ZERO
                        ? ""
                        : "h-[13.60px] text-neutral-600 text-center text-base font-raleway"
                    }`}
                  >
                    {index === ZERO ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${value}`}
                        alt=""
                        width={201}
                        height={142}
                        className="w-[151px] h-[142px]"
                      />
                    ) : typeof value === "boolean" ? (
                      value ? (
                        "Yes"
                      ) : (
                        "No"
                      )
                    ) : (
                      value
                    )}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartCompareCard;

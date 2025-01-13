"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "./../../../store/index";
import { ZERO } from "@/app/utils/constants";

const SubSideMenu: React.FC = () => {
  const pathname = usePathname(); // Get the current path
  const setCheckList = useStore((state) => state.setCheckList);
  const setIsAllChecked = useStore((state) => state.setIsAllChecked);
  const setCartCompareData = useStore((state) => state.setCartCompareData);
  const { checkedlist } = useStore((state) => state.propertyViewListing);
  const { cartCompareData } = useStore((state) => state.cartCompareData);

  const getLinkClasses = (path: string) => {
    // Conditionally apply classes based on the active route
    return pathname.includes(path)
      ? "block py-2 h-11 rounded-[7px] border bg-[#0b7ab7] text-white text-base font-normal"
      : "block py-2 h-11 rounded-[7px] border border-[#918b8b] text-[#198ecd] text-base font-normal";
  };

  const handleLinkClick = () => {
    if (cartCompareData.length !== ZERO) {
      setCartCompareData([]); // Clear cartCompareData
    }
  };

  useEffect(() => {
    if (checkedlist.length !== ZERO) {
      setCheckList([]);
      setIsAllChecked(false);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col md:flex-row justify-between w-full mx-auto">
      <div className="h-11 rounded-[7px]">
        <ul>
          {[
            { path: "/account-details-view", label: "Account Details" },
            { path: "/favourites", label: "Favourites" },
            { path: "/cart", label: "Cart" },
            { path: "/lease-offer", label: "Lease Offer" },
            { path: "/my-properties", label: "My Properties" },
          ].map((item) => (
            <li
              key={item.path}
              className="md:w-[257px] mb-4 text-center hover:bg-gray-200 hover:rounded-[7px] hover:text-white hover:border-none"
            >
              <Link
                href={item.path}
                className={`${getLinkClasses(
                  item.path
                )} flex justify-center items-center space-x-2`}
                onClick={handleLinkClick} // Call handleLinkClick on click
              >
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubSideMenu;

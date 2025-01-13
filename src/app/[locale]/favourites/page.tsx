"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Wishlist } from "@/app/services/api";
import { toast } from "react-toastify";
import { useStore } from "@/app/store";
import { ZERO } from "@/app/utils/constants";

const AccountLayout = dynamic(() => import("../accountLayout"));
const WishlistFilter = dynamic(
  () => import("../components/wishlistFilter/page")
);
const CartCompareCard = dynamic(
  () => import("../components/cartCompareCard/page")
);

import WishlistCard from "../components/wishlistCard/page";
const Favourits: React.FC = () => {
  const { isCart, fevData, isWishlist } = useStore(
    (state) => state.propertyViewListing
  );

  const setFavData = useStore((state) => state.setFavData);
  const setWishlistStatus = useStore((state) => state.setWishlistStatus);
  const setCartStatus = useStore((state) => state.setCartStatus);
  const setCartCompareData = useStore((state) => state.setCartCompareData);
  const { cartCompareData } = useStore((state) => state.cartCompareData);

  useEffect(() => {
    Wishlist()
      .then((res) => {
        const d = res.data.data;
        setFavData(d); // Ensure favData is reset

      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message || "Failed to fetch data");
      });

    // Reset or clear the state before fetching, if necessary
    return () => {
      setWishlistStatus([]);
      setCartStatus(false);
      setCartCompareData([]);
    };
  }, [isWishlist, isCart]);

  return (
    <AccountLayout>
      <div className="flex flex-col">
        <WishlistFilter />
        {cartCompareData && cartCompareData.length > ZERO ? (
          <CartCompareCard data={cartCompareData} />
        ) : (
          fevData && fevData.length > ZERO && <WishlistCard data={fevData} />
        )}
      </div>
    </AccountLayout>
  );
};
export default Favourits;

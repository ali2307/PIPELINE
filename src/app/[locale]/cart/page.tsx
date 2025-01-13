"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { cartList } from "@/app/services/api";
import { useStore } from "@/app/store/index";
import { ZERO } from "@/app/utils/constants";
import dynamic from "next/dynamic";

const AccountLayout = dynamic(() => import("../accountLayout"));
const WishlistFilter = dynamic(() => import("../components/wishlistFilter/page"));
const WishlistCard = dynamic(() => import("../components/wishlistCard/page"));
const CartCompareCard = dynamic(() => import("../components/cartCompareCard/page"));

const Cart: React.FC = () => {
  const { isCart, isWishlist, fevData } = useStore(
    (state) => state.propertyViewListing
  );
  const { cartCompareData } = useStore((state) => state.cartCompareData);
  const setCartStatus = useStore((state) => state.setCartStatus);
  const setFavData = useStore((state) => state.setFavData);

  useEffect(() => {
    cartList()
      .then((res) => {
        const d = res.data.data;
        setFavData(d);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message || "Failed to fetch data");
      });
    return () => {
      setCartStatus(false);
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

export default Cart;

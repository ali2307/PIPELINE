"use client";

import {
  cartList,
  compareUnits,
  FilterOptions,
  removeAllFromWishlistAndCart,
  Wishlist,
} from "@/app/services/api";
import { useStore } from "@/app/store/index";
import { ZERO } from "@/app/utils/constants";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ConfirmModal } from "../confirmModel/page";
interface filterOption {
  label: string;
  value: string;
}
const WishlistFilter: React.FC = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const setCartStatus = useStore((state) => state.setCartStatus);
  const setWishlistStatus = useStore((state) => state.setWishlistStatus);
  const setIsAllChecked = useStore((state) => state.setIsAllChecked);
  const setCheckList = useStore((state) => state.setCheckList);
  const setCartCompareData = useStore((state) => state.setCartCompareData);
  const [isConfirm, setIsConfirm] = useState(false);
  const { isAllChecked, checkedlist, fevData } = useStore(
    (state) => state.propertyViewListing
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const options = [
    { label: "Newest", value: "new" },
    { label: "Price (Low)", value: "low" },
    { label: "Price (High)", value: "high" },
  ];
  const [sortList, setSortList] = useState<filterOption[]>(options);
  const [selectedValue, setSelectedValue] = useState("");
  const setFavData = useStore((state) => state.setFavData);
  // --- filter option from api------

  // useEffect(() => {
  //   FilterOptions()
  //     .then((res: any) => {
  //       setSortList(options);
  //       console.log(res);
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleChangeFilter = (e: any) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    // Helper function to extract numeric rate from a currency string like "AED 100"
    const getNumericRate = (rateString: string) => {
      const numericValue = rateString.match(/\d+/);
      return numericValue ? parseFloat(numericValue[0]) : 0;
    };

    const sortedData = [...fevData].sort((a, b) => {
      const rateA = getNumericRate(a.rate);
      const rateB = getNumericRate(b.rate);

      if (newValue === "high") {
        // Sort by rate high to low
        return rateB - rateA;
      } else if (newValue === "low") {
        // Sort by rate low to high
        return rateA - rateB;
      } else if (newValue === "new") {
        // Sort by id high to low (newest first)
        return b.id - a.id;
      }
      return a.sort_id - b.sort_id; // default: No sorting if the value is not recognized
    });

    setFavData(sortedData);
  };
  //-------filter-sort onchage :from Api----
  // const handleChangeFilter = async (e: any) => {
  //   const newValue = e.target.value;
  //   setSelectedValue(newValue);
  //   try {
  //     let data;
  //     switch (lastSegment) {
  //       case "favourites":
  //         const favResponse = await Wishlist(newValue);
  //         data = favResponse.data.data;
  //         break;
  //       case "cart":
  //         const cartResponse = await cartList(newValue);
  //         data = cartResponse.data.data;
  //         break;
  //       default:
  //         return; // No action if no matching case
  //     }

  //     setFavData(data);
  //   } catch (error: any) {
  //     toast.error(error.message || "Failed to fetch data");
  //   }
  // };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    setIsAllChecked(
      checkedlist.length === fevData.length && fevData.length > 0
    );
  }, [checkedlist, fevData]);

  const handleConfirm = () => {
    setIsConfirm(true);
    handleremoveAllFromWishlist(checkedlist);
    setModalOpen(false);
  };
  const handleSelectAll = (e: any) => {
    const { checked } = e.target;
    setIsAllChecked(checked); // Update the state of the 'Select All' checkbox
    if (checked) {
      // If 'Select All' is checked, add all ids to the checkedlist
      const allIds = fevData.map((item: { id: any }) => item.id);
      setCheckList(allIds);
    } else {
      // If 'Select All' is unchecked, clear the checkedlist
      setCheckList([]);
    }
  };

  const handleremoveAllFromWishlist = (checkedlist: any) => {
    const transformedObject = checkedlist.reduce(
      (acc: any, value: any, index: number) => {
        acc[`unit_id[${index}]`] = value; // Create dynamic keys
        return acc;
      },
      {}
    );
    if (checkedlist.length > ZERO) {
      removeAllFromWishlistAndCart(transformedObject, lastSegment) // Call the actual API function here
        .then(
          (res: {
            data: {
              message: any;
              data: any;
            };
          }) => {
            const d = res.data.data;
            const msg = res.data;

            if (d.hasOwnProperty("is_wishlist")) {
              setWishlistStatus("", d.is_wishlist);
              toast.success(msg.message);
            }

            if (d.hasOwnProperty("is_cart")) {
              setCartStatus(!d.is_cart);
              toast.success(msg.message);
            }
          }
        )
        .catch((error: any) => {
          console.log(error);
          // toast.error(error.message || "Failed to fetch data");
        });
      return () => {
        setCartStatus(false);
        setWishlistStatus([]);
      };
    } else {
      toast.error("Select at least one item");
      handleCloseModal();
    }
  };
  const handleCompareWishlist = (checkedlist: any) => {
    const transformedObject = checkedlist.reduce(
      (acc: any, value: any, index: number) => {
        acc[`unit_id[${index}]`] = value; // Create dynamic keys
        return acc;
      },
      {}
    );

    if (checkedlist.length > ZERO) {
      compareUnits(transformedObject)
        .then((res) => {
          setCartCompareData(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="flex items-center xl:w-[978px] lg:w-[754px] w-full h-[54px] bg-white shadow mb-4 lg:ml-4">
        <div className="flex flex-row items-center space-x-2 lg:gap-8 md:pl-16">
          <div className="flex items-center">
            <select
              value={selectedValue}
              onChange={handleChangeFilter}
              id="sort"
              className="w-full h-[25px] px-3 flex justify-center items-center rounded-[3px] border border-[#3e3e3e] "
            >
              <option
                value="default"
                className="text-center text-[12px] md:text-[14px]"
              >
                Sort by
              </option>
              {sortList.map((option) => (
                <option
                  className="text-center"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            // onClick={() => handleremoveAllFromWishlist(checkedlist)}
            onClick={handleOpenModal}
            type="button"
            className="text-[12px] md:text-[14px] md:w-[99px] w-full h-[25px] text-black rounded-[3px] border border-[#3e3e3e]"
          >
            Delete All
          </button>
          <button
            onClick={() => handleCompareWishlist(checkedlist)}
            type="button"
            disabled={checkedlist.length === 0}
            className={`text-[12px] md:text-[14px] md:w-[106px] w-full h-[25px] text-black rounded-[3px] hover:bg-[#0b7ab7] hover:text-white hover:border-[#0b7ab7] border ${
              checkedlist.length > 0
                ? "border-[#3e3e3e]"
                : "border-gray-400 opacity-50"
            }`}
          >
            Compare
          </button>

          <div className="flex gap-1">
            <label className="text-[10px] md:text-[14px] md:w-[70px] w-full h-[25px] text-center text-gray-500 rounded-[3px]">
              Select All
            </label>
            <input
              className="md:w-6 w-full h-6"
              type="checkbox"
              checked={isAllChecked} // Reflect the 'Select All' checkbox state
              onChange={handleSelectAll} // Handle 'Select All' checkbox change
            />
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
      />
    </>
  );
};
export default WishlistFilter;

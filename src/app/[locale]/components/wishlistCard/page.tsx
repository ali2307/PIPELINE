"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { addtoCart, addtoWishlist, removeFromCart } from "@/app/services/api";
import { toast } from "react-toastify";
import { useStore } from "./../../../store/index";
import Link from "next/link";

interface wishlist {
  data?: any[];
}
const WishlistCard: React.FC<wishlist> = ({ data }) => {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const setCartStatus = useStore((state) => state.setCartStatus);
  const setWishlistStatus = useStore((state) => state.setWishlistStatus);
  const setCheckList = useStore((state) => state.setCheckList);
  const { checkedlist } = useStore((state) => state.propertyViewListing);
  const setIsAllChecked = useStore((state) => state.setIsAllChecked);

  const addToCart = (id: number) => {
    addtoCart(id)
      .then((res) => {
        setCartStatus(res.data.data.is_cart);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error);
      });
    return () => {
      setCartStatus(false);
    };
  };

  const addToWishlist = (id: number, status: boolean) => {
    addtoWishlist(id)
      .then((res) => {
        // Toggle the wishlist status for the specific item

        setWishlistStatus(id, res.data.data.is_wishlist);
        setCheckList([]);
        setIsAllChecked(false);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error);
      });
    return () => {
      setWishlistStatus([]);
    };
  };

  const removeFromCartList = (id: number) => {
    removeFromCart(id)
      .then((res) => {
        toast.success(res.data.message);
        setCartStatus(!res.data.data.is_cart);
        setCheckList([]);
        setIsAllChecked(false);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error);
      });
    return () => {
      setCartStatus(false);
    };
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const id = parseInt(value, 10); // Convert value to number
    const updateCheckedList = (prevCheckList: any[], id: any, checked: any) => {
      return checked
        ? [...prevCheckList, id] // Add the id if checked
        : prevCheckList.filter((item) => item !== id); // Remove the id if unchecked
    };
    // Call the update function and update Zustand store
    const updatedList = updateCheckedList(checkedlist, id, checked);
    setCheckList(updatedList); // Update the Zustand store
  };

  return (
    <>
      {data?.map((item: any, index: number) => (
        <div
          key={item.id}
          className="flex justify-center items-baseline w-full xl:w-[978px] xl:h-[284px] lg:h-[311px] border-[7px] border-[#d9d9d9]/20 lg:ml-4"
        >
          <div className="flex flex-col items-center order-2 md:order-1">
            <div className="hidden md:block relative bottom-[-13.75rem] z-0">
              <svg
                width="751"
                height="53"
                viewBox="0 0 751 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="751" height="53" fill="#F9FFFF" />
              </svg>
            </div>

            {/* <div className="relative w-[751px] h-[53px] bg-black top-[4%] z-0"></div> */}
            <div className="lg:absolute 2xl:w-[963px] lg:w-[798px] w-full lg:h-[274px] z-10">
              <div className="lg:flex lg:gap-20 lg:grid-cols-12">
                <div className="lg:mt-0 lg:col-span-9 flex-col lg:flex lg:justify-center lg:mx-0 ">
                  <div className="flex flex-col md:flex-row justify-center items-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                      className="md:min-w-[239px] md:max-w-[239px] sm:w-full min-h-[270px] max-h-[270px] bg-cover object-cover hover:shadow-xl"
                      width={239}
                      height={278}
                      alt=""
                    />
                    <div className="flex flex-col lg:pl-4 p-4 lg:mx-0">
                      <div className="flex lg:flex-col xl:flex-row justify-between ">
                        <div>
                          <span className="text-[#219653] text-2xl font-normal  uppercase">
                            {item.rate}
                          </span>
                        </div>
                        <div className="flex flex-row gap-10 items-center">
                          <a
                            className="justify-end cursor-pointer"
                            onClick={() =>
                              addToWishlist(item?.id, item.is_wishlist)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill={item.is_wishlist ? "red" : "white"}
                              stroke={item.is_wishlist ? "red" : "black"}
                            >
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          </a>

                          <div className="flex items-center space-x-2">
                            <input
                              id="checkbox"
                              type="checkbox"
                              checked={checkedlist.includes(item.id)} // Check if the checkbox should be checked
                              onChange={handleCheck} // Handle individual checkbox changes
                              value={item.id} // Set item's id as the value
                              className="h-4 w-4  !border-[#268cca] rounded-[5px]"
                            />
                            {/* <div class="w-6 h-8 bg-white rounded-[5px] border border-[#268cca]"></div> */}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-black text-start text-xl font-medium tracking-normal capitalize">
                        {item.name}
                      </h3>
                      <h5 className="text-[#2a2a2a] text-start text-xs font-medium  capitalize">
                        Most relevent
                        <h5>
                          <div className="flex gap-8 mt-6">
                            {item?.unit_specifications?.map((item: any) => (
                              <div
                                key={item.id}
                                className="flex flex-col rounded"
                              >
                                <div className="lg:w-[70px] w-full h-[38px] flex items-center justify-center  bg-[#edecea] rounded">
                                  <Image
                                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.icon}`}
                                    className="w-[24px] h-[24px] bg-cover mr-2"
                                    width={24}
                                    height={24}
                                    alt=""
                                  />
                                  <span className=" text-neutral-700 text-sm font-normal">
                                    {item.value}
                                  </span>
                                </div>
                                <div className="text-stone-500 text-start text-xs font-normal font-['DM Sans'] capitalize">
                                  {item.name}
                                </div>
                              </div>
                            ))}
                            <div className="flex flex-col rounded ">
                              <div className="lg:w-[104px] w-full h-[38px] flex items-center justify-center  bg-[#edecea] rounded">
                                <svg
                                  width={19}
                                  height={19}
                                  viewBox="0 0 19 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M18.1381 0H5.18359V4.31818H0V19H12.9545V14.6818H18.1381V0Z"
                                    fill="#484545"
                                  />
                                </svg>
                                <span className=" text-neutral-700 text-sm font-normal ml-1">
                                  {item.area}
                                </span>
                              </div>
                              <div className="text-stone-500 text-start text-xs font-normal font-['DM Sans'] capitalize">
                                Area
                              </div>
                            </div>
                          </div>
                          <p
                            className="xl:min-w-[605px] xl:max-w-[605px] md:min-w-[482px] md:max-w-[482px] min-w-full md:min-h-[33px] my-3 md:max-h-[33px] overflow-hidden text-justify text-black text-[10px] font-normal mt-4 "
                            dangerouslySetInnerHTML={{
                              __html: item?.description,
                            }}
                          ></p>

                          <div className="flex lg:flex-col 2xl:flex-row">
                            <div className=" w-full flex lg:flex-row flex-col justify-between items-between ">
                              <div className="flex md:flex-row gap-2">
                                <Link href={`/contactus`}>
                                  <button
                                    type="button"
                                    className="md:w-[68px] md:h-[29px] h-[34px] text-[#0670b1] rounded-[5px] border border-[#3d8cbd] hover:bg-sky-700 hover:text-white px-1"
                                  >
                                    Enquiry
                                  </button>
                                </Link>
                                <Link href={`/unit-view/${item.slug}`}>
                                  <button
                                    type="button"
                                    className="md:w-[78px] md:h-[29px] h-[34px] text-[#0670b1] rounded-[5px] border border-[#0670b1] hover:shadow-lg hover:bg-sky-700 hover:text-white px-1"
                                  >
                                    View More
                                  </button>
                                </Link>
                                <button
                                  type="button"
                                  className="md:w-[78px] md:h-[29px] h-[34px] text-[#0670b1] rounded-[5px] border border-[#0670b1] hover:bg-[#5d6879] hover:text-white hover:border-white px-1"
                                >
                                  Book Slot
                                </button>
                              </div>

                              {lastSegment === "favourites" &&
                                !item?.is_cart && (
                                  <button
                                    onClick={() => addToCart(item.id)}
                                    type="button"
                                    className="w-[57px] h-[30px] xl:mt-0  rounded-[5px] border border-[#9ec9e2] hover:bg-sky-600 hover:text-slate-100 flex items-center px-2 sm:my-2"
                                  >
                                    Add
                                    <svg
                                      width="12"
                                      height="12"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="ml-1"
                                    >
                                      <g clipPath="url(#clip0_8470_10787)">
                                        <path
                                          d="M0.5 0.5C0.223858 0.5 0 0.723858 0 1C0 1.27614 0.223858 1.5 0.5 1.5H1.38965C1.46245 1.5 1.5334 1.52291 1.59246 1.56547C1.65151 1.60804 1.69568 1.66811 1.71869 1.73718L3.36719 6.68359C3.44039 6.90321 3.4497 7.13967 3.39356 7.36426L3.25781 7.9082C3.05864 8.70489 3.67879 9.5 4.5 9.5H10.5C10.7761 9.5 11 9.27614 11 9C11 8.72386 10.7761 8.5 10.5 8.5H4.5C4.30531 8.5 4.18032 8.34025 4.22754 8.15137L4.32991 7.74251C4.34725 7.67324 4.38725 7.61174 4.44355 7.56781C4.49984 7.52387 4.56921 7.5 4.64063 7.5H10C10.2153 7.50011 10.4065 7.36242 10.4746 7.1582L11.8076 3.1582C11.9156 2.83431 11.6744 2.49984 11.333 2.5H3.27734C3.20455 2.5 3.13359 2.47709 3.07453 2.43453C3.01548 2.39196 2.97131 2.33189 2.94829 2.26283L2.47461 0.841797C2.40648 0.637577 2.21529 0.499888 2 0.5H0.5ZM4 10C3.44772 10 3 10.4477 3 11C3 11.5523 3.44772 12 4 12C4.55229 12 5 11.5523 5 11C5 10.4477 4.55229 10 4 10ZM10 10C9.44772 10 9 10.4477 9 11C9 11.5523 9.44772 12 10 12C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10Z"
                                          fill="#0670B1"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_8470_10787">
                                          <rect
                                            width="12"
                                            height="12"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                )}

                              {lastSegment === "cart" && (
                                <>
                                  <div className="flex flex-row md:flex-row gap-2 md:mr-6 sm:my-4 md:my-3 lg:my-0">
                                    <button
                                      type="button"
                                      className="w-[67px] h-[29px] bg-[#0670b1] rounded-[5px] text-white border border-[#0670b1] hover:bg-[#1c7f41] hover:border-none  hover:text-white"
                                    >
                                      Proceed
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeFromCartList(item?.id)
                                      }
                                      className="w-[67px] h-[29px] bg-[#0670b1] rounded-[5px] text-white border border-[#0670b1]"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </h5>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default WishlistCard;

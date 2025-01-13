"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import UnitAminities from "../unitAminities/page";
import Image from "next/image";
import UnitAdvrts from "./../../../assets/img/uni-advt.jpg";
import UnitAdvrts1 from "./../../../assets/img/property-location.jpg";
import PropertyUnitTag from "../propertyUnitTag/page";
import Map from "../map/page";
import UnitPlan from "../unitPlan/page";
import { useStore } from "./../../../store/index";
import { MapProvider } from "@/app/providers/map-provider";
import VirtualTourbgimage from "./../../../assets/img/virtual-tour.jpg";
import Link from "next/link";
import { addtoCart, addtoWishlist } from "@/app/services/api";
import { toast } from "react-toastify";
import Login from "../../login/[[...slug]]/page";
import Registration from "../../registration/page";

const UnitDetail: React.FC = () => {
  const { unitDetails } = useStore((state) => state.unitViewDetails);
  const locations = unitDetails.locations || [];
  const setWishlistStatus = useStore((state) => state.setWishlistStatus);
  const setCartStatus = useStore((state) => state.setCartStatus);
  const { isWishlist } = useStore((state) => state.propertyViewListing);
  const token = localStorage.getItem("token");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Login modal state
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] =
    useState(false);

  // Refs to detect outside clicks for modals
  const loginModalRef = useRef<HTMLDivElement>(null);
  const registerModalRef = useRef<HTMLDivElement>(null);
  const addToWishlist = (id: number) => {
    addtoWishlist(id)
      .then((res) => {
        // setWishlistStatus(res.data.data.is_wishlist);
        setWishlistStatus(id, res.data.data.is_wishlist); // Update wishlist status for the specific item

        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error);
      });
  };
  const onLogin = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const closeRegisterModal = () => {
    setIsCreateAccountModalOpen(false);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isLoginModalOpen &&
        loginModalRef.current &&
        !loginModalRef.current.contains(event.target as Node)
      ) {
        closeLoginModal();
      }
      if (
        isCreateAccountModalOpen &&
        registerModalRef.current &&
        !registerModalRef.current.contains(event.target as Node)
      ) {
        closeRegisterModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoginModalOpen, isCreateAccountModalOpen]);

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

  return (
    <>
      <section className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="lg:w-[1024px] xl:w-[1102px] mx-auto p-2 pb-4">
            <div className="flex flex-row lg:grid-cols-2 grid-cols-1 md:gap-10 gap-2 lg:gap-52">
              <div className="col-span-8 sm:w-[76%]">
                <div className="lg:w-[550px]">
                  <div className="flex md:flex-row justify-between items-center">
                    <h1 className="text-black lg:text-3xl md:text-2xl text-md font-medium">
                      {unitDetails.name}
                    </h1>
                    <p className="text-stone-600 md:text-[12px] font-medium sm:hidden md:block ">
                      Property ID: {unitDetails.propertyId}
                    </p>
                  </div>
                  <p className=" text-start items-start text-zinc-800 md:text-[20px] text-[15px] mt-2 font-normal">
                    <span className="text-zinc-800 md:text-[20px] text-[15px] font-normal text-start mr-2">
                      Unit Number :
                    </span>
                    {unitDetails.unit_no}
                  </p>
                  <div className="grid md:grid-cols-3 grid-cols-2 gap-2 my-2">
                    <p className="text-neutral-500 md:text-sm text-[11px] font-normal md:w-[160px] sm:w-[190px]">
                      <span className="text-[#211e1b] md:text-sm text-[10px] font-medium">
                        Unit size :
                      </span>
                      {unitDetails.area}
                    </p>
                    {unitDetails?.highlight_specifications.map(
                      (item: any, index: number) => (
                        <Fragment key={index}>
                          <p className="md:min-w-24 text-neutral-500 md:text-sm text-[11px] font-normal md:w-[160px] ">
                            <span className="text-[#211e1b] md:text-sm text-[10px] font-medium mr-2">
                              {item.label} :
                            </span>
                            {item.value}
                          </p>
                        </Fragment>
                      )
                    )}

                    <div>
                      <p className="text-stone-600 text-[11px] font-medium  sm:block hidden">
                        Property ID: {unitDetails.propertyId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4 sm:w-[35%] text-right">
                <div className="flex md:items-center gap-1 ">
                  <div>
                    <p className="text-black opacity-75 md:text-lg lg:text-xl text-[10px] font-normal uppercase text-center ">
                      {unitDetails.rate}
                    </p>
                  </div>
                  <div className="flex justify-end  items-center md:gap-3 gap-1">
                    <a
                      className="justify-end cursor-pointer hidden md:flex"
                      onClick={
                        token ? () => addToWishlist(unitDetails?.id) : onLogin
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill={unitDetails.is_wishlist ? "red" : "white"}
                        stroke={unitDetails.is_wishlist ? "red" : "black"}
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </a>
                    <a
                      className="justify-end cursor-pointer sm:flex hidden"
                      onClick={
                        token ? () => addToWishlist(unitDetails?.id) : onLogin
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill={unitDetails.is_wishlist ? "red" : "white"}
                        stroke={unitDetails.is_wishlist ? "red" : "black"}
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </a>
                    {unitDetails.is_cart && (
                      <>
                        <svg
                          width={26}
                          height={26}
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_6321_3131)">
                            <path
                              d="M1.08333 1.08594C0.485025 1.08594 0 1.57096 0 2.16927C0 2.76758 0.485025 3.2526 1.08333 3.2526H3.01091C3.16863 3.2526 3.32237 3.30223 3.45032 3.39446C3.57827 3.48669 3.67396 3.61685 3.72383 3.76648L7.29557 14.4837C7.45419 14.9596 7.47435 15.4719 7.3527 15.9585L7.05859 17.137C6.62705 18.8632 7.97072 20.5859 9.75 20.5859H22.75C23.3483 20.5859 23.8333 20.1009 23.8333 19.5026C23.8333 18.9043 23.3483 18.4193 22.75 18.4193H9.75C9.32817 18.4193 9.05736 18.0731 9.15967 17.6639L9.38146 16.7781C9.41904 16.628 9.50571 16.4947 9.62768 16.3995C9.74966 16.3043 9.89996 16.2526 10.0547 16.2526H21.6667C22.1331 16.2528 22.5474 15.9545 22.695 15.512L25.5832 6.84538C25.8171 6.14361 25.2946 5.41893 24.5549 5.41927H7.10091C6.94318 5.41927 6.78945 5.36964 6.66149 5.27741C6.53353 5.18519 6.43783 5.05504 6.38795 4.9054L5.36165 1.8265C5.21403 1.38402 4.79978 1.08569 4.33333 1.08594H1.08333ZM8.66667 21.6693C7.47005 21.6693 6.5 22.6393 6.5 23.8359C6.5 25.0326 7.47005 26.0026 8.66667 26.0026C9.86328 26.0026 10.8333 25.0326 10.8333 23.8359C10.8333 22.6393 9.86328 21.6693 8.66667 21.6693ZM21.6667 21.6693C20.4701 21.6693 19.5 22.6393 19.5 23.8359C19.5 25.0326 20.4701 26.0026 21.6667 26.0026C22.8633 26.0026 23.8333 25.0326 23.8333 23.8359C23.8333 22.6393 22.8633 21.6693 21.6667 21.6693Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_6321_3131">
                              <rect width={26} height={26} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </>
                    )}
                    {!unitDetails.is_cart && (
                      <>
                        <button
                          onClick={
                            token ? () => addToCart(unitDetails?.id) : onLogin
                          }
                          type="button"
                          className="md:flex sm:hidden w-[57px] h-[30px] rounded-[5px] px-2 md:text-sm text-[12px] hover:border-[#3278a0] hover:bg-sky-600 font-medium hover:text-gray-100 items-center  border-gray-800 bg-white text-sky-600 border "
                        >
                          Add
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 12 12"
                            fill="#fff"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-1"
                          >
                            <g clipPath="url(#clip0_8470_10787)">
                              <path
                                d="M0.5 0.5C0.223858 0.5 0 0.723858 0 1C0 1.27614 0.223858 1.5 0.5 1.5H1.38965C1.46245 1.5 1.5334 1.52291 1.59246 1.56547C1.65151 1.60804 1.69568 1.66811 1.71869 1.73718L3.36719 6.68359C3.44039 6.90321 3.4497 7.13967 3.39356 7.36426L3.25781 7.9082C3.05864 8.70489 3.67879 9.5 4.5 9.5H10.5C10.7761 9.5 11 9.27614 11 9C11 8.72386 10.7761 8.5 10.5 8.5H4.5C4.30531 8.5 4.18032 8.34025 4.22754 8.15137L4.32991 7.74251C4.34725 7.67324 4.38725 7.61174 4.44355 7.56781C4.49984 7.52387 4.56921 7.5 4.64063 7.5H10C10.2153 7.50011 10.4065 7.36242 10.4746 7.1582L11.8076 3.1582C11.9156 2.83431 11.6744 2.49984 11.333 2.5H3.27734C3.20455 2.5 3.13359 2.47709 3.07453 2.43453C3.01548 2.39196 2.97131 2.33189 2.94829 2.26283L2.47461 0.841797C2.40648 0.637577 2.21529 0.499888 2 0.5H0.5ZM4 10C3.44772 10 3 10.4477 3 11C3 11.5523 3.44772 12 4 12C4.55229 12 5 11.5523 5 11C5 10.4477 4.55229 10 4 10ZM10 10C9.44772 10 9 10.4477 9 11C9 11.5523 9.44772 12 10 12C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10Z"
                                fill="#000"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_8470_10787">
                                <rect width="12" height="12" fill="#fff" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </>
                    )}

                    {!unitDetails.is_cart && (
                      <>
                        <button
                          onClick={
                            token ? () => addToCart(unitDetails?.id) : onLogin
                          }
                          type="button"
                          className="sm:flex hidden sm:w-[38px] h-[28px] sm:h-[18px] gap-1 rounded-[5px] justify-center md:text-sm text-[6px] border border-gray-500 hover:border-[#3278a0] hover:bg-sky-600 font-medium hover:text-gray-100 items-center md:border-gray-800 bg-white text-sky-600 "
                        >
                          Add
                          <svg
                            width="10"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="#fff"
                            xmlns="http://www.w3.org/2000/svg"
                            className="md:ml-1"
                          >
                            <g clipPath="url(#clip0_8470_10787)">
                              <path
                                d="M0.5 0.5C0.223858 0.5 0 0.723858 0 1C0 1.27614 0.223858 1.5 0.5 1.5H1.38965C1.46245 1.5 1.5334 1.52291 1.59246 1.56547C1.65151 1.60804 1.69568 1.66811 1.71869 1.73718L3.36719 6.68359C3.44039 6.90321 3.4497 7.13967 3.39356 7.36426L3.25781 7.9082C3.05864 8.70489 3.67879 9.5 4.5 9.5H10.5C10.7761 9.5 11 9.27614 11 9C11 8.72386 10.7761 8.5 10.5 8.5H4.5C4.30531 8.5 4.18032 8.34025 4.22754 8.15137L4.32991 7.74251C4.34725 7.67324 4.38725 7.61174 4.44355 7.56781C4.49984 7.52387 4.56921 7.5 4.64063 7.5H10C10.2153 7.50011 10.4065 7.36242 10.4746 7.1582L11.8076 3.1582C11.9156 2.83431 11.6744 2.49984 11.333 2.5H3.27734C3.20455 2.5 3.13359 2.47709 3.07453 2.43453C3.01548 2.39196 2.97131 2.33189 2.94829 2.26283L2.47461 0.841797C2.40648 0.637577 2.21529 0.499888 2 0.5H0.5ZM4 10C3.44772 10 3 10.4477 3 11C3 11.5523 3.44772 12 4 12C4.55229 12 5 11.5523 5 11C5 10.4477 4.55229 10 4 10ZM10 10C9.44772 10 9 10.4477 9 11C9 11.5523 9.44772 12 10 12C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10Z"
                                fill="#000"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_8470_10787">
                                <rect width="12" height="12" fill="#fff" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-row md:justify-end md:items-start lg:items-end items-end lg:space-y-6 gap-3 mt-2">
                  <Link
                    href={{
                      pathname: "/contactus/enqury",
                    }}
                  >
                    <button className="px-3 py-1 rounded-[5px] border border-[#0670b1] text-[#0670b1] hover:bg-sky-700 hover:text-white focus:outline-none text-[7px] md:text-sm font-medium ">
                      Enquiry
                    </button>
                  </Link>
                  <button className="md:w-[80px] w-[54px] px-1 py-1 rounded-[5px] border border-[#0670b1] text-[#0670b1]   hover:bg-sky-700 hover:text-white  focus:outline-none text-[7px] md:text-sm font-medium">
                    Book Slot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <UnitAminities />
      {unitDetails.virtual_tour != null && (
        <section className="w-full mx-auto relative ">
          <div className="flex justify-center items-center relative md:h-[683px] h-[540px]">
            <Image
              src={VirtualTourbgimage}
              alt="Background"
              className=" md:w-[799px]:h-[528px] inset-0 w-full h-full object-cover z-0 pointer-events-none"
            />

            <div className="absolute  inset-0 flex flex-col items-center z-10 md:mb-20">
              <h2 className="text-black md:text-3xl text-xl text-center font-medium mb-4 ">
                Real Estate Virtual Tour
              </h2>
              <div className="relative flex  justify-center items-center md:w-[798px] w-full md:h-[527px] h-[432px] p-4">
                <div className="absolute flex justify-center top-0 left-0 right-0 bottom-0 shadow border-8 border-white items-center w-full h-full bg-opacity-90 rounded-[9px]">
                  <iframe
                    src={unitDetails.virtual_tour}
                    className="md:w-[795px] md:h-[500px] h-[380px] w-full relative"
                    frameBorder={0}
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto">
        <div className="xl:w-[1102px] w-full mx-auto">
          <div className="flex flex-col md:flex-row md:grid-cols-2 grid-cols-1 pt-6 gap-12">
            <div className="flex flex-col md:flex-row md:w-[638px] w-full gap-5 p-4">
              <div className="col-span-4">
                <h4 className="md:w-[132px] w-full text-black text-sm font-semibold">
                  Description
                </h4>
              </div>
              <div className="col-span-8">
                <div
                  className="md:w-[472px] w-full  min-h-[260px] max-h-[596px] overflow-hidden text-justify text-black text-sm font-medium mb-5"
                  dangerouslySetInnerHTML={{
                    __html: unitDetails.description,
                  }}
                />

                <UnitPlan />
                <MapProvider>
                  <div className="lg:w-[632px] w-full">
                    <div className="grid md:grid-cols-2 grid-cols-1">
                      <div>
                        <div className="col-span-4">
                          <h4 className="text-black text-sm text-start font-medium pb-4">
                            Location
                          </h4>
                        </div>
                        <div className="col-span-8">
                          <div>
                            <div className="md:w-[472px] w-full h-[425px] text-justify text-black text-sm font-medium mx-auto">
                              <Map
                                locations={locations}
                                height="400px"
                                width="100%"
                                className=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                  </div>
                </MapProvider>
                <PropertyUnitTag />
              </div>
            </div>
            <div className="md:w-[418px] w-full p-3 sm:hidden">
              <Image
                src={UnitAdvrts}
                alt=""
                className="mb-20 md:w-[418px] max-h-[744px] mx-auto sm:hidden"
              />
              <Image
                src={UnitAdvrts1}
                alt=""
                className="md:w-[364px] max-h-[646px] mx-auto"
              />
            </div>
          </div>

          <div className="w-[0px] h-[0px] border border-[#f1f1f1] md:my-6" />
        </div>
      </section>
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-[#2b2626] bg-opacity-50 flex justify-center items-center z-20">
          <div ref={loginModalRef}>
            <Login
              setIsCreateAccountModalOpen={setIsCreateAccountModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          </div>
        </div>
      )}
      {isCreateAccountModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div ref={registerModalRef}>
            <Registration
              setIsCreateAccountModalOpen={setIsCreateAccountModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default UnitDetail;

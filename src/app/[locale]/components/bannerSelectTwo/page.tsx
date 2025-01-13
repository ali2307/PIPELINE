"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "./../../../store/index";
import { logout } from "@/app/services/api";

interface Props {
  isMobileFilterOpen: boolean; // Boolean value indicating if the mobile filter is open
  setIsMobileFilterOpen: React.Dispatch<React.SetStateAction<boolean>>; // Function to toggle the filter state
}

const BannerSelecterTwo: React.FC<Props> = ({
  setIsMobileFilterOpen,
  isMobileFilterOpen,
}) => {
  const { isLogin, status_flag, token, userImage } = useStore(
    (state) => state.session
  );

  const { propertyType, priceRange } = useStore((state) => state.homeBanner);
  const setFinalFilterData = useStore((state) => state.setFinalFilterData);
  const setIsLogin = useStore((state) => state.setIsLogin);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    logout()
      .then((res) => {
        if (res.data.status) {
          localStorage.clear();
          setIsLogin(false);
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.message || "Failed to fetch data");
      });
  };

  const [filters, setFilters] = useState({
    propertyType: "all",
    bedsAndBaths: "",
    price: "",
  });

  useEffect(() => {
    setFinalFilterData([]);
  }, []);

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const generateSearchQuery = () => {
    const query = new URLSearchParams(filters).toString();
    return `/search-unit?${query}`; // This assumes you're sending the filters as query parameters
  };

  const handleSearch = async (event: any) => {
    event.preventDefault(); // Prevent default navigation behavior
    setLoading(true);
    const queryUrl = generateSearchQuery();

    try {
      await router.push(queryUrl); // Updates the URL
      // Optionally, you can also fetch data here if necessary
    } catch (error) {
      console.error("Error navigating to search results:", error);
    } finally {
      setLoading(false);
    }
  };


  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(true);
  };

  return (
    <>
      <div className="2xl:w-[1465px] xl:w-[1200px] lg:w-[990px] mx-auto relative z-20 ">
        <div className="hidden md:block lg:flex">
          <div className="w-full bg-[#EDEDED] flex flex-wrap sm:flex-nowrap grid-cols-1 md:grid-cols-2 shadow-lg rounded mx-auto gap-1">
            <div className="h-auto flex flex-col lg:flex-row">
              <div className="2xl:w-[1111px] xl:w-[850px] lg:w-[640px] hidden md:flex border-r-0 md:border-r-2 lg:border-black p-4">
                <div className="2xl:w-80 lg:w-40 xl:w-56 md:w-[25%] border-b-1 md:border-b-0 md:border-r-2 border-gray-600  md:py-1">
                  <label
                    htmlFor="property-type"
                    className="text-sm flex justify-start font-optima pl-4 font-normal text-black uppercase"
                  >
                    Property Type
                  </label>
                  <select
                    id="property-type"
                    name="propertyType" // Update the name for state handling
                    value={filters.propertyType}
                    onChange={handleFilterChange} // Add state handler
                    className="mt-1 xl:w-[175px] py-2 text-sm flex justify-start font-optima pl-3 mr-2 font-semibold uppercase text-black border-0 w-full 2xl:w-64  px-3 bg-[#EDEDED] hover:outline-none focus:outline-none focus:border-none rounded-md"
                  >
                    propertyTypes
                    <option value="all">All</option>
                    {propertyType?.map((item: any) => {
                      return (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="2xl:w-80  lg:w-40  xl:w-48 md:w-[25%] border-b-2 md:border-b-0 md:border-r-2 border-gray-600 px-3 py-2 md:py-1">
                  <label
                    htmlFor="beds-baths"
                    className="text-sm flex justify-start font-optima pl-4 font-normal text-black uppercase"
                  >
                    Beds and Baths
                  </label>
                  <select
                    id="beds-baths"
                    name="bedsAndBaths" // Update the name for state handling
                    value={filters.bedsAndBaths}
                    onChange={handleFilterChange} // Add state handler
                    className="mt-1 block text-sm font-semibold text-black bg-[#EDEDED] border-0 w-full  xl:w-[175px] lg:w-[145px]  2xl:w-[238px] py-2 px-3 font-optima uppercase rounded-md focus:outline-none"
                  >
                    <option value="">Select</option>

                    <option value="1bed-1bath">1 Bed, 1 Bath</option>
                    <option value="2bed-2bath">2 Beds, 2 Baths</option>
                    <option value="3bed-2bath">3 Beds, 2 Baths</option>
                  </select>
                </div>
                <div className="2xl:w-80 lg:w-40  xl:w-48 md:w-[25%] border-b-2 md:border-b-0 md:border-r-2 border-gray-600 px-3 py-2 md:py-1">
                  <label
                    htmlFor="price"
                    className="text-sm flex justify-start font-optima pl-4 font-normal text-black uppercase"
                  >
                    Price
                  </label>
                  <select
                    id="price"
                    name="price" // Update the name for state handling
                    value={filters.price}
                    onChange={handleFilterChange} // Add state handler
                    className="mt-1 text-sm block font-semibold text-black border-0 bg-[#EDEDED] flex-1 w-full  lg:w-[145px] 2xl:w-[275px] py-2 px-3 font-optima uppercase rounded-md focus:outline-none"
                  >
                    <option value="">Select</option>
                    {priceRange?.map((item: any) => {
                      return (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-full md:w-[24%] flex justify-center items-center px-4 py-2 md:py-0">
                  <button
                    onClick={handleSearch}
                    className="w-full xl:w-44 lg:w-24 h-[50px] text-white py-2 md:py-0 mx-0 bg-black text-xl font-semibold opacity-50 shadow-sm hover:bg-[#000] flex justify-center items-center"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Search"}
                  </button>
                </div>
              </div>
              <div className=" lg:w-[352px] w-full h-auto lg:h-[97px] flex flex-col items-center justify-end md:flex-row p-6">
                <h3 className="w-full md:w-auto border-b-2 md:border-b-0 md:border-r-2 border-gray-600 text-black py-2 text-[26px] mr-0 md:mr-[1.5rem] font-bold font-optima uppercase px-3">
                  PORTAL
                </h3>
                {isLogin ? (
                  <button
                    className="w-full xl:w-44 lg:w-24 h-[50px] bg-black opacity-50 xl:text-lg lg:text-md font-semibold text-white xl:px-[3.6rem] lg:px-[1.6rem] xl:py-[0.8rem] lg:py-[1rem] shadow-sm hover:bg-black mt-2 md:mt-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    className="w-full xl:w-44 lg:w-24 h-[50px] text-center py-3 bg-black opacity-50 xl:text-lg lg:text-md font-semibold text-white xl:px-[3.2rem] lg:px-[1.6rem] xl:py-[0.8rem] lg:py-[1rem] shadow-sm hover:bg-black mt-2 md:mt-0"
                    href="/home-login"
                  >
                    Log In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="sm:w-[256px] h-[70px] flex  bg-black/50 md:hidden justify-between items-center mx-auto px-10 z-10"
        onClick={toggleMobileFilter}
      >
        <div className="text-white text-base font-medium font-['Roboto'] uppercase flex justify-start items-start">
          Find Properties
        </div>

        <div className="sm:w-[23px] h-[23px] text-white relative">
          <svg
            width="18"
            height="18"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_7373_5218)">
              <path
                d="M21.8499 10.35H12.6501V1.14993C12.6501 0.515268 12.1348 0 11.4999 0C10.8653 0 10.35 0.515268 10.35 1.14993V10.35H1.14993C0.515268 10.35 0 10.8653 0 11.4999C0 12.1348 0.515268 12.6501 1.14993 12.6501H10.35V21.8499C10.35 22.4848 10.8653 23.0001 11.4999 23.0001C12.1348 23.0001 12.6501 22.4848 12.6501 21.8499V12.6501H21.8499C22.4848 12.6501 23.0001 12.1348 23.0001 11.4999C23.0001 10.8653 22.4848 10.35 21.8499 10.35Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_7373_5218">
                <rect width="23" height="23" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      {isMobileFilterOpen && (
        <div className=" h-[70px] flex bg-black/50 md:hidden justify-center items-center mx-auto z-10">
          <div className="flex flex-col w-[304px] h-[378px] bg-black/50 backdrop-blur-sm px-5 p-6 mx-auto">
            <label
              htmlFor="hs-select-label"
              className="block  text-base font-light mb-2 text-white "
            >
              TYPE
            </label>
            <select
              id="property-type"
              name="propertyType" // Update the name for state handling
              value={filters.propertyType}
              onChange={handleFilterChange} // Add state handler
              className="py-3 px-4 mb-4 text-base font-normal text-white pe-9 block md:w-[273px] opacity-90 bg-[#252325] w-full  border-b-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              propertyTypes
              <option value="all">All</option>
              {propertyType?.map((item: any) => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
            <label
              htmlFor="hs-select-label"
              className="block text-base font-light  mb-2 text-white  "
            >
              BEDROOMS
            </label>
            <select
              id="beds-baths"
              name="bedsAndBaths" // Update the name for state handling
              value={filters.bedsAndBaths}
              onChange={handleFilterChange} // Add state handler
              className="py-3 px-4 mb-4 text-base font-normal  text-white pe-9 block md:w-[273px] w-full bg-[#252325]  border-b-2 opacity-90  disabled:opacity-50 disabled:pointer-events-none "
            >
              <option value="">Select</option>

              <option value="1bed-1bath">1 Bed, 1 Bath</option>
              <option value="2bed-2bath">2 Beds, 2 Baths</option>
              <option value="3bed-2bath">3 Beds, 2 Baths</option>
            </select>
            <label
              htmlFor="hs-select-label"
              className="block text-base font-light  mb-2 text-white"
            >
              PRICE (AED)
            </label>
            <select
              id="price"
              name="price" // Update the name for state handling
              value={filters.price}
              onChange={handleFilterChange} // Add state handler
              className="py-3 px-4 mb-4 text-base font-normal  text-white pe-9 block md:w-[273px] bg-[#252325] border-b-2 opacity-90 w-full   disabled:opacity-50 disabled:pointer-events-none  "
            >
              <option value="">Select</option>
              {priceRange?.map((item: any) => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
            <div className="flex justify-center items-center cursor-pointer">
              <div className="w-[161px] h-[50px] relative">
                <div className="w-[161px] h-[50px] left-0 top-0 absolute bg-black" />
                <Link
                  href={generateSearchQuery()} // Dynamically generate the URL with query params
                  passHref
                  className="left-[50px] top-[14px] absolute text-white text-xl font-bold font-['Roboto']"
                >
                  Search
                </Link>
              </div>
            </div>
            <div className="w-[117px] h-[5px] bg-black rounded-[3px] mx-auto mt-5" />{" "}
          </div>
        </div>
      )}
    </>
  );
};
export default BannerSelecterTwo;

"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const BannerSelecterOne: React.FC = () => {
  return (
    <>

{/* <div className="container absolute mx-32 mt-10 z-50">
			<div className="bg-[#EDEDED] p-4 flex  justify-between shadow-lg rounded mx-auto">
					<div className="">
						<label className="block text-sm font-normal text-gray-700 font-optima uppercase">Property
							Type</label>
						<select id="property-type" name="property-type" className="mt-1 block w-64 py-2 px-3 font-optima border uppercase  font-semibold bg-[#EDEDED] rounded-md  focus:outline-none  sm:text-sm">
							<option>All</option>
						</select>
					</div>
          <div className="w-[58px] h-[0px] origin-top-left rotate-90 bg-black border border-black"></div>

					<div className=" ">
						<label  className="block text-sm font-medium text-gray-700 uppercase font-optima">Beds and
							Baths</label>
						<select id="beds-baths" name="beds-baths" className="mt-1 block w-64 py-2 px-3 border bg-[#EDEDED]  font-optima uppercase rounded-md focus:outline-none  sm:text-sm" >
							<option>Select</option>
						</select>
					</div>
<div className="border-r-4 border-indigo-500 pr-4"></div>
					<div className="">
						<label  className="block text-sm font-medium text-gray-700 uppercase font-optima ">Price</label>
						<select id="price" name="price" className="mt-1 block  w-64 py-2 px-3 border  bg-[#EDEDED] font-optima uppercase  rounded-md  focus:outline-none  sm:text-sm" >
							<option>Select</option>
						</select>

					</div>
					<button className="bg-gray-700 w-44 text-white  py-0  shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 font-optima  focus:ring-indigo-500 ">Search</button>
				
					<div className="flex space-x-4">

						<h3 className=" text-black px-4 py-2 text-3xl mr-10 font-medium font-optima  rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase" >PORTAL</h3>
						
						<button className="bg-gray-700 w-44 text-white font-optima px-4 py-2 shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >Log
							In</button>
					</div>
		
				</div>
					
			
			</div> */}
      {/* <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 2, x: 0 }}
        transition={{ duration: 2 }}
        classNameName="w-full md:mt-10 2xl:mt-16 mt-10 flex md:flex-col lg:flex-row  2xl:flex-row grid-cols-2 flex-col 2xl:gap-5 text-cyan-500 justify-center 2xl:mx-80 lg:mx-3  border-pink-900"
      > */}
        {/* <div className="w-full md:mt-10 2xl:mt-16 mt-0 flex md:flex-col lg:flex-col 2xl:flex-row grid-cols-2 flex-col 2xl:gap-5 text-cyan-500 justify-center 2xl:mx-80 lg:mx-3  border-pink-900"> */}
        {/* <div
          className="2xl:w-[798px]  h-[309px] bg-white w-full rounded-t-[25px] shadow border-pink-900"
          style={{ visibility: "visible", animationName: "fadeInUp" }}
        > */}
          {/* <ul id="tabs" className="inline-flex w-full">
            <li
              className="cursor-pointer w-full h-[72px] flex items-center 
       2xl:w-1/2 justify-center font-medium lg:text-2xl text-md rounded-tl-[25px] -mb-2  active"
              tab-to="first"
            >
              <div className="2xl:w-[400px]  w-full h-[72px]  flex justify-center   items-center text-sky-700  rounded-tl-[25px] bg-[#F8F8F8]  hover:text-white hover:bg-sky-700 hover:rounded-tl-[25px]">
                Residentials
              </div>
            </li>
            <li
              className="cursor-pointer h-[72px] w-full flex items-center  2xl:w-1/2 justify-center font-medium lg:text-2xl text-md rounded-tr-[25px]-mb-2 hover:rounded-tr-[25px]"
              tab-to="second"
            >
              <div className="2xl:w-[400px] w-full h-[72px] flex justify-center items-center  text-sky-700  bg-[#F8F8F8] hover:text-white  hover:rounded-tr-[25px]  hover:bg-sky-700 rounded-tr-[25px]">
                Commercial
              </div>
            </li>
          </ul>
          <div id="tab-contents">
            <div
              className="lg:p-14 p-4 2xl:w-[798px]  h-[309px] active bg-white tab-now rounded-b-lg shadow-xl  border-pink-900 "
              tab-id="first"
            >
              <div className="w-full">
                <div className="relative justify-between flex w-full min-w-[200px] h-10">
                  <div className="relative w-full mt-1">
                    <input
                      type="text"
                      id="password"
                      className="text-search w-full placeholder-[#0670B1] h-[60px] text-sm md:text-[17px] pl-3 pr-10 py-4 border-2 bg-[#0670B11A]
                border-none rounded-lg hover:border-gray-300 focus:outline-none focus:border-blue-500 italic transition-colors"
                      placeholder="Looking for new home"
                    />
                    <button className="block w-100 h-7 text-center text-xl leading-0 absolute top-3 right-2 text-sky-700 focus:outline-none hover:text-sky-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex mt-4 g-8 flex-row justify-center pt-4 bg-white min-w-screen">
                <div className="flex flex-col md:flex-row justify-between items-center g-4 w-full p-2">
                  <button className="lg:w-[204px] w-full flex flex-row justify-between  md:text-sm lg:text-md px-2 py-2 text-gray-700 bg-white border-2 border-white rounded-md shadow focus:outline-none">
                    <span className="select-none text-md">Property Type</span>
                    <svg
                      id="arrow-down"
                      className="hidden w-6 h-6 stroke-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      id="arrow-up"
                      className="w-6 h-6 stroke-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    id="options"
                    className="hidden w-48 py-2 mt-2 bg-white rounded-lg shadow-xl dropdown-menu dropdown-menu-end dropdown-toggle"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 1
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 2
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 3
                    </a>
                  </div>
                  <button className="lg:w-[177px] md:w-34 w-full  flex flex-row justify-between  md:text-sm lg:text-md px-2 py-2 text-gray-700 bg-white border-2 border-white rounded-md shadow focus:outline-none focus:border-blue-600">
                    <span className="select-none text-md">Beds And Baths</span>
                    <svg
                      id="arrow-down"
                      className="hidden w-6 h-6 stroke-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      id="arrow-up"
                      className="w-6 h-6 stroke-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    id="options"
                    className="hidden w-48 py-2 mt-2 bg-white rounded-lg shadow-xl"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 1
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 2
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 3
                    </a>
                  </div>
                  <button className="lg:w-[154px] w-full flex flex-row justify-between md:text-sm lg:text-md  px-2 py-2 text-gray-700 bg-white border-2 border-white rounded-md shadow focus:outline-none focus:border-blue-600">
                    <span className="select-none text-md">Price</span>
                    <svg
                      id="arrow-down"
                      className="hidden w-6 h-6 stroke-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      id="arrow-up"
                      className="w-6 h-6 stroke-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    id="options"
                    className="hidden w-48 py-2 mt-2 bg-white rounded-lg shadow-xl"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 1
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 2
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 3
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button className="b-cyan text-2xl  hover:bg-white-400 hover:shadow-2xl hover:border-b-cyan text-white md:mt-10 2xl:mt-6 mt-2 font-bold  px-4 w-[150px] h-[50px] bg-sky-700 rounded-[5px]">
                  Search
                </button>
              </div>
            </div>
            <div
              className="hidden md:w-[560px] rounded-[11px]  tab-now p-14 2xl:w-[798px]  h-[309px] active bg-white tab-now rounded-b-lg shadow-xl  border-pink-900 "
              tab-id="second"
            >
              <div className="w-full ">
                <div className="relative justify-between flex w-full min-w-[200px] h-10">
                  <div className="relative w-full mt-1">
                    <input
                      type="text"
                      id="password"
                      className="text-search w-full placeholder-[#0670B180] pl-3 pr-10 py-4 border-2 bg-[#0670B11A]
                border-none rounded-lg hover:border-gray-300 text-[#0670B1] focus:outline-none focus:border-blue-500 italic transition-colors"
                      placeholder="Looking for new home"
                    />
                    <button className="block w-100 h-7 text-center text-xl leading-0 absolute top-3 right-2 text-sky-700 focus:outline-none hover:text-sky-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex mt-4 flex-row justify-center pt-4 bg-white min-w-screen">
                <div className="flex justify-between items-center g-4 w-full p-2">
                  <button className="lg:w-[204px] w-full flex flex-row justify-between md:text-sm lg:text-md px-2 py-2 text-gray-700 bg-white border-2 border-white rounded-md shadow focus:outline-none ">
                    <span className="select-none text-md">Property Type</span>
                    <svg
                      id="arrow-down"
                      className="hidden w-6 h-6 stroke-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      id="arrow-up"
                      className="w-6 h-6 stroke-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    id="options"
                    className="hidden w-48 py-2 mt-2 bg-white rounded-lg shadow-xl"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 1
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 2
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 3
                    </a>
                  </div>
                  <button
                    // onclick="showDropdownOptions()"
                    className="lg:w-[177px] w-full md:w-34 flex flex-row justify-between md:text-sm lg:text-md px-2 py-2 text-gray-700 bg-white border-2 border-white rounded-md shadow focus:outline-none "
                  >
                    <span className="select-none text-md">Beds And Baths</span>
                    <svg
                      id="arrow-down"
                      className="hidden w-6 h-6 stroke-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      id="arrow-up"
                      className="w-6 h-6 stroke-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    id="options"
                    className="hidden w-48 py-2 mt-2 bg-white rounded-lg shadow-xl"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 1
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 2
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 3
                    </a>
                  </div>
                  <button
                    // onclick="showDropdownOptions()"
                    className="lg:w-[154px] w-full flex flex-row justify-between md:text-sm lg:text-md px-2 py-2 text-gray-700 bg-white border-2 border-white rounded-md shadow focus:outline-none"
                  >
                    <span className="select-none text-md">Price</span>
                    <svg
                      id="arrow-down"
                      className="hidden w-6 h-6 stroke-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      id="arrow-up"
                      className="w-6 h-6 stroke-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    id="options"
                    className="hidden w-48 py-2 mt-2 bg-white rounded-lg shadow-xl"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 1
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 2
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
                    >
                      Item 3
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button className="b-cyan text-2xl  hover:bg-white-400 hover:shadow-2xl hover:border-b-cyan text-white md:mt-10 2xl:mt-6 mt-2 font-bold  px-4 w-[150px] h-[50px] bg-sky-700 rounded-[5px]">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:w-[387px] md:h-[380px] h-[420px] mt-24 md:w-full w-full pl-30 bg-[#aebcc4d6] lg:mt-0 lg:ml-3 2xl:mt-0 md:mt-24 bg-opacity-50 rounded-[25px] shadow z-2">
          <div className="lg:w-full 2xl:w-96 md-w-full w-full">
            <h3 className="font-medium lg:text-2xl md:text-2xl sm:text-3xl w-full text-center h-[72px] pt-4 pb-4 rounded-t-3xl text-white bg-sky-700 portal hover:bg-none ">
              Portal
            </h3>
            <div className=" bg-opacity-30 h-[0px] bg-[#A8BFCD80] rounded-b-3xl">
              <p className="p-10 pt-10 px-8 text-black text-black/opacity-75 text-xl font-normal md:text-xl 2xl:text-start max-w-3xl md:max-w-xl lg:text-sm  2xl:max-w-sm sm:text-center">
                Manage your property needs online with ADUREC Tenant
              </p>
              {/* <div className="flex justify-center items-center gap-x-4">
                  <div className="flex">
                    <input
                      type="radio"
                      name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-black-400  rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                      id="hs-radio-group-1"
                      defaultChecked
                    />
                    <label
                      htmlFor="hs-radio-group-1"
                      className="lg:text-sm sm:text-xl text-gray-800 text-sm ms-2 md:text-lg 2xl:text-sm font-medium"
                    >
                      Guest
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-black-400  rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                      id="hs-radio-group-2"
                    />
                    <label
                      htmlFor="hs-radio-group-2"
                      className="lg:text-sm sm:text-xl text-gray-800 ms-2 md:text-lg 2xl:text-sm font-medium"
                    >
                      Tenant
                    </label>
                  </div>
                </div> */}
              {/* <div className="flex justify-center items-center">
                <button className="b-cyan md:text-2xl w-[150px] h-[60px]  text-xl  font-dm bg-sky-700  rounded-[10px] pb-2 mb-4 hover:bg-white-100 hover:shadow-2xl hover:border-b-cyan text-white mt-6 font-bold py-2 px-4 ">
                  Log In
                </button>
              </div>
              <p className=" pb-4 lg:text-sm sm:text-xl md:text-xl text-center font-normal hover:underline md:pb-6 text-sm font-dm text-sky-700">
                Not a current user? Click here to register.
              </p>
            </div>
          </div>
        </div> */} 
        {/* </div> */}
      {/* </motion.div> */}
    </>
  );
};

export default BannerSelecterOne;

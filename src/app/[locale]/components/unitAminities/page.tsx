"use client";
import React from "react";
import { useStore } from "./../../../store/index";
import Image from "next/image";

const UnitAminities: React.FC = () => {
  const { unitDetails } = useStore((state) => state.unitViewDetails);
  return (
    <>
      <section className=" bg-neutral-50">
        <div className="container mx-auto lg:pt-[5rem] pt-[1rem] pb-[1rem] rounded-lg ">
          <div className=" xl:w-[1102px] w-full mx-auto">
            <div className="flex flex-col md:flex-row md:grid-cols-2 grid-cols-1 xl:gap-20 lg:gap-10 mb-10">
              <div className="col-span-8">
                <div className="lg:w-[630px] w-full mx-auto">
                  <div className="grid lg:grid-cols-[140px_1fr] p-4 ">
                    <div className="">
                      <h2 className="md:w-[132px] text-black text-start text-sm font-semibold mb-2">
                        Specification
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-2 gap-4 md:ml-6">
                      {unitDetails?.specifications && (
                        <>
                          {/* Items with icons */}
                          {unitDetails.specifications
                            .filter((specifi: any) => specifi.icon)
                            .map((specifi: any, index: number) => (
                              <React.Fragment key={`with-icon-${index}`}>
                                <div className="flex md:w-[208px] text-black text-xs font-medium mb-3 items-center">
                                  <Image
                                    alt=""
                                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${specifi.icon}`}
                                    width={24}
                                    height={24}
                                    className="z-10 md:w-[15px] mr-3 min-h-[15px]"
                                  />
                                  <span className="md:min-w-24 w-20">
                                    {specifi.label}
                                  </span>
                                  :
                                  <span className="text-zinc-600 text-xs font-normal md:pl-3 pl-1">
                                    {specifi.value}
                                  </span>
                                </div>
                                {(index + 1) % 8 === 0 && (
                                  <div className="w-full h-[0px] border-t border-[#ecebeb] my-6 col-span-2" />
                                )}
                              </React.Fragment>
                            ))}

                          {/* Divider between groups */}
                          <div className="w-full h-[0px] border-t border-[#ecebeb] my-6 col-span-2" />

                          {/* Items without icons */}
                          {unitDetails.specifications
                            .filter((specifi: any) => !specifi.icon)
                            .map((specifi: any, index: number) => (
                              <React.Fragment key={`without-icon-${index}`}>
                                <div className="flex md:w-[208px] text-black text-xs font-medium mb-3 items-center">
                                  <span className="md:min-w-24 w-24 ">
                                    {specifi.label}
                                  </span>
                                  :
                                  <span className="text-zinc-600 text-xs font-normal md:pl-3 pl-1">
                                    {specifi.value}
                                  </span>
                                </div>
                                {(index + 1) % 8 === 0 && (
                                  <div className="w-full h-[0px] border-t border-[#ecebeb] my-6 col-span-2" />
                                )}
                              </React.Fragment>
                            ))}
                        </>
                      )}
                    </div>

                    {/* <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:ml-6">
                      {unitDetails?.specifications?.map(
                        (specifi: any, index: number) => (
                          <React.Fragment key={index}>
                            <div className="flex md:w-[208px] text-black text-xs font-medium mb-3 items-center">
                              <Image
                                alt=""
                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${specifi.icon}`}
                                width={24}
                                height={24}
                                className="z-10 md:w-[15px] mr-3 min-h-[15px]"
                              />
                              <span className="md:min-w-24 ">
                                {specifi.label}
                              </span>
                              :
                              <span className="text-zinc-600 text-xs font-normal pl-3">
                                {specifi.value}
                              </span>
                            </div>
                            {(index + 1) % 8 === 0 && (
                              <div className="w-full h-[0px] border-t border-[#ecebeb] my-6 col-span-2" />
                            )}
                          </React.Fragment>
                        )
                      )}
                    </div> */}
                  </div>
                  <div className="lg:w-[630px] w-full h-[0px] border border-[#ecebeb] my-6" />

                  <div className="grid lg:grid-cols-[160px_1fr] p-4 ">
                    <div>
                      <h2 className="md:w-[132px] text-black text-start text-sm font-semibold mb-2">
                        Leasing Terms
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {unitDetails?.leasing_terms?.map(
                        (item: any, index: number) => (
                          <React.Fragment key={index}>
                            <div className="flex md:w-[208px] text-black text-xs font-medium mb-3 items-center">
                              <span className="md:min-w-24 w-24">
                                {item.label}
                              </span>
                              :
                              <span className="text-zinc-600 text-xs font-normal pl-1">
                                {item.value}
                              </span>
                            </div>
                          </React.Fragment>
                        )
                      )}
                    </div>
                  </div>

                  <div className="lg:w-[630px] w-full h-[0px] border border-[#ecebeb] my-6" />

                  <div className="grid lg:grid-cols-[160px_1fr] p-4 ">
                    <div>
                      <h2 className="md:w-[132px] text-black text-start text-sm font-semibold mb-2">
                        Features{" "}
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-[0.6rem]">
                      {unitDetails?.features?.map(
                        (specifi: any, index: number) => (
                          <React.Fragment key={index}>
                            <div className="flex lg:w-[208px] text-black text-xs font-medium mb-3 items-center">
                              <svg
                                width="16"
                                height="15"
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="7.60938"
                                  cy="7.5"
                                  r="7"
                                  stroke="black"
                                />
                              </svg>

                              <span className="md:min-w-24 ml-3 ">
                                {specifi.label}
                              </span>
                            </div>
                            {(index + 1) % 8 === 0 && (
                              <div className="w-full h-[0px] border-t border-[#ecebeb] my-6 col-span-2" />
                            )}
                          </React.Fragment>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-4 sm:hidden md:block">
                <div className="lg:w-[300px] w-full">
                  <h2 className="text-lg bg-[#373636] w-[300px] h-[45px] overflow-hidden rounded-[5px] text-center mt-2 mx-auto text-white font-normal px-4 py-2 mb-2">
                    Select Available Time Slot
                  </h2>

                  <div className="mb-8">
                    <div className="lg:w-[300px] w-full h-[380px] bg-white rounded-tl-[7.01px] rounded-tr-[7.01px] shadow p-8">
                      <div className="flex justify-between items-center mb-4">
                        <button className="rounded">
                          <svg
                            width={5}
                            height={10}
                            viewBox="0 0 5 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.12986 8.85629L1.18359 5.23869L4.12986 1.62109"
                              stroke="#219653"
                              strokeWidth="1.40299"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <h3 className="text-md font-semibold">February</h3>
                        <button className="rounded">
                          <svg
                            width={5}
                            height={10}
                            viewBox="0 0 5 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.992188 8.85629L3.93846 5.23869L0.992188 1.62109"
                              stroke="#219653"
                              strokeWidth="1.40299"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-7 text-center">
                        <div className="text-[#219653] focus:outline-none text-sm">
                          S
                        </div>
                        <div className="text-[#219653] focus:outline-none text-sm">
                          M
                        </div>
                        <div className="text-[#219653] focus:outline-none text-sm">
                          T
                        </div>
                        <div className="text-[#219653] focus:outline-none text-sm">
                          W
                        </div>
                        <div className="text-[#219653] focus:outline-none text-sm">
                          T
                        </div>
                        <div className="text-[#219653] focus:outline-none text-sm">
                          F
                        </div>
                        <div className="text-[#219653] focus:outline-none text-sm">
                          S
                        </div>
                        {/* Example dates */}
                        <button className="py-2 text-[#aeb3b9] focus:outline-none rounded">
                          27
                        </button>
                        <button className="py-2 text-[#aeb3b9] focus:outline-none rounded">
                          28
                        </button>
                        <button className="py-2 text-[#aeb3b9] focus:outline-none rounded">
                          29
                        </button>
                        <button className="py-2 text-[#aeb3b9] focus:outline-none rounded">
                          30
                        </button>
                        <button className="py-2 text-[#aeb3b9] focus:outline-none rounded">
                          31
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          1
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          2
                        </button>
                        <button className="py-2  text-white bg-[#219653] px-2 focus:outline-none rounded">
                          3
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          4
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          5
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          6
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          7
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          8
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          9
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          10
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          11
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          12
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          13
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          14
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          15
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          16
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          17
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          18
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          19
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          20
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          21
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          22
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          23
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          24
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          25
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          26
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          27
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          28
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          29
                        </button>
                        <button className="py-2 text-black focus:outline-none rounded">
                          30
                        </button>
                        {/* Continue for the rest of the month */}
                      </div>
                      <div className="flex justify-between mt-4">
                        <button className="py-2 px-4 text-black bg-[#ecedef] focus:outline-none  rounded">
                          Cancel
                        </button>
                        <button className="py-2 px-4 bg-[#0670B1] focus:outline-none  text-white rounded">
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-[315px] w-full h-[250px] rounded-[5px] overflow-y-scroll p-4 bg-white shadow">
                    <button className="py-2 px-4 flex justify-between items-center h-[38.63px] border border-[#ebebeb] bg-white rounded-md text-black w-full mt-2 focus:outline-none pl-8">
                      12:00 - 02:30
                      <svg
                        width={30}
                        height={31}
                        viewBox="0 0 30 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_7334_3042)">
                          <path
                            d="M2.75145 9.42087H7.29838C7.53649 9.42087 7.72952 9.22789 7.72952 8.98973C7.72952 8.75157 7.53649 8.55859 7.29838 8.55859H2.75145C2.51335 8.55859 2.32031 8.75157 2.32031 8.98973C2.32031 9.22789 2.51329 9.42087 2.75145 9.42087Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.14137 11.5H5.3452C5.1071 11.5 4.91406 11.693 4.91406 11.9311C4.91406 12.1693 5.1071 12.3623 5.3452 12.3623H7.14137C7.37947 12.3623 7.57251 12.1693 7.57251 11.9311C7.57251 11.693 7.37947 11.5 7.14137 11.5Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M0.946761 14.4873H5.34504C5.58314 14.4873 5.77618 14.2943 5.77618 14.0561C5.77618 13.818 5.58314 13.625 5.34504 13.625H0.946761C0.708659 13.625 0.515625 13.818 0.515625 14.0561C0.515625 14.2943 0.708659 14.4873 0.946761 14.4873Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.72952 22.1304C7.72952 21.8922 7.53649 21.6992 7.29838 21.6992H2.75145C2.51335 21.6992 2.32031 21.8922 2.32031 22.1304C2.32031 22.3685 2.51335 22.5615 2.75145 22.5615H7.29838C7.53649 22.5615 7.72952 22.3685 7.72952 22.1304Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.14137 18.7617H5.3452C5.1071 18.7617 4.91406 18.9547 4.91406 19.1929C4.91406 19.431 5.1071 19.624 5.3452 19.624H7.14137C7.37947 19.624 7.57251 19.431 7.57251 19.1929C7.57251 18.9547 7.37947 18.7617 7.14137 18.7617Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M5.77618 17.0639C5.77618 16.8258 5.58314 16.6328 5.34504 16.6328H0.946761C0.708659 16.6328 0.515625 16.8258 0.515625 17.0639C0.515625 17.3021 0.708659 17.4951 0.946761 17.4951H5.34504C5.58314 17.4951 5.77618 17.3021 5.77618 17.0639Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.8843 10.3797C19.1224 10.3797 19.3154 10.1868 19.3154 9.9486V9.29051C19.3154 9.05235 19.1224 8.85938 18.8843 8.85938C18.6461 8.85938 18.4531 9.05235 18.4531 9.29051V9.9486C18.4531 10.1868 18.6461 10.3797 18.8843 10.3797Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M23.6232 10.8215C23.4548 10.6532 23.1819 10.6532 23.0135 10.8215L22.5482 11.2869C22.3798 11.4553 22.3798 11.7283 22.5482 11.8966C22.7166 12.065 22.9895 12.0649 23.1579 11.8966L23.6232 11.4313C23.7916 11.2629 23.7916 10.99 23.6232 10.8215Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M24.4975 15.1289C24.2594 15.1289 24.0664 15.3219 24.0664 15.56C24.0664 15.7982 24.2594 15.9912 24.4975 15.9912H25.1556C25.3937 15.9912 25.5867 15.7982 25.5867 15.56C25.5867 15.3219 25.3937 15.1289 25.1556 15.1289H24.4975Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M23.1579 19.2278C22.9895 19.0595 22.7165 19.0595 22.5482 19.2278C22.3798 19.3962 22.3798 19.6692 22.5482 19.8375L23.0135 20.3029C23.182 20.4713 23.4549 20.4712 23.6232 20.3029C23.7916 20.1344 23.7916 19.8615 23.6232 19.6931L23.1579 19.2278Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.4531 21.1733V21.8314C18.4531 22.0695 18.6461 22.2625 18.8843 22.2625C19.1224 22.2625 19.3154 22.0695 19.3154 21.8314V21.1733C19.3154 20.9352 19.1224 20.7422 18.8843 20.7422C18.6461 20.7422 18.4531 20.9352 18.4531 21.1733Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M14.6112 19.2278L14.1458 19.6931C13.9774 19.8616 13.9774 20.1345 14.1458 20.3029C14.3142 20.4713 14.5872 20.4712 14.7555 20.3029L15.2208 19.8375C15.3892 19.6691 15.3892 19.3962 15.2208 19.2278C15.0525 19.0595 14.7795 19.0595 14.6112 19.2278Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M12.6108 15.1289C12.3727 15.1289 12.1797 15.3219 12.1797 15.56C12.1797 15.7982 12.3727 15.9912 12.6108 15.9912H13.2689C13.507 15.9912 13.7 15.7982 13.7 15.56C13.7 15.3219 13.507 15.1289 13.2689 15.1289H12.6108Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M15.2208 11.2869L14.7555 10.8215C14.5871 10.6532 14.3141 10.6532 14.1458 10.8215C13.9774 10.99 13.9774 11.2629 14.1458 11.4313L14.6112 11.8966C14.7796 12.065 15.0525 12.0649 15.2208 11.8966C15.3892 11.7283 15.3892 11.4553 15.2208 11.2869Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M21.2026 15.5594C21.2026 15.3212 21.0096 15.1282 20.7715 15.1282H19.3154V11.9272C19.3154 11.6891 19.1224 11.4961 18.8843 11.4961C18.6461 11.4961 18.4531 11.6891 18.4531 11.9272V15.5594C18.4531 15.7975 18.6461 15.9905 18.8843 15.9905H20.7715C21.0096 15.9905 21.2026 15.7975 21.2026 15.5594Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M27.06 15.4895C27.2977 15.4751 27.4786 15.2707 27.4642 15.0331C27.1899 10.5088 23.4215 6.96484 18.8849 6.96484C14.1451 6.96484 10.2891 10.8209 10.2891 15.5607C10.2891 20.3005 14.1451 24.1565 18.8849 24.1565C23.1312 24.1565 26.7546 21.0454 27.3849 16.8469C27.4202 16.6115 27.258 16.392 27.0225 16.3566C26.7876 16.3214 26.5675 16.4834 26.5321 16.719C25.9659 20.4908 22.7091 23.2943 18.8849 23.2943C14.6206 23.2943 11.1513 19.8251 11.1513 15.5608C11.1513 11.2965 14.6206 7.82717 18.8849 7.82717C22.9664 7.82717 26.3568 11.0153 26.6035 15.0854C26.6179 15.3229 26.822 15.5033 27.06 15.4895Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.8845 4.49609C17.368 4.49609 15.8822 4.81071 14.5146 5.39907H6.9077C6.6696 5.39907 6.47656 5.59204 6.47656 5.8302C6.47656 6.06836 6.6696 6.26134 6.9077 6.26134H12.8926C12.0834 6.78215 11.3385 7.41034 10.6816 8.13557C10.5218 8.31199 10.5353 8.58464 10.7118 8.74451C10.8883 8.90438 11.1608 8.89087 11.3208 8.71439C13.2524 6.58159 16.0093 5.35837 18.8845 5.35837C24.5098 5.35837 29.0864 9.93491 29.0864 15.5603C29.0864 21.1855 24.5099 25.7621 18.8845 25.7621C13.2591 25.7621 8.6826 21.1856 8.6826 15.5603C8.6826 13.5904 9.24532 11.6784 10.3098 10.031C10.439 9.83103 10.3817 9.56419 10.1817 9.43496C9.9817 9.30579 9.71485 9.36305 9.58557 9.56309C8.4307 11.3502 7.82033 13.4239 7.82033 15.5603C7.82033 19.4558 9.84414 22.8872 12.8954 24.8592H6.90776C6.66965 24.8592 6.47662 25.0521 6.47662 25.2903C6.47662 25.5285 6.66965 25.7214 6.90776 25.7214H14.5087C15.8515 26.302 17.331 26.6244 18.8845 26.6244C24.9853 26.6244 29.9487 21.6611 29.9487 15.5603C29.9487 9.45945 24.9853 4.49609 18.8845 4.49609Z"
                            fill="#CA8300"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_7334_3042">
                            <rect
                              width="29.4322"
                              height="29.4322"
                              fill="white"
                              transform="translate(0.515625 0.84375)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <button className="py-2 px-4 bg-white items-center h-[38.63px] flex justify-between border border-[#ebebeb]  rounded-[5px]   text-black w-full mt-2 focus:outline-none pl-8">
                      12:00 - 02:30
                      <svg
                        width={30}
                        height={31}
                        viewBox="0 0 30 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_7334_3042)">
                          <path
                            d="M2.75145 9.42087H7.29838C7.53649 9.42087 7.72952 9.22789 7.72952 8.98973C7.72952 8.75157 7.53649 8.55859 7.29838 8.55859H2.75145C2.51335 8.55859 2.32031 8.75157 2.32031 8.98973C2.32031 9.22789 2.51329 9.42087 2.75145 9.42087Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.14137 11.5H5.3452C5.1071 11.5 4.91406 11.693 4.91406 11.9311C4.91406 12.1693 5.1071 12.3623 5.3452 12.3623H7.14137C7.37947 12.3623 7.57251 12.1693 7.57251 11.9311C7.57251 11.693 7.37947 11.5 7.14137 11.5Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M0.946761 14.4873H5.34504C5.58314 14.4873 5.77618 14.2943 5.77618 14.0561C5.77618 13.818 5.58314 13.625 5.34504 13.625H0.946761C0.708659 13.625 0.515625 13.818 0.515625 14.0561C0.515625 14.2943 0.708659 14.4873 0.946761 14.4873Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.72952 22.1304C7.72952 21.8922 7.53649 21.6992 7.29838 21.6992H2.75145C2.51335 21.6992 2.32031 21.8922 2.32031 22.1304C2.32031 22.3685 2.51335 22.5615 2.75145 22.5615H7.29838C7.53649 22.5615 7.72952 22.3685 7.72952 22.1304Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.14137 18.7617H5.3452C5.1071 18.7617 4.91406 18.9547 4.91406 19.1929C4.91406 19.431 5.1071 19.624 5.3452 19.624H7.14137C7.37947 19.624 7.57251 19.431 7.57251 19.1929C7.57251 18.9547 7.37947 18.7617 7.14137 18.7617Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M5.77618 17.0639C5.77618 16.8258 5.58314 16.6328 5.34504 16.6328H0.946761C0.708659 16.6328 0.515625 16.8258 0.515625 17.0639C0.515625 17.3021 0.708659 17.4951 0.946761 17.4951H5.34504C5.58314 17.4951 5.77618 17.3021 5.77618 17.0639Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.8843 10.3797C19.1224 10.3797 19.3154 10.1868 19.3154 9.9486V9.29051C19.3154 9.05235 19.1224 8.85938 18.8843 8.85938C18.6461 8.85938 18.4531 9.05235 18.4531 9.29051V9.9486C18.4531 10.1868 18.6461 10.3797 18.8843 10.3797Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M23.6232 10.8215C23.4548 10.6532 23.1819 10.6532 23.0135 10.8215L22.5482 11.2869C22.3798 11.4553 22.3798 11.7283 22.5482 11.8966C22.7166 12.065 22.9895 12.0649 23.1579 11.8966L23.6232 11.4313C23.7916 11.2629 23.7916 10.99 23.6232 10.8215Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M24.4975 15.1289C24.2594 15.1289 24.0664 15.3219 24.0664 15.56C24.0664 15.7982 24.2594 15.9912 24.4975 15.9912H25.1556C25.3937 15.9912 25.5867 15.7982 25.5867 15.56C25.5867 15.3219 25.3937 15.1289 25.1556 15.1289H24.4975Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M23.1579 19.2278C22.9895 19.0595 22.7165 19.0595 22.5482 19.2278C22.3798 19.3962 22.3798 19.6692 22.5482 19.8375L23.0135 20.3029C23.182 20.4713 23.4549 20.4712 23.6232 20.3029C23.7916 20.1344 23.7916 19.8615 23.6232 19.6931L23.1579 19.2278Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.4531 21.1733V21.8314C18.4531 22.0695 18.6461 22.2625 18.8843 22.2625C19.1224 22.2625 19.3154 22.0695 19.3154 21.8314V21.1733C19.3154 20.9352 19.1224 20.7422 18.8843 20.7422C18.6461 20.7422 18.4531 20.9352 18.4531 21.1733Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M14.6112 19.2278L14.1458 19.6931C13.9774 19.8616 13.9774 20.1345 14.1458 20.3029C14.3142 20.4713 14.5872 20.4712 14.7555 20.3029L15.2208 19.8375C15.3892 19.6691 15.3892 19.3962 15.2208 19.2278C15.0525 19.0595 14.7795 19.0595 14.6112 19.2278Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M12.6108 15.1289C12.3727 15.1289 12.1797 15.3219 12.1797 15.56C12.1797 15.7982 12.3727 15.9912 12.6108 15.9912H13.2689C13.507 15.9912 13.7 15.7982 13.7 15.56C13.7 15.3219 13.507 15.1289 13.2689 15.1289H12.6108Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M15.2208 11.2869L14.7555 10.8215C14.5871 10.6532 14.3141 10.6532 14.1458 10.8215C13.9774 10.99 13.9774 11.2629 14.1458 11.4313L14.6112 11.8966C14.7796 12.065 15.0525 12.0649 15.2208 11.8966C15.3892 11.7283 15.3892 11.4553 15.2208 11.2869Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M21.2026 15.5594C21.2026 15.3212 21.0096 15.1282 20.7715 15.1282H19.3154V11.9272C19.3154 11.6891 19.1224 11.4961 18.8843 11.4961C18.6461 11.4961 18.4531 11.6891 18.4531 11.9272V15.5594C18.4531 15.7975 18.6461 15.9905 18.8843 15.9905H20.7715C21.0096 15.9905 21.2026 15.7975 21.2026 15.5594Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M27.06 15.4895C27.2977 15.4751 27.4786 15.2707 27.4642 15.0331C27.1899 10.5088 23.4215 6.96484 18.8849 6.96484C14.1451 6.96484 10.2891 10.8209 10.2891 15.5607C10.2891 20.3005 14.1451 24.1565 18.8849 24.1565C23.1312 24.1565 26.7546 21.0454 27.3849 16.8469C27.4202 16.6115 27.258 16.392 27.0225 16.3566C26.7876 16.3214 26.5675 16.4834 26.5321 16.719C25.9659 20.4908 22.7091 23.2943 18.8849 23.2943C14.6206 23.2943 11.1513 19.8251 11.1513 15.5608C11.1513 11.2965 14.6206 7.82717 18.8849 7.82717C22.9664 7.82717 26.3568 11.0153 26.6035 15.0854C26.6179 15.3229 26.822 15.5033 27.06 15.4895Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.8845 4.49609C17.368 4.49609 15.8822 4.81071 14.5146 5.39907H6.9077C6.6696 5.39907 6.47656 5.59204 6.47656 5.8302C6.47656 6.06836 6.6696 6.26134 6.9077 6.26134H12.8926C12.0834 6.78215 11.3385 7.41034 10.6816 8.13557C10.5218 8.31199 10.5353 8.58464 10.7118 8.74451C10.8883 8.90438 11.1608 8.89087 11.3208 8.71439C13.2524 6.58159 16.0093 5.35837 18.8845 5.35837C24.5098 5.35837 29.0864 9.93491 29.0864 15.5603C29.0864 21.1855 24.5099 25.7621 18.8845 25.7621C13.2591 25.7621 8.6826 21.1856 8.6826 15.5603C8.6826 13.5904 9.24532 11.6784 10.3098 10.031C10.439 9.83103 10.3817 9.56419 10.1817 9.43496C9.9817 9.30579 9.71485 9.36305 9.58557 9.56309C8.4307 11.3502 7.82033 13.4239 7.82033 15.5603C7.82033 19.4558 9.84414 22.8872 12.8954 24.8592H6.90776C6.66965 24.8592 6.47662 25.0521 6.47662 25.2903C6.47662 25.5285 6.66965 25.7214 6.90776 25.7214H14.5087C15.8515 26.302 17.331 26.6244 18.8845 26.6244C24.9853 26.6244 29.9487 21.6611 29.9487 15.5603C29.9487 9.45945 24.9853 4.49609 18.8845 4.49609Z"
                            fill="#CA8300"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_7334_3042">
                            <rect
                              width="29.4322"
                              height="29.4322"
                              fill="white"
                              transform="translate(0.515625 0.84375)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <button className="py-2 px-4 bg-white items-center h-[38.63px] flex justify-between border border-[#ebebeb]  rounded-[5px] text-black w-full mt-2 focus:outline-none pl-8">
                      12:00 - 02:30
                      <svg
                        width={30}
                        height={31}
                        viewBox="0 0 30 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_7334_3042)">
                          <path
                            d="M2.75145 9.42087H7.29838C7.53649 9.42087 7.72952 9.22789 7.72952 8.98973C7.72952 8.75157 7.53649 8.55859 7.29838 8.55859H2.75145C2.51335 8.55859 2.32031 8.75157 2.32031 8.98973C2.32031 9.22789 2.51329 9.42087 2.75145 9.42087Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.14137 11.5H5.3452C5.1071 11.5 4.91406 11.693 4.91406 11.9311C4.91406 12.1693 5.1071 12.3623 5.3452 12.3623H7.14137C7.37947 12.3623 7.57251 12.1693 7.57251 11.9311C7.57251 11.693 7.37947 11.5 7.14137 11.5Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M0.946761 14.4873H5.34504C5.58314 14.4873 5.77618 14.2943 5.77618 14.0561C5.77618 13.818 5.58314 13.625 5.34504 13.625H0.946761C0.708659 13.625 0.515625 13.818 0.515625 14.0561C0.515625 14.2943 0.708659 14.4873 0.946761 14.4873Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.72952 22.1304C7.72952 21.8922 7.53649 21.6992 7.29838 21.6992H2.75145C2.51335 21.6992 2.32031 21.8922 2.32031 22.1304C2.32031 22.3685 2.51335 22.5615 2.75145 22.5615H7.29838C7.53649 22.5615 7.72952 22.3685 7.72952 22.1304Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.14137 18.7617H5.3452C5.1071 18.7617 4.91406 18.9547 4.91406 19.1929C4.91406 19.431 5.1071 19.624 5.3452 19.624H7.14137C7.37947 19.624 7.57251 19.431 7.57251 19.1929C7.57251 18.9547 7.37947 18.7617 7.14137 18.7617Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M5.77618 17.0639C5.77618 16.8258 5.58314 16.6328 5.34504 16.6328H0.946761C0.708659 16.6328 0.515625 16.8258 0.515625 17.0639C0.515625 17.3021 0.708659 17.4951 0.946761 17.4951H5.34504C5.58314 17.4951 5.77618 17.3021 5.77618 17.0639Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.8843 10.3797C19.1224 10.3797 19.3154 10.1868 19.3154 9.9486V9.29051C19.3154 9.05235 19.1224 8.85938 18.8843 8.85938C18.6461 8.85938 18.4531 9.05235 18.4531 9.29051V9.9486C18.4531 10.1868 18.6461 10.3797 18.8843 10.3797Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M23.6232 10.8215C23.4548 10.6532 23.1819 10.6532 23.0135 10.8215L22.5482 11.2869C22.3798 11.4553 22.3798 11.7283 22.5482 11.8966C22.7166 12.065 22.9895 12.0649 23.1579 11.8966L23.6232 11.4313C23.7916 11.2629 23.7916 10.99 23.6232 10.8215Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M24.4975 15.1289C24.2594 15.1289 24.0664 15.3219 24.0664 15.56C24.0664 15.7982 24.2594 15.9912 24.4975 15.9912H25.1556C25.3937 15.9912 25.5867 15.7982 25.5867 15.56C25.5867 15.3219 25.3937 15.1289 25.1556 15.1289H24.4975Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M23.1579 19.2278C22.9895 19.0595 22.7165 19.0595 22.5482 19.2278C22.3798 19.3962 22.3798 19.6692 22.5482 19.8375L23.0135 20.3029C23.182 20.4713 23.4549 20.4712 23.6232 20.3029C23.7916 20.1344 23.7916 19.8615 23.6232 19.6931L23.1579 19.2278Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.4531 21.1733V21.8314C18.4531 22.0695 18.6461 22.2625 18.8843 22.2625C19.1224 22.2625 19.3154 22.0695 19.3154 21.8314V21.1733C19.3154 20.9352 19.1224 20.7422 18.8843 20.7422C18.6461 20.7422 18.4531 20.9352 18.4531 21.1733Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M14.6112 19.2278L14.1458 19.6931C13.9774 19.8616 13.9774 20.1345 14.1458 20.3029C14.3142 20.4713 14.5872 20.4712 14.7555 20.3029L15.2208 19.8375C15.3892 19.6691 15.3892 19.3962 15.2208 19.2278C15.0525 19.0595 14.7795 19.0595 14.6112 19.2278Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M12.6108 15.1289C12.3727 15.1289 12.1797 15.3219 12.1797 15.56C12.1797 15.7982 12.3727 15.9912 12.6108 15.9912H13.2689C13.507 15.9912 13.7 15.7982 13.7 15.56C13.7 15.3219 13.507 15.1289 13.2689 15.1289H12.6108Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M15.2208 11.2869L14.7555 10.8215C14.5871 10.6532 14.3141 10.6532 14.1458 10.8215C13.9774 10.99 13.9774 11.2629 14.1458 11.4313L14.6112 11.8966C14.7796 12.065 15.0525 12.0649 15.2208 11.8966C15.3892 11.7283 15.3892 11.4553 15.2208 11.2869Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M21.2026 15.5594C21.2026 15.3212 21.0096 15.1282 20.7715 15.1282H19.3154V11.9272C19.3154 11.6891 19.1224 11.4961 18.8843 11.4961C18.6461 11.4961 18.4531 11.6891 18.4531 11.9272V15.5594C18.4531 15.7975 18.6461 15.9905 18.8843 15.9905H20.7715C21.0096 15.9905 21.2026 15.7975 21.2026 15.5594Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M27.06 15.4895C27.2977 15.4751 27.4786 15.2707 27.4642 15.0331C27.1899 10.5088 23.4215 6.96484 18.8849 6.96484C14.1451 6.96484 10.2891 10.8209 10.2891 15.5607C10.2891 20.3005 14.1451 24.1565 18.8849 24.1565C23.1312 24.1565 26.7546 21.0454 27.3849 16.8469C27.4202 16.6115 27.258 16.392 27.0225 16.3566C26.7876 16.3214 26.5675 16.4834 26.5321 16.719C25.9659 20.4908 22.7091 23.2943 18.8849 23.2943C14.6206 23.2943 11.1513 19.8251 11.1513 15.5608C11.1513 11.2965 14.6206 7.82717 18.8849 7.82717C22.9664 7.82717 26.3568 11.0153 26.6035 15.0854C26.6179 15.3229 26.822 15.5033 27.06 15.4895Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.8845 4.49609C17.368 4.49609 15.8822 4.81071 14.5146 5.39907H6.9077C6.6696 5.39907 6.47656 5.59204 6.47656 5.8302C6.47656 6.06836 6.6696 6.26134 6.9077 6.26134H12.8926C12.0834 6.78215 11.3385 7.41034 10.6816 8.13557C10.5218 8.31199 10.5353 8.58464 10.7118 8.74451C10.8883 8.90438 11.1608 8.89087 11.3208 8.71439C13.2524 6.58159 16.0093 5.35837 18.8845 5.35837C24.5098 5.35837 29.0864 9.93491 29.0864 15.5603C29.0864 21.1855 24.5099 25.7621 18.8845 25.7621C13.2591 25.7621 8.6826 21.1856 8.6826 15.5603C8.6826 13.5904 9.24532 11.6784 10.3098 10.031C10.439 9.83103 10.3817 9.56419 10.1817 9.43496C9.9817 9.30579 9.71485 9.36305 9.58557 9.56309C8.4307 11.3502 7.82033 13.4239 7.82033 15.5603C7.82033 19.4558 9.84414 22.8872 12.8954 24.8592H6.90776C6.66965 24.8592 6.47662 25.0521 6.47662 25.2903C6.47662 25.5285 6.66965 25.7214 6.90776 25.7214H14.5087C15.8515 26.302 17.331 26.6244 18.8845 26.6244C24.9853 26.6244 29.9487 21.6611 29.9487 15.5603C29.9487 9.45945 24.9853 4.49609 18.8845 4.49609Z"
                            fill="#CA8300"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_7334_3042">
                            <rect
                              width="29.4322"
                              height="29.4322"
                              fill="white"
                              transform="translate(0.515625 0.84375)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <button className="py-2 px-4 bg-white flex justify-between  rounded-[5px]  items-center h-[38.63px] border border-[#ebebeb] text-black w-full mt-2 focus:outline-none pl-8">
                      12:00 - 02:30
                      <svg
                        width={30}
                        height={31}
                        viewBox="0 0 30 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_7334_3042)">
                          <path
                            d="M2.75145 9.42087H7.29838C7.53649 9.42087 7.72952 9.22789 7.72952 8.98973C7.72952 8.75157 7.53649 8.55859 7.29838 8.55859H2.75145C2.51335 8.55859 2.32031 8.75157 2.32031 8.98973C2.32031 9.22789 2.51329 9.42087 2.75145 9.42087Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.14137 11.5H5.3452C5.1071 11.5 4.91406 11.693 4.91406 11.9311C4.91406 12.1693 5.1071 12.3623 5.3452 12.3623H7.14137C7.37947 12.3623 7.57251 12.1693 7.57251 11.9311C7.57251 11.693 7.37947 11.5 7.14137 11.5Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M0.946761 14.4873H5.34504C5.58314 14.4873 5.77618 14.2943 5.77618 14.0561C5.77618 13.818 5.58314 13.625 5.34504 13.625H0.946761C0.708659 13.625 0.515625 13.818 0.515625 14.0561C0.515625 14.2943 0.708659 14.4873 0.946761 14.4873Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.72952 22.1304C7.72952 21.8922 7.53649 21.6992 7.29838 21.6992H2.75145C2.51335 21.6992 2.32031 21.8922 2.32031 22.1304C2.32031 22.3685 2.51335 22.5615 2.75145 22.5615H7.29838C7.53649 22.5615 7.72952 22.3685 7.72952 22.1304Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.14137 18.7617H5.3452C5.1071 18.7617 4.91406 18.9547 4.91406 19.1929C4.91406 19.431 5.1071 19.624 5.3452 19.624H7.14137C7.37947 19.624 7.57251 19.431 7.57251 19.1929C7.57251 18.9547 7.37947 18.7617 7.14137 18.7617Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M5.77618 17.0639C5.77618 16.8258 5.58314 16.6328 5.34504 16.6328H0.946761C0.708659 16.6328 0.515625 16.8258 0.515625 17.0639C0.515625 17.3021 0.708659 17.4951 0.946761 17.4951H5.34504C5.58314 17.4951 5.77618 17.3021 5.77618 17.0639Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.8843 10.3797C19.1224 10.3797 19.3154 10.1868 19.3154 9.9486V9.29051C19.3154 9.05235 19.1224 8.85938 18.8843 8.85938C18.6461 8.85938 18.4531 9.05235 18.4531 9.29051V9.9486C18.4531 10.1868 18.6461 10.3797 18.8843 10.3797Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M23.6232 10.8215C23.4548 10.6532 23.1819 10.6532 23.0135 10.8215L22.5482 11.2869C22.3798 11.4553 22.3798 11.7283 22.5482 11.8966C22.7166 12.065 22.9895 12.0649 23.1579 11.8966L23.6232 11.4313C23.7916 11.2629 23.7916 10.99 23.6232 10.8215Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M24.4975 15.1289C24.2594 15.1289 24.0664 15.3219 24.0664 15.56C24.0664 15.7982 24.2594 15.9912 24.4975 15.9912H25.1556C25.3937 15.9912 25.5867 15.7982 25.5867 15.56C25.5867 15.3219 25.3937 15.1289 25.1556 15.1289H24.4975Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M23.1579 19.2278C22.9895 19.0595 22.7165 19.0595 22.5482 19.2278C22.3798 19.3962 22.3798 19.6692 22.5482 19.8375L23.0135 20.3029C23.182 20.4713 23.4549 20.4712 23.6232 20.3029C23.7916 20.1344 23.7916 19.8615 23.6232 19.6931L23.1579 19.2278Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.4531 21.1733V21.8314C18.4531 22.0695 18.6461 22.2625 18.8843 22.2625C19.1224 22.2625 19.3154 22.0695 19.3154 21.8314V21.1733C19.3154 20.9352 19.1224 20.7422 18.8843 20.7422C18.6461 20.7422 18.4531 20.9352 18.4531 21.1733Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M14.6112 19.2278L14.1458 19.6931C13.9774 19.8616 13.9774 20.1345 14.1458 20.3029C14.3142 20.4713 14.5872 20.4712 14.7555 20.3029L15.2208 19.8375C15.3892 19.6691 15.3892 19.3962 15.2208 19.2278C15.0525 19.0595 14.7795 19.0595 14.6112 19.2278Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M12.6108 15.1289C12.3727 15.1289 12.1797 15.3219 12.1797 15.56C12.1797 15.7982 12.3727 15.9912 12.6108 15.9912H13.2689C13.507 15.9912 13.7 15.7982 13.7 15.56C13.7 15.3219 13.507 15.1289 13.2689 15.1289H12.6108Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M15.2208 11.2869L14.7555 10.8215C14.5871 10.6532 14.3141 10.6532 14.1458 10.8215C13.9774 10.99 13.9774 11.2629 14.1458 11.4313L14.6112 11.8966C14.7796 12.065 15.0525 12.0649 15.2208 11.8966C15.3892 11.7283 15.3892 11.4553 15.2208 11.2869Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M21.2026 15.5594C21.2026 15.3212 21.0096 15.1282 20.7715 15.1282H19.3154V11.9272C19.3154 11.6891 19.1224 11.4961 18.8843 11.4961C18.6461 11.4961 18.4531 11.6891 18.4531 11.9272V15.5594C18.4531 15.7975 18.6461 15.9905 18.8843 15.9905H20.7715C21.0096 15.9905 21.2026 15.7975 21.2026 15.5594Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M27.06 15.4895C27.2977 15.4751 27.4786 15.2707 27.4642 15.0331C27.1899 10.5088 23.4215 6.96484 18.8849 6.96484C14.1451 6.96484 10.2891 10.8209 10.2891 15.5607C10.2891 20.3005 14.1451 24.1565 18.8849 24.1565C23.1312 24.1565 26.7546 21.0454 27.3849 16.8469C27.4202 16.6115 27.258 16.392 27.0225 16.3566C26.7876 16.3214 26.5675 16.4834 26.5321 16.719C25.9659 20.4908 22.7091 23.2943 18.8849 23.2943C14.6206 23.2943 11.1513 19.8251 11.1513 15.5608C11.1513 11.2965 14.6206 7.82717 18.8849 7.82717C22.9664 7.82717 26.3568 11.0153 26.6035 15.0854C26.6179 15.3229 26.822 15.5033 27.06 15.4895Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.8845 4.49609C17.368 4.49609 15.8822 4.81071 14.5146 5.39907H6.9077C6.6696 5.39907 6.47656 5.59204 6.47656 5.8302C6.47656 6.06836 6.6696 6.26134 6.9077 6.26134H12.8926C12.0834 6.78215 11.3385 7.41034 10.6816 8.13557C10.5218 8.31199 10.5353 8.58464 10.7118 8.74451C10.8883 8.90438 11.1608 8.89087 11.3208 8.71439C13.2524 6.58159 16.0093 5.35837 18.8845 5.35837C24.5098 5.35837 29.0864 9.93491 29.0864 15.5603C29.0864 21.1855 24.5099 25.7621 18.8845 25.7621C13.2591 25.7621 8.6826 21.1856 8.6826 15.5603C8.6826 13.5904 9.24532 11.6784 10.3098 10.031C10.439 9.83103 10.3817 9.56419 10.1817 9.43496C9.9817 9.30579 9.71485 9.36305 9.58557 9.56309C8.4307 11.3502 7.82033 13.4239 7.82033 15.5603C7.82033 19.4558 9.84414 22.8872 12.8954 24.8592H6.90776C6.66965 24.8592 6.47662 25.0521 6.47662 25.2903C6.47662 25.5285 6.66965 25.7214 6.90776 25.7214H14.5087C15.8515 26.302 17.331 26.6244 18.8845 26.6244C24.9853 26.6244 29.9487 21.6611 29.9487 15.5603C29.9487 9.45945 24.9853 4.49609 18.8845 4.49609Z"
                            fill="#CA8300"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_7334_3042">
                            <rect
                              width="29.4322"
                              height="29.4322"
                              fill="white"
                              transform="translate(0.515625 0.84375)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <button className="py-2 px-4 bg-white flex justify-between  rounded-[5px] border border-[#ebebeb] items-center h-[38.63px] text-black w-full mt-2 focus:outline-none pl-8">
                      12:00 - 03:30
                      <svg
                        width={30}
                        height={31}
                        viewBox="0 0 30 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_7334_3042)">
                          <path
                            d="M2.75145 9.42087H7.29838C7.53649 9.42087 7.72952 9.22789 7.72952 8.98973C7.72952 8.75157 7.53649 8.55859 7.29838 8.55859H2.75145C2.51335 8.55859 2.32031 8.75157 2.32031 8.98973C2.32031 9.22789 2.51329 9.42087 2.75145 9.42087Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.14137 11.5H5.3452C5.1071 11.5 4.91406 11.693 4.91406 11.9311C4.91406 12.1693 5.1071 12.3623 5.3452 12.3623H7.14137C7.37947 12.3623 7.57251 12.1693 7.57251 11.9311C7.57251 11.693 7.37947 11.5 7.14137 11.5Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M0.946761 14.4873H5.34504C5.58314 14.4873 5.77618 14.2943 5.77618 14.0561C5.77618 13.818 5.58314 13.625 5.34504 13.625H0.946761C0.708659 13.625 0.515625 13.818 0.515625 14.0561C0.515625 14.2943 0.708659 14.4873 0.946761 14.4873Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.72952 22.1304C7.72952 21.8922 7.53649 21.6992 7.29838 21.6992H2.75145C2.51335 21.6992 2.32031 21.8922 2.32031 22.1304C2.32031 22.3685 2.51335 22.5615 2.75145 22.5615H7.29838C7.53649 22.5615 7.72952 22.3685 7.72952 22.1304Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M7.14137 18.7617H5.3452C5.1071 18.7617 4.91406 18.9547 4.91406 19.1929C4.91406 19.431 5.1071 19.624 5.3452 19.624H7.14137C7.37947 19.624 7.57251 19.431 7.57251 19.1929C7.57251 18.9547 7.37947 18.7617 7.14137 18.7617Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M5.77618 17.0639C5.77618 16.8258 5.58314 16.6328 5.34504 16.6328H0.946761C0.708659 16.6328 0.515625 16.8258 0.515625 17.0639C0.515625 17.3021 0.708659 17.4951 0.946761 17.4951H5.34504C5.58314 17.4951 5.77618 17.3021 5.77618 17.0639Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.8843 10.3797C19.1224 10.3797 19.3154 10.1868 19.3154 9.9486V9.29051C19.3154 9.05235 19.1224 8.85938 18.8843 8.85938C18.6461 8.85938 18.4531 9.05235 18.4531 9.29051V9.9486C18.4531 10.1868 18.6461 10.3797 18.8843 10.3797Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M23.6232 10.8215C23.4548 10.6532 23.1819 10.6532 23.0135 10.8215L22.5482 11.2869C22.3798 11.4553 22.3798 11.7283 22.5482 11.8966C22.7166 12.065 22.9895 12.0649 23.1579 11.8966L23.6232 11.4313C23.7916 11.2629 23.7916 10.99 23.6232 10.8215Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M24.4975 15.1289C24.2594 15.1289 24.0664 15.3219 24.0664 15.56C24.0664 15.7982 24.2594 15.9912 24.4975 15.9912H25.1556C25.3937 15.9912 25.5867 15.7982 25.5867 15.56C25.5867 15.3219 25.3937 15.1289 25.1556 15.1289H24.4975Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M23.1579 19.2278C22.9895 19.0595 22.7165 19.0595 22.5482 19.2278C22.3798 19.3962 22.3798 19.6692 22.5482 19.8375L23.0135 20.3029C23.182 20.4713 23.4549 20.4712 23.6232 20.3029C23.7916 20.1344 23.7916 19.8615 23.6232 19.6931L23.1579 19.2278Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.4531 21.1733V21.8314C18.4531 22.0695 18.6461 22.2625 18.8843 22.2625C19.1224 22.2625 19.3154 22.0695 19.3154 21.8314V21.1733C19.3154 20.9352 19.1224 20.7422 18.8843 20.7422C18.6461 20.7422 18.4531 20.9352 18.4531 21.1733Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M14.6112 19.2278L14.1458 19.6931C13.9774 19.8616 13.9774 20.1345 14.1458 20.3029C14.3142 20.4713 14.5872 20.4712 14.7555 20.3029L15.2208 19.8375C15.3892 19.6691 15.3892 19.3962 15.2208 19.2278C15.0525 19.0595 14.7795 19.0595 14.6112 19.2278Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M12.6108 15.1289C12.3727 15.1289 12.1797 15.3219 12.1797 15.56C12.1797 15.7982 12.3727 15.9912 12.6108 15.9912H13.2689C13.507 15.9912 13.7 15.7982 13.7 15.56C13.7 15.3219 13.507 15.1289 13.2689 15.1289H12.6108Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M15.2208 11.2869L14.7555 10.8215C14.5871 10.6532 14.3141 10.6532 14.1458 10.8215C13.9774 10.99 13.9774 11.2629 14.1458 11.4313L14.6112 11.8966C14.7796 12.065 15.0525 12.0649 15.2208 11.8966C15.3892 11.7283 15.3892 11.4553 15.2208 11.2869Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M21.2026 15.5594C21.2026 15.3212 21.0096 15.1282 20.7715 15.1282H19.3154V11.9272C19.3154 11.6891 19.1224 11.4961 18.8843 11.4961C18.6461 11.4961 18.4531 11.6891 18.4531 11.9272V15.5594C18.4531 15.7975 18.6461 15.9905 18.8843 15.9905H20.7715C21.0096 15.9905 21.2026 15.7975 21.2026 15.5594Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M27.06 15.4895C27.2977 15.4751 27.4786 15.2707 27.4642 15.0331C27.1899 10.5088 23.4215 6.96484 18.8849 6.96484C14.1451 6.96484 10.2891 10.8209 10.2891 15.5607C10.2891 20.3005 14.1451 24.1565 18.8849 24.1565C23.1312 24.1565 26.7546 21.0454 27.3849 16.8469C27.4202 16.6115 27.258 16.392 27.0225 16.3566C26.7876 16.3214 26.5675 16.4834 26.5321 16.719C25.9659 20.4908 22.7091 23.2943 18.8849 23.2943C14.6206 23.2943 11.1513 19.8251 11.1513 15.5608C11.1513 11.2965 14.6206 7.82717 18.8849 7.82717C22.9664 7.82717 26.3568 11.0153 26.6035 15.0854C26.6179 15.3229 26.822 15.5033 27.06 15.4895Z"
                            fill="#CA8300"
                          />
                          <path
                            d="M18.8845 4.49609C17.368 4.49609 15.8822 4.81071 14.5146 5.39907H6.9077C6.6696 5.39907 6.47656 5.59204 6.47656 5.8302C6.47656 6.06836 6.6696 6.26134 6.9077 6.26134H12.8926C12.0834 6.78215 11.3385 7.41034 10.6816 8.13557C10.5218 8.31199 10.5353 8.58464 10.7118 8.74451C10.8883 8.90438 11.1608 8.89087 11.3208 8.71439C13.2524 6.58159 16.0093 5.35837 18.8845 5.35837C24.5098 5.35837 29.0864 9.93491 29.0864 15.5603C29.0864 21.1855 24.5099 25.7621 18.8845 25.7621C13.2591 25.7621 8.6826 21.1856 8.6826 15.5603C8.6826 13.5904 9.24532 11.6784 10.3098 10.031C10.439 9.83103 10.3817 9.56419 10.1817 9.43496C9.9817 9.30579 9.71485 9.36305 9.58557 9.56309C8.4307 11.3502 7.82033 13.4239 7.82033 15.5603C7.82033 19.4558 9.84414 22.8872 12.8954 24.8592H6.90776C6.66965 24.8592 6.47662 25.0521 6.47662 25.2903C6.47662 25.5285 6.66965 25.7214 6.90776 25.7214H14.5087C15.8515 26.302 17.331 26.6244 18.8845 26.6244C24.9853 26.6244 29.9487 21.6611 29.9487 15.5603C29.9487 9.45945 24.9853 4.49609 18.8845 4.49609Z"
                            fill="#CA8300"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_7334_3042">
                            <rect
                              width="29.4322"
                              height="29.4322"
                              fill="white"
                              transform="translate(0.515625 0.84375)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default UnitAminities;
